import * as fs from 'fs';
import * as moment from '../node_modules/moment/moment';

interface IDetails {
	type: null | string;
	format: null | string;
	prefix: null | string;
	postfix: null | string;
	dp: null | number;
}

interface IDateFormat {
	format: IFormat[];
	hasDay: boolean;
	hasMonth: boolean;
	hasYear: boolean;
	locale: string;
	momentFormat: string;
	separators: string[];
	split: string[];
	tokensUsed: string[];
}

interface IFormat {
	value: string;
	firm: boolean;
	definite: boolean;
}

export default class typeDetect {

	private decimalCharacter;
	private thousandsSeparator;
	private months;
	private abbrMonths;
	private days;
	private abbrDays;
	private postFixes;
	private previouslyDiscarded;

	constructor(decimalCharacter= '.', thousandsSeparator= ',') {
		this.decimalCharacter = decimalCharacter;
		this.thousandsSeparator = thousandsSeparator;
		this.previouslyDiscarded = [];
		this.months = {
			en: /^((j|J)anuary|(f|F)ebruary|(m|M)arch|(a|A)pril|(m|M)ay|(j|J)une|(j|J)uly|(a|A)ugust|(s|S)eptember|(o|O)ctober|(n|N)ovember|(d|D)ecember)$/g
		};
		this.abbrMonths = {
			en: /^((j|J)an|(f|F)eb|(m|M)ar|(a|A)pr|(m|M)ay|(j|J)un|(j|J)ul|(a|A)ug|(s|S)ep|(o|O)ct|(n|N)ov|(d|D)ec)$/g
		};
		this.days = {
			en: /^((m|M)onday|(t|T)uesday|(w|W)ednesday|(t|T)hursday|(f|F)riday|(s|S)aturday|(s|S)unday)$/g
		};
		this.abbrDays = {
			en: /^((m|M)on|(t|T)ue|(w|W)ed|(t|T)hu|(f|F)ri|(s|S)at|(s|S)un)$/g
		};
		this.postFixes = {
			en: /^[0-9]+(st|nd|rd|th)$/g
		};
	}

	public typeDetect(data) {
		let details: IDetails = {
			dp: null,
			format: null,
			postfix: null,
			prefix: null,
			type: null
		};

		// If there is no data then return blank details
		if (!data || data.length === 0) {
			return details;
		}

		// Identify possible prefix and postfix - will only be used if certain types are identified
		let possPrefix = this.getPrefix(data);
		let possPostfix = this.getPostfix(data);

		details.type = this.getType(data, possPrefix, possPostfix); // Get the type of the data

		// If the type is a datetime, date or time then the format needs to be set.
		if (details.type === 'datetime' || details.type.indexOf('date') !== -1 || details.type === 'time') {
			let splitdate = details.type.split('-');
			details.format = splitdate.slice(1).join('-');
			details.type = splitdate[0];

			// If a format cannot be determined then default back to a string type
			if (details.format === null) {
				details.type = 'string';
			}
		}
		else if (details.type === 'number') {
			// If the type is a number then use the previously identified postfix and prefix
			details.prefix = possPrefix;
			details.postfix = possPostfix;
			// Also determine the number of decimal places
			details.dp = this.getDP(data, possPostfix);
		}

		return details;
	}

	public getType(data, prefix, postfix): string {
		let types = [];
		let dateSuggestion = null;
		let definiteOrder = null;
		this.previouslyDiscarded = [];

		// A type can only be set if all of the data fits it
		for (let i = 0; i < data.length; i ++) {
			let el = data[i];
			let type: string = typeof el; // Get the js type of the element
			let tempEl = el; // Hold a temporary version of el that can be manipulated

			if (el === null || el === undefined || el.length === 0) {
				continue;
			}

			// If the prefix exists, replace it within the temporary el
			if (prefix.length > 0 && el.indexOf(prefix) === 0) {
				tempEl = tempEl.replace(prefix, '');
			}

			// If the postfix exists replace it within the temporary el
			if (postfix.length > 0 && el.indexOf(postfix) === el.length - postfix.length) {
				tempEl = tempEl.replace(new RegExp(postfix + '$'), '');
			}

			// Replace any thousands separators in the temporary element
			if (type === 'string' && tempEl.indexOf(this.thousandsSeparator) !== -1) {
				tempEl = tempEl.split(this.thousandsSeparator).join('');
			}

			// At this point the remaining value within tempEl can be converted to a number then that is it's types
			if (type === 'string' && (!isNaN(+el) || !isNaN(+tempEl))) {
				type = 'number';
			}

			// Check if there are any html tags
			if (type === 'string' && el.match(/<(“[^”]*”|'[^’]*’|[^'”>])*>/g) !== null) {
				type = 'html';
			}

			// Last chance to find a type is a date format
			if (type === 'string') {
				// Get a format for the datapoint
				let format = this.getDateFormat(el, dateSuggestion);

				// getDateFormat can tell if the data is mixed based on the suggested format and if there is a definite order
				if (dateSuggestion !== null && format === 'mixed') {
					return format;
				}
				else if (format !== 'mixed') {
					// If there is a suggested format and it doesn't match this format then check all
					//  of the previous data points against this new format as it could work for them
					if (dateSuggestion !== null && format.momentFormat !== dateSuggestion.momentFormat) {
						for (let j = 0; j < i; j++) {
							if (!moment(data[j], format.momentFormat).isValid()) {
								return 'mixed';
							}
						}
					}

					// If a format has been found for this data point
					if (format !== null) {
						// if there is a suggested format
						if (dateSuggestion !== null) {
							// if the suggested format is shorter than this then it has probably
							//  identified a short representation and so it should be used
							if (dateSuggestion.format.length < format.format.length) {
								format.format = dateSuggestion.format;
							}
							// Otherwise it must use the new format so remove the old one from potential types
							else {
								types.splice(types.indexOf('date-' + dateSuggestion), 1);
								this.previouslyDiscarded.push(dateSuggestion);
							}
						}
						// Set the type for this format and the suggestion for the next
						type = 'date-' + format.momentFormat;
						dateSuggestion = format;
					}
				}

			}

			// If this type has not been identified yet then add it to the array
			if (types.indexOf(type) === -1) {
				types.push(type);
			}
		}

		// If more than one type has been identified then it must be mixed
		if (types.length === 2 && types.indexOf('string') !== -1 && types.indexOf('html') !== -1) {
			return 'html';
		}
		else if (types.length > 1) {
			return 'mixed';
		}
		// Otherwise if only numbers have been found then that is the type
		else if (types[0] === 'number') {
			return 'number';
		}
		else if (types[0].indexOf('date') === 0) {
			return types[0];
		}

		// If no other types are found then default to string
		return 'string';
	}

	public getDateFormat(el: string, suggestion: IDateFormat): any {
		// Current format object to store the details of this element
		let format = {
			format: [],
			hasDay: false,
			hasMonth: false,
			hasYear: false,
			locale: '',
			momentFormat: '',
			separators: [],
			split: [],
			tokensUsed: []
		};

		let charSplit = el.split('');
		let separators = ['-', '/', ':', ',', ' '];
		let prev = '';

		// Iterate over all of the characters
		for (let char of charSplit) {
			// If the character is a separator
			if (separators.indexOf(char) !== -1) {
				format.split.push(prev); // Add the characters that appeared since the last separator to the split array
				format.format.push({value: '', definite: false, firm: false}); // Add a part to identify
				format.separators.push(char); // Note the Separator at this point
				prev = ''; // Clear the previous characters
			}
			else {
				// The character is not a separator so note it can continue to the next one
				prev += char;
			}
		}

		// Add the final part to the split
		format.split.push(prev);
		format.format.push({value: '', definite: false, firm: false});

		// If a previous format (suggestion) has been detected and the two have a different number of parts
		//  then the format cannot be consistent so return mixed
		if (suggestion !== null && format.split.length !== suggestion.split.length) {
				return 'mixed';
		}

		// Iterate over every part of the potential datetime
		for (let i = 0; i < format.split.length; i++) {
			// If there has been a previous suggestion and it is firm for this part
			if (suggestion !== null && suggestion.format[i].firm === true) {
				// Copy into the current format
				format.format[i] = suggestion.format[i];
				let value = format.format[i].value;  // Used a lot so store in temp variable
				format.tokensUsed.push(value);

				// Set flags for days, months and years
				if (value === 'DD' || value === 'D' || value === 'Do') {
					format.hasDay = true;
				}
				else if (value === 'YYYY' || value === 'YY' || value === 'Y') {
					format.hasYear = true;
				}
				else if (
					value === 'MM' ||
					value === 'M' ||
					value === 'MMM' ||
					value === 'MMMM'
				) {
					format.hasMonth = true;
				}

				continue;
			}

			let spl = format.split[i];

			if (spl.length === 0) {
				format.format[i] = {value: '', definite: true, firm: true};
				continue;
			}
			if (!isNaN(+spl)) {
				if (format.separators[i] === ':') {
					if (spl.indexOf('0') === 0) {
						if (format.tokensUsed.indexOf('HH') === -1 && format.tokensUsed.indexOf('H') === -1 && format.tokensUsed.indexOf('hh') === -1 && format.tokensUsed.indexOf('h') === -1) {
							format = this.setDateFormat(format, i, 'HH', true, false);
						}
						else if (format.tokensUsed.indexOf('mm') === -1 && format.tokensUsed.indexOf('m') === -1) {
							format = this.setDateFormat(format, i, 'mm', true, true);
						}
						else if (format.tokensUsed.indexOf('ss') === -1 && format.tokensUsed.indexOf('s') === -1) {
							format = this.setDateFormat(format, i, 'ss', true, true);
						}
					}
					else {
						if (format.tokensUsed.indexOf('HH') === -1 && format.tokensUsed.indexOf('H') === -1 && format.tokensUsed.indexOf('hh') === -1 && format.tokensUsed.indexOf('h') === -1) {
							format = this.setDateFormat(format, i, 'H', true, false);
						}
						else if (format.tokensUsed.indexOf('mm') === -1 && format.tokensUsed.indexOf('m') === -1) {
							format = this.setDateFormat(format, i, 'm', true, false);
						}
						else if (format.tokensUsed.indexOf('ss') === -1 && format.tokensUsed.indexOf('s') === -1) {
							format = this.setDateFormat(format, i, 's', true, false);
						}
					}
				}
				else if (i > 0 && format.separators[i - 1] === ':') {
					if (spl.indexOf('0') === 0) {
						if (format.tokensUsed.indexOf('mm') === -1 && format.tokensUsed.indexOf('m') === -1) {
							format = this.setDateFormat(format, i, 'mm', true, true);
						}
						else if (format.tokensUsed.indexOf('ss') === -1 && format.tokensUsed.indexOf('s') === -1) {
							format = this.setDateFormat(format, i, 'ss', true, true);
						}
					}
					else {
						if (format.tokensUsed.indexOf('mm') === -1 && format.tokensUsed.indexOf('m') === -1) {
							format = this.setDateFormat(format, i, 'm', true, false);
						}
						else if (format.tokensUsed.indexOf('ss') === -1 && format.tokensUsed.indexOf('ss') === -1) {
							format = this.setDateFormat(format, i, 's', true, false);
						}
					}
				}
				else {
					if (format.tokensUsed.indexOf('YYYY') === -1 && spl.length === 4) {
						format = this.setDateFormat(format, i, 'YYYY', true, true, 'hasYear', true);
						continue;
					}
					else if (format.tokensUsed.indexOf('YY') === -1 && +spl > 31) {
						format = this.setDateFormat(format, i, 'YY', true, false, 'hasYear', true);
					}
				}
			}
			else {
				if (format.tokensUsed.indexOf('Do') === -1 && spl.match(this.postFixes.en)) {
					format = this.setDateFormat(format, i, 'Do', true, true, 'hasDay', true);
				}
				else if (format.tokensUsed.indexOf('MMMM') === -1 && spl.match(this.months.en)) {
					format = this.setDateFormat(format, i, 'MMMM', true, spl === 'may' ? false : true, 'hasMonth', true);
				}
				else if (format.tokensUsed.indexOf('MMM') === -1 && spl.match(this.abbrMonths.en)) {
					format = this.setDateFormat(format, i, 'MMM', true, spl === 'may' ? false : true, 'hasMonth', true);
				}
				else if (format.tokensUsed.indexOf('dddd') === -1 && spl.match(this.days.en)) {
					format = this.setDateFormat(format, i, 'dddd', true, true);
				}
				else if (format.tokensUsed.indexOf('ddd') === -1 && spl.match(this.days.en)) {
					format = this.setDateFormat(format, i, 'ddd', true, true);
				}
				else if (format.tokensUsed.indexOf('A') === -1 && (spl === 'AM' || spl === 'PM')) {
					format = this.setDateFormat(format, i, 'A', true, true);

					for (let j = 0; j < i; j++) {
						if (format.format[j].value === 'H' && format.format[j].firm === false) {
							format = this.setDateFormat(format, j, 'h', true, true);
							break;
						}
						if (format.format[j].value === 'HH' && format.format[j].firm === false) {
							format = this.setDateFormat(format, j, 'hh', true, true);
							break;
						}
					}
				}
				else if (format.tokensUsed.indexOf('a') === -1 && (spl === 'am' || spl === 'pm')) {
					format = this.setDateFormat(format, i, 'a', true, true);

					for (let j = 0; j < i; j++) {
						if (format.format[j].value === 'H' && format.format[j].firm === false) {
							format = this.setDateFormat(format, j, 'h', true, true);
							break;
						}
						if (format.format[j].value === 'HH' && format.format[j].firm === false) {
							format = this.setDateFormat(format, j, 'hh', true, true);
							break;
						}
					}
				}
			}
		}

		let missing = 0;
		let empties = [];

		for (let i = 0; i < format.format.length; i++) {
			if (format.format[i].definite === false) {
				missing++;
				empties.push(i);
			}
		}

		if (!format.hasDay && !format.hasMonth && !format.hasYear && missing === 3) {
			let possMonth = [];
			let not = [];

			for (let empty of empties) {
				if (!isNaN(+format.split[empty])) {
					if (+format.split[empty] <= 12) {
						possMonth.push(empty);
					}
					else {
						not.push(empty);
					}
				}
			}
			if (possMonth.length === 1) {
				format = format.split[possMonth[0]].indexOf('0') === 0 ?
					this.setDateFormat(format, possMonth[0], 'MM', true, false, 'hasMonth', true) :
					this.setDateFormat(format, possMonth[0], 'M', true, false, 'hasMonth', true);
			}
		}

		for (let i = 0; i < format.format.length; i++) {
			if (
				format.format[i].value.length === 0 && format.format[i].definite === false &&
				!isNaN(+format.split[i]) &&
				(!format.hasDay || !format.hasYear || !format.hasMonth)
			) {
				if (format.hasYear && format.hasDay) {
					format = this.determineTokenFormat(format, i, 'MM', 'M', 'hasMonth');
				}
				else if (format.hasDay && format.hasMonth) {
					format = this.determineTokenFormat(format, i, 'YY', 'Y', 'hasYear');
				}
				else if (format.hasMonth && format.hasYear) {
					format = this.determineTokenFormat(format, i, 'DD', 'D', 'hasDay');
				}
				else if (format.hasYear || format.hasDay) {
					format = this.determineTokenFormat(format, i, 'MM', 'M', 'hasMonth');
				}
				else if (format.hasMonth) {
					format = this.determineTokenFormat(format, i, 'DD', 'D', 'hasDay');
				}
				else {
					format = this.determineTokenFormat(format, i, 'MM', 'M', 'hasMonth');
				}
			}
		}

		for (let i = 0; i < format.split.length - 1; i++) {
			format.momentFormat += format.format[i].value;
			format.momentFormat += format.separators[i];
		}

		format.momentFormat += format.format[format.split.length - 1].value;

		if (format.momentFormat.length > 0 && moment(el, format.momentFormat).isValid()) {

			return format;
		}
		else {
			return 'mixed';
		}
	}

	public determineTokenFormat(format, idx, a, b, has) {
		return format.split[idx].indexOf('0') === 0 ?
			this.setDateFormat(format, idx, a, true, true, has, true) :
			this.setDateFormat(format, idx, b, true, false, has, true);
	}

	public setDateFormat(format, idx, value, definite, firm, has = '', hasValue = false) {
		format.format[idx] = {value, definite, firm};
		format.tokensUsed.push(value);

		if (hasValue) {
			format[has] = hasValue;
		}

		return format;
	}

	public getFormat(data, type: string): string {
		return null;
	}

	public getPrefix(data): string {
		let prefix = data[0]; // Initialise prefix to be the entire first value
		let first = true;

		for (let el of data) {
			if (first) {
				first = false;
				continue;
			}
			// There can't be a prefix if the type isn't a string
			if (typeof el !== 'string') {
				return '';
			}

			if (el.indexOf(prefix) === 0) {
				continue;
			}

			// Gradually increase the prefix to check that it matches
			for (let i = 0; i < prefix.length; i++) {
				// If this portion of prefix is at the beginning of the string then carry on
				// Otherwise it isn't the same across all of the elements so slice it down to what has passed so far and check again
				if (el.indexOf(prefix.slice(0, i)) !== 0) {
					prefix = prefix.slice(0, i - 1);

					if (prefix.length === 0) {
						return '';
					}
				}
			}
		}

		// Anything left at this point is present at the start of every value
		//  and _may_ be considered a prefix, but this will depend on the type
		let matches = prefix.match(/^[^0-9]+/g);
		return matches !== null ? matches[0] : '';
	}

	public getPostfix(data): string {
		// If the type of the first element is not a string then there cannot be a postfix
		// Need to check this now before the string operations
		if (typeof data[0] !== 'string') {
			return '';
		}

		// Reverse the string, a postfix is a prefix working from the other end of the string
		// So, can use the same algorithm as above in `getPrefix()` to do this
		let postfix = data[0].split('').reverse().join('');
		let first = true;

		for (let el of data) {
			if (first) {
				first = false;
				continue;
			}
			// There can't be a postfix if the type isn't a string
			if (typeof el !== 'string') {
				return '';
			}

			// Reverse the element to match the reversed postfix
			el = el.split('').reverse().join('');

			if (el.indexOf(postfix) === 0) {
				continue;
			}

			// Gradually increase the postfix to check that it matches
			for (let i = 0; i < postfix.length; i++) {
				// If this portion of postfix is at the beginning of the string then carry on
				// Otherwise it isn't the same across all of the elements so slice it down to what has passed so far and check again
				if (el.indexOf(postfix.slice(0, i)) !== 0) {
					postfix = postfix.slice(0, i - 1);

					if (postfix.length === 0) {
						return '';
					}
				}
			}
		}

		// Anything left at this point is present at the end of every value, once it is
		//  reversed and _may_ be considered a postfix, but this will depend on the type
		let matches = postfix.split('').reverse().join('').match(/[^0-9]+$/g);
		return matches !== null ? matches[matches.length - 1] : '';
	}

	public getDP(data, postfix): number {
		let highestDP = 0;

		for (let el of data) {
			// Replace the postfix as it's characters do not count as decimal places
			let split = el.toString().replace(new RegExp(postfix + '$'), '').split(this.decimalCharacter);

			// Check that there is a decimal place and also if there are
			// more than previously seen - the highest value should be used
			if (split.length > 1 && split[1].length > highestDP) {
				highestDP = split[1].length;
			}
		}

		return highestDP;
	}
}
