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
			en: /^(january|february|march|april|may|june|july|august|september|october|november|december)$/gi
		};
		this.abbrMonths = {
			en: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/gi
		};
		this.days = {
			en: /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/gi
		};
		this.abbrDays = {
			en: /^(mon|tue|wed|thu|fri|sat|sun)$/gi
		};
		this.postFixes = {
			en: /^[0-9]+(st|nd|rd|th)$/gi
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

			// If the value of this part is an empty string then it is a straightforward set
			if (spl.length === 0) {
				format.format[i] = {value: '', definite: true, firm: true};
				continue;
			}

			// Some tokens are numbers
			if (!isNaN(+spl)) {
				// If the current separator is a colon then it must be immediately followed by an hour, minute or second token
				// This has to be in that order
				if (format.separators[i] === ':') {
					if (format.tokensUsed.indexOf('HH') === -1 && format.tokensUsed.indexOf('H') === -1 && format.tokensUsed.indexOf('hh') === -1 && format.tokensUsed.indexOf('h') === -1) {
						format = this.determineTokenFormat(format, i, 'HH', 'H');
					}
					else if (format.tokensUsed.indexOf('mm') === -1 && format.tokensUsed.indexOf('m') === -1) {
						format = this.determineTokenFormat(format, i, 'mm', 'm');
					}
					else if (format.tokensUsed.indexOf('ss') === -1 && format.tokensUsed.indexOf('s') === -1) {
						format = this.determineTokenFormat(format, i, 'ss', 's');
					}
				}
				// If the last separator was a colon then it is the end of the time so can only be a minute or second token
				else if (i > 0 && format.separators[i - 1] === ':') {
					if (format.tokensUsed.indexOf('mm') === -1 && format.tokensUsed.indexOf('m') === -1) {
						format = this.determineTokenFormat(format, i, 'mm', 'm');
					}
					else if (format.tokensUsed.indexOf('ss') === -1 && format.tokensUsed.indexOf('s') === -1) {
						format = this.determineTokenFormat(format, i, 'ss', 's');
					}
				}
				// If it's not a colon then can attempt to detect year
				else {
					// Only year can be 4 characters long and a number
					if (format.tokensUsed.indexOf('YYYY') === -1 && spl.length === 4) {
						format = this.setDateFormat(format, i, 'YYYY', true, true, 'hasYear');
						continue;
					}
					// Alternatively could be 2 digits if greater than 31
					else if (format.tokensUsed.indexOf('YY') === -1 && +spl > 31) {
						format = this.setDateFormat(format, i, 'YY', true, false, 'hasYear');
					}
				}
			}
			// Some tokens are strings
			else {
				// Check for capitalised AM/PM
				if (format.tokensUsed.indexOf('A') === -1 && (spl === 'AM' || spl === 'PM')) {
					format = this.setDateFormat(format, i, 'A', true, true);

					// If this is found then need to make sure that any hours found are 12 hour
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
				// Check for lower-case am/pm
				else if (format.tokensUsed.indexOf('a') === -1 && (spl === 'am' || spl === 'pm')) {
					format = this.setDateFormat(format, i, 'a', true, true);

					// If this is found then need to make sure that any hours found are 12 hour
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
				// Check for other string tokens
				else {
					format = (format.tokensUsed.indexOf('Do') === -1 && spl.match(this.postFixes.en)) ?
						this.setDateFormat(format, i, 'Do', true, true, 'hasDay') :
						(format.tokensUsed.indexOf('MMMM') === -1 && spl.match(this.months.en)) ?
							this.setDateFormat(format, i, 'MMMM', true, spl === 'may' ? false : true, 'hasMonth') :
							(format.tokensUsed.indexOf('MMM') === -1 && spl.match(this.abbrMonths.en)) ?
								this.setDateFormat(format, i, 'MMM', true, spl === 'may' ? false : true, 'hasMonth') :
								(format.tokensUsed.indexOf('dddd') === -1 && spl.match(this.days.en)) ?
									this.setDateFormat(format, i, 'dddd', true, true) :
									(format.tokensUsed.indexOf('ddd') === -1 && spl.match(this.abbrDays.en)) ?
										this.setDateFormat(format, i, 'ddd', true, true) :
										format;
				}
			}
		}

		let empties = [];

		// Find the unknown parts
		for (let i = 0; i < format.format.length; i++) {
			if (format.format[i].definite === false) {
				empties.push(i);
			}
		}

		// If there is no day, month or year then need to attempt to identify the month
		// Year will have been established above if it is greater than 31
		// Day values could be either month or year so couldn't say for sure
		if (!format.hasDay && !format.hasMonth && !format.hasYear) {
			let possMonth = [];

			// If a value is less than 12 then it could be a month
			for (let empty of empties) {
				if (!isNaN(+format.split[empty]) && +format.split[empty] <= 12) {
					possMonth.push(empty);
				}
			}

			if (possMonth.length === 1) {
				// Can now declare this a month if the others are over
				format = format.split[possMonth[0]].indexOf('0') === 0 ?
					this.setDateFormat(format, possMonth[0], 'MM', true, false, 'hasMonth') :
					this.setDateFormat(format, possMonth[0], 'M', true, false, 'hasMonth');
			}
		}

		for (let i = 0; i < format.format.length; i++) {
			if (
				format.format[i].value.length === 0 && format.format[i].definite === false &&
				!isNaN(+format.split[i]) &&
				(!format.hasDay || !format.hasYear || !format.hasMonth)
			) {
				format = (format.hasYear && format.hasDay) ? // Year and Day - must be month
					this.determineTokenFormat(format, i, 'MM', 'M', 'hasMonth') :
					(format.hasDay && format.hasMonth) ? // Day and Month - must be year
						this.determineTokenFormat(format, i, 'YY', 'Y', 'hasYear') :
						(format.hasMonth && format.hasYear) ? // Month and Year - must be day
							this.determineTokenFormat(format, i, 'DD', 'D', 'hasDay') :
							(format.hasYear || format.hasDay) ? // Year or Day - must be month. Wouldn't make sense otherwise
								this.determineTokenFormat(format, i, 'MM', 'M', 'hasMonth') :
								(format.hasMonth) ? // Month then assume day next
									this.determineTokenFormat(format, i, 'DD', 'D', 'hasDay') :
									this.determineTokenFormat(format, i, 'MM', 'M', 'hasMonth'); // Last resort assume Month
			}
		}

		// Construct momentFormat from parts and separator
		for (let i = 0; i < format.split.length - 1; i++) {
			format.momentFormat += format.format[i].value;
			format.momentFormat += format.separators[i];
		}

		// Faster to do this here than add a check every loop
		format.momentFormat += format.format[format.split.length - 1].value;

		// If there is a format and it is valid then return it
		if (format.momentFormat.length > 0 && moment(el, format.momentFormat).isValid()) {
			return format;
		}
		// Otherwise assume mixed
		else {
			return 'mixed';
		}
	}

	/**
	 * Determine whether to use a double or single token if there is a leading 0
	 * @param format The format object currently being constructed
	 * @param idx The part number
	 * @param a The first option if double token
	 * @param b The second option if single token
	 * @param has Any flag to be set
	 * @returns the updated format
	 */
	public determineTokenFormat(format, idx, a, b, has = '') {
		return format.split[idx].indexOf('0') === 0 ?
			this.setDateFormat(format, idx, a, true, true, has) :
			this.setDateFormat(format, idx, b, true, false, has);
	}

	/**
	 * Set's all of the relevant values when a new token is determined
	 * @param format The format object currently being constructed
	 * @param idx The part number
	 * @param value The token to be set
	 * @param definite Whether this is definitely the token's type
	 * @param firm Whether this is the exact token
	 * @param has Any flag to be set
	 * @returns the updated format
	 */
	public setDateFormat(format, idx, value, definite, firm, has = '') {
		format.format[idx] = {value, definite, firm};
		format.tokensUsed.push(value);

		// Set the flag if it has been defined
		if (has.length > 0) {
			format[has] = true;
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
