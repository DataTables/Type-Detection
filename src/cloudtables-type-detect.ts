import * as moment from '../node_modules/moment/moment';

type TReturnType = 'date' | 'datetime' | 'time' | 'mixed' | 'string' | 'number' | 'html';

interface IDetails {
	type: null | TReturnType;
	format: null | string;
	locale: null | string;
	prefix: null | string;
	postfix: null | string;
	dp: null | number;
}

interface IDateFormat {
	format: IFormat[];
	hasDay: boolean;
	hasMonth: boolean;
	hasYear: boolean;
	latestLocale: string | null;
	latestToken: string | null;
	locales: string[];
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

	constructor(decimalCharacter= '.', thousandsSeparator= ',') {
		this.decimalCharacter = decimalCharacter;
		this.thousandsSeparator = thousandsSeparator;
		this.months = {
			deDE: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)$/gi,
			en: /^(january|february|march|april|may|june|july|august|september|october|november|december)$/gi,
			esES: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)$/gi,
			frFR: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)$/gi
		};
		this.abbrMonths = {
			deDE: /^(jan\.|feb\.|märz\.|apr\.|mai\.|juni\.|juli\.|aug\.|sep\.|okt\.|nov\.|dez\.)$/gi,
			en: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/gi,
			esES: /^(ene\.|feb\.|mar\.|abr\.|may\.|jun\.|jul\.|ago\.|sep\.|oct\.|nov\.|dic\.)$/gi,
			frFR: /^(janv\.|févr\.|mars\.|avr\.|mai\.|juin\.|juil\.|août\.|sept\.|oct\.|nov\.|dec\.)$/gi
		};
		this.days = {
			deDE: /^(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)$/gi,
			en: /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/gi,
			esES: /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)$/gi,
			frFR: /^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)$/gi
		};
		this.abbrDays = {
			deDE: /^(mo\.|di\.|mi\.|do\.|fr\.|sa\.|so\.)$/gi,
			en: /^(mon|tue|wed|thu|fri|sat|sun)$/gi,
			esES: /^(lun\.|mar\.|mié\.|jue\.|vie\.|sáb\.|dom\.)$/gi,
			frFR: /^(lun\.|mar\.|mer\.|jeu\.|ven\.|sam\.|dim\.)$/gi
		};
		this.postFixes = {
			deDE: /^[0-9]+(st|nd|rd|th)$/gi,
			en:   /^[0-9]+(st|nd|rd|th)$/gi,
			esES: /^[0-9]+(st|nd|rd|th)$/gi,
			frFR: /^[0-9]+(st|nd|rd|th)$/gi
		};
	}

	/**
	 * Detects the type and additional details from the overall data set.
	 * @param data The dataset to have a type detected
	 * @returns string - the type that has been detected and any additional details for that type
	 */
	public typeDetect(data: any[]): IDetails {
		let details: IDetails = {
			dp: null,
			format: null,
			locale: null,
			postfix: null,
			prefix: null,
			type: null
		};

		// If there is no data then return blank details
		if (!data || data.length === 0) {
			return details;
		}

		// Identify possible prefix and postfix - will only be used if certain types are identified
		let possPrefix = this._getPrefix(data);
		let possPostfix = this._getPostfix(data);

		let potentialType = this._getType(data, possPrefix, possPostfix);

		// If the type is a datetime, date or time then the format needs to be set.
		if (potentialType.indexOf('date') !== -1 || potentialType.indexOf('time') !== -1) {
			let splitdate = potentialType.split('_');
			details.format = splitdate[1];

			// If a format cannot be determined then default back to a string type
			if (details.format === null) {
				details.type = 'string';
			}
			else {
				details.type = splitdate[0] as TReturnType;
				details.locale = splitdate[2];
			}
		}
		else if (potentialType.indexOf('number') !== -1) {
			// If the type is a number then use the previously identified postfix and prefix
			details.type = 'number';
			details.prefix = possPrefix;
			details.postfix = possPostfix;
			// Also determine the number of decimal places
			details.dp = potentialType === 'excel_number' ?
				this._getExcelDP(data, possPostfix) :
				this._getDP(data, possPostfix);
		}
		else {
			details.type = potentialType as TReturnType;
		}

		return details;
	}

	/**
	 * Gets the actual type of the data as a string
	 * @param data The array of data to be processed
	 * @param prefix Any prefix that has been detected within the dataset
	 * @param postfix Any postfix that has been detected within the dataset
	 * @returns string - the actual type of the data
	 */
	private _getType(data: any[], prefix: string, postfix: string): string {
		let types: string[] = [];
		let dateSuggestion: null | IDateFormat = null;

		// A type can only be set if all of the data fits it
		for (let i = 0; i < data.length; i ++) {
			let el = data[i];

			if (el === null || el === undefined || el.length === 0) {
				continue;
			}

			let type: string = typeof el;
			let tempEl = type === 'object' ?
				{...el} :
				el;

			// If the prefix exists, replace it within the temporary el
			if (prefix.length > 0) {
				if (type === 'string'  && el.indexOf(prefix) === 0) {
					tempEl = tempEl.replace(prefix, '');
				}
				else if (typeof tempEl.value === 'string'  && el.value.indexOf(prefix) === 0) {
					tempEl.value = tempEl.value.replace(prefix, '');
				}
			}

			// If the postfix exists replace it within the temporary el
			if (postfix.length > 0) {
				if (type === 'string' && el.indexOf(postfix) === el.length - postfix.length) {
					tempEl = tempEl.replace(new RegExp(postfix + '$'), '');
				}
				else if (typeof tempEl.value === 'string' && el.value.indexOf(postfix) === el.value.length - postfix.length) {
					tempEl.value = tempEl.value.replace(new RegExp(postfix + '$'), '');
				}
			}

			// Replace any thousands separators in the temporary element
			if (type === 'string' && tempEl.indexOf(this.thousandsSeparator) !== -1) {
				tempEl = tempEl.split(this.thousandsSeparator).join('');
			}
			else if (typeof tempEl.value === 'string' && tempEl.value.indexOf(this.thousandsSeparator) !== -1) {
				tempEl.value = tempEl.value.split(this.thousandsSeparator).join('');
			}

			// Replace any thousands separators in the temporary element
			if (this.decimalCharacter !== '.') {
				if (type === 'string' && tempEl.indexOf(this.decimalCharacter) !== -1) {
					tempEl = tempEl.split(this.decimalCharacter).join('.');
				}
				else if (typeof tempEl.value === 'string' && tempEl.value.indexOf(this.decimalCharacter) !== -1) {
					tempEl.value = tempEl.value.split(this.decimalCharacter).join('.');
				}
			}

			// At this point the remaining value within tempEl can be converted to a number then that is it's types
			if (type === 'string' && (!isNaN(+el) || !isNaN(+tempEl))) {
				type = 'number';
			}
			else if (!isNaN(+el.value) || !isNaN(+tempEl.value)) {
				type = 'excel_number';
			}
			// Check if there are any html tags
			else if (type === 'string' && el.match(/<(“[^”]*”|'[^’]*’|[^'”>])*>/g) !== null) {
				type = 'html';
			}
			else {
				let excel = null;

				// This flag makes sure that the correct values are used to check for dates
				if (type === 'object') {
					excel = true;
				}
				else if (type === 'string') {
					excel = false;
				}

				if (excel !== null) {
					// Get a format for the datapoint
					let format = this._getDateFormat(!excel ? el : el.value, dateSuggestion);

					// getDateFormat can tell if the data is mixed based on the suggested format and if there is a definite order
					if (dateSuggestion !== null && format === 'mixed') {
						return format;
					}
					else if (format !== 'mixed') {
						// If there is a suggested format and it doesn't match this format then check all
						//  of the previous data points against this new format as it could work for them
						if (dateSuggestion !== null && format.momentFormat !== dateSuggestion.momentFormat) {
							for (let j = 0; j < i; j++) {
								if (
									!moment(
										!excel ? data[j] : data[j].value,
										format.momentFormat,
										format.locales.length > 0 ?
											format.locales[0].substring(0, 2) :
											'en'
									).isValid()
								) {
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
								}
							}

							let leadingtoken = 'date_'
							if (format.momentFormat.indexOf(':') !== -1) {
								leadingtoken = (format.momentFormat.indexOf(' ') !== -1) ?
									'datetime_' :
									'time_';
							}
							// Set the type for this format and the suggestion for the next
							type = leadingtoken + format.momentFormat + '_' + format.locales.join('-');
							dateSuggestion = format;
						}
					}
				}
			}

			// If this type has not been identified yet then add it to the array
			if (types.indexOf(type) === -1) {
				types.push(type);
			}

			if (
				types.length > 1 &&
				(
					types.indexOf('string') === -1 ||
					types.indexOf('html') === -1
				)
			) {
				return 'mixed';
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
		else if (
			types[0] === 'number' ||
			types[0] === 'excel_number' ||
			types[0].indexOf('date') !== -1 ||
			types[0].indexOf('time') !== -1
		) {
			return types[0];
		}
		// If no other types are found then default to string
		return 'string';
	}

	/**
	 * Determines a date format for a value that is passed in.
	 * @param el The potential date that is to have a value determined
	 * @param suggestion The previously suggested format for other values in the same field
	 * @returns the suggested format for the field
	 */
	private _getDateFormat(el: string, suggestion: IDateFormat): any {
		// Current format object to store the details of this element
		let format: IDateFormat = {
			format: [],
			hasDay: false,
			hasMonth: false,
			hasYear: false,
			latestLocale: null,
			latestToken: null,
			locales: [],
			momentFormat: '',
			separators: [],
			split: [],
			tokensUsed: []
		};

		let defaultFormatFormat = {value: '', definite: false, firm: false};

		let charSplit = el.split('');
		let separators = ['-', '/', ':', ',', ' '];
		let prev = '';

		// Iterate over all of the characters
		for (let char of charSplit) {
			// If the character is a separator
			if (separators.indexOf(char) !== -1) {
				format.split.push(prev); // Add the characters that appeared since the last separator to the split array
				format.format.push(defaultFormatFormat); // Add a part to identify
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
		format.format.push(defaultFormatFormat);

		let formatSplitLength = format.split.length;

		// If a previous format (suggestion) has been detected and the two have a different number of parts
		//  then the format cannot be consistent so return mixed
		if (suggestion !== null && formatSplitLength !== suggestion.split.length) {
			return 'mixed';
		}

		// Iterate over every part of the potential datetime
		for (let i = 0; i < format.split.length; i++) {
			// If there has been a previous suggestion and it is firm for this part
			if (suggestion !== null && suggestion.format[i].firm === true) {
				// Copy into the current format
				format.locales = suggestion.locales;
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
						format = this._determineTokenFormat(format, i, 'HH', 'H');
					}
					else if (format.tokensUsed.indexOf('mm') === -1 && format.tokensUsed.indexOf('m') === -1) {
						format = this._determineTokenFormat(format, i, 'mm', 'm');
					}
					else if (format.tokensUsed.indexOf('ss') === -1 && format.tokensUsed.indexOf('s') === -1) {
						format = this._determineTokenFormat(format, i, 'ss', 's');
					}
				}
				// If the last separator was a colon then it is the end of the time so can only be a minute or second token
				else if (i > 0 && format.separators[i - 1] === ':') {
					if (format.tokensUsed.indexOf('mm') === -1 && format.tokensUsed.indexOf('m') === -1) {
						format = this._determineTokenFormat(format, i, 'mm', 'm');
					}
					else if (format.tokensUsed.indexOf('ss') === -1 && format.tokensUsed.indexOf('s') === -1) {
						format = this._determineTokenFormat(format, i, 'ss', 's');
					}
				}
				// If it's not a colon then can attempt to detect year
				else {
					// Only year can be 4 characters long and a number
					if (format.tokensUsed.indexOf('YYYY') === -1 && spl.length === 4) {
						format = this._setDateFormat(format, i, 'YYYY', true, true, undefined, 'hasYear');
						continue;
					}
					// Alternatively could be 2 digits if greater than 31
					else if (format.tokensUsed.indexOf('YY') === -1 && +spl > 31) {
						format = this._setDateFormat(format, i, 'YY', true, false, undefined, 'hasYear');
					}
				}
			}
			// Some tokens are strings
			else {
				// Check for capitalised AM/PM
				if (format.tokensUsed.indexOf('A') === -1 && (spl === 'AM' || spl === 'PM')) {
					format = this._setDateFormat(format, i, 'A', true, true);

					// If this is found then need to make sure that any hours found are 12 hour
					for (let j = 0; j < i; j++) {
						let formatFormat = format.format[j];
						if (formatFormat.firm === false && formatFormat.value.indexOf('H') !== -1) {
							format = this._setDateFormat(format, j, formatFormat.value.toLocaleLowerCase(), true, true);
							break;
						}
					}
				}
				// Check for lower-case am/pm
				else if (format.tokensUsed.indexOf('a') === -1 && (spl === 'am' || spl === 'pm')) {
					format = this._setDateFormat(format, i, 'a', true, true);

					// If this is found then need to make sure that any hours found are 12 hour
					for (let j = 0; j < i; j++) {
						let formatFormat = format.format[j];
						if (formatFormat.firm === false && formatFormat.value.indexOf('H') !== -1) {
							format = this._setDateFormat(format, j, formatFormat.value.toLocaleLowerCase(), true, true);
							break;
						}
					}
				}
				// Check for other string tokens
				else {
					// Get the possible locales
					let locales = format.locales.length > 0 ?
						format.locales :
						Object.keys(this.abbrDays);

					let tokensThisRound = [];
					let localesThisRound = [];

					for (let locale of locales) {
						format.latestToken = null;
						format.latestLocale = null;
						format = (
								(format.tokensUsed.indexOf('Do') === -1 || tokensThisRound.indexOf('Do') !== -1) &&
								spl.match(this.postFixes[locale])
							) ?
								this._setDateFormat(format, i, 'Do', true, true, locale, 'hasDay') :
								(
									(format.tokensUsed.indexOf('MMMM') === -1 || tokensThisRound.indexOf('MMMM') !== -1) &&
									spl.match(this.months[locale])
								) ?
									this._setDateFormat(format, i, 'MMMM', true, spl === 'may' ? false : true, locale, 'hasMonth') :
									(
										(format.tokensUsed.indexOf('MMM') === -1 || tokensThisRound.indexOf('MMM') !== -1) &&
										spl.match(this.abbrMonths[locale])
									) ?
										this._setDateFormat(format, i, 'MMM', true, spl === 'may' ? false : true, locale, 'hasMonth') :
										(
											(format.tokensUsed.indexOf('dddd') === -1 || tokensThisRound.indexOf('dddd') !== -1) &&
											spl.match(this.days[locale])
										) ?
											this._setDateFormat(format, i, 'dddd', true, true, locale) :
											(
												(format.tokensUsed.indexOf('ddd') === -1 || tokensThisRound.indexOf('ddd') !== -1) &&
												spl.match(this.abbrDays[locale])
											) ?
												this._setDateFormat(format, i, 'ddd', true, true, locale) :
												format;

						if (format.latestToken !== null) {
							tokensThisRound.push(format.latestToken);
						}
						if (format.latestLocale !== null) {
							localesThisRound.push(format.latestLocale);
						}
					}

					let newLocales = [];

					for (let locale of localesThisRound) {
						if (format.locales.indexOf(locale) !== -1) {
							newLocales.push(locale);
						}
					}

					format.locales = localesThisRound;
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
					this._setDateFormat(format, possMonth[0], 'MM', true, false, undefined, 'hasMonth') :
					this._setDateFormat(format, possMonth[0], 'M', true, false, undefined, 'hasMonth');
			}
		}

		for (let i = 0; i < format.format.length; i++) {
			if (
				format.format[i].value.length === 0 && format.format[i].definite === false &&
				!isNaN(+format.split[i]) &&
				(!format.hasDay || !format.hasYear || !format.hasMonth)
			) {
				format = (format.hasYear && format.hasDay) ? // Year and Day - must be month
					this._determineTokenFormat(format, i, 'MM', 'M', undefined, 'hasMonth') :
					(format.hasDay && format.hasMonth) ? // Day and Month - must be year
						this._determineTokenFormat(format, i, 'YY', 'Y', undefined, 'hasYear') :
						(format.hasMonth && format.hasYear) ? // Month and Year - must be day
							this._determineTokenFormat(format, i, 'DD', 'D', undefined, 'hasDay') :
							(format.hasYear || format.hasDay) ? // Year or Day - must be month. Wouldn't make sense otherwise
								this._determineTokenFormat(format, i, 'MM', 'M', undefined, 'hasMonth') :
								(format.hasMonth) ? // Month then assume day next
									this._determineTokenFormat(format, i, 'DD', 'D', undefined, 'hasDay') :
									this._determineTokenFormat(format, i, 'MM', 'M', undefined, 'hasMonth'); // Last resort assume Month
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
		if (
			format.momentFormat.length > 0 &&
			moment(el, format.momentFormat, format.locales.length > 0 ? format.locales[0].substring(0, 2) : 'en').isValid()
		) {
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
	private _determineTokenFormat(format, idx, a, b, locale?, has = '') {
		return format.split[idx].indexOf('0') === 0 ?
			this._setDateFormat(format, idx, a, true, true, locale, has) :
			this._setDateFormat(format, idx, b, true, false, locale, has);
	}

	/**
	 * Set's all of the relevant values when a new token is determined
	 * @param format The format object currently being constructed
	 * @param idx The part number
	 * @param value The token to be set
	 * @param definite Whether this is definitely the token's type
	 * @param firm Whether this is the exact token
	 * @param locale Optional, any locale that is associated with this value/token combination
	 * @param has Any flag to be set
	 * @returns the updated format
	 */
	private _setDateFormat(format, idx, value, definite, firm, locale?, has = '') {
		format.format[idx] = {value, definite, firm};
		format.tokensUsed.push(value);
		format.latestToken = value;
		format.latestLocale = (locale !== undefined) ? locale : null;

		if (locale !== undefined && format.locales.indexOf(locale) === -1) {
			format.locales.push(locale);
		}

		// Set the flag if it has been defined
		if (has.length > 0) {
			format[has] = true;
		}

		return format;
	}

	private _getPrefix(data): string {
		let prefix = data[0]; // Initialise prefix to be the entire first value

		if (typeof prefix === 'object') {
			let idx = prefix.excel.indexOf('"');

			// Can check for a quotation mark before going any further
			// If there is not one at the start then no prefix
			if (idx !== 0) {
				return '';
			}

			let lastIdx = prefix.excel.lastIndexOf('"');

			// There needs to be at least 2 quotation marks
			if (idx !== lastIdx) {
				let excelPrefix = prefix.excel.match(/^\"[^"]*\"/ig)[0];

				for (let i = 1; i < data.length; i++) {
					if (data[i].excel.indexOf(excelPrefix) !== 0) {
						return '';
					}
				}

				return excelPrefix.replace(/\"/g, '');
			}

			return '';
		}
		else {
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
					// Otherwise it isn't the same across all of the elements so slice it down
					//  to what has passed so far and check again
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
	}

	private _getPostfix(data): string {
		let type = typeof data[0];
		if (type === 'object') {
			let postfix = data[0];
			let idx = postfix.excel.indexOf('"');

			// Can check for a quotation mark before going any further
			// If there is not one then there is no postfix with excel
			if (idx === -1) {
				return'';
			}

			let lastIdx = postfix.excel.lastIndexOf('"');

			// There need to be at least 2 quotation marks and the last one must be at the end
			if (
				idx !== lastIdx &&
				lastIdx === postfix.excel.length - 1
			) {
				let excelPostfix = postfix.excel.match(/\"[^\"]*\"$/ig)[0];

				for (let i = 1; i < data.length; i++) {
					if (data[i].excel.match(new RegExp(excelPostfix + '$')) === null) {
						return '';
					}
				}

				return excelPostfix.replace(/\"/g, '');
			}

			return '';
		}
		// If the type of the first element is not a string then there cannot be a postfix
		// Need to check this now before the string operations
		else if (type === 'string') {
			// Reverse the string, a postfix is a prefix working from the other end of the string
			// So, can use the same algorithm as above in `getPrefix()` to do this
			let postfix = data[0].split('').reverse().join('');

			for (let i = 1; i < data.length; i++) {
				let el = data[i];
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
				for (let j = 0; j < postfix.length; j++) {
					// If this portion of postfix is at the beginning of the string then carry on
					// Otherwise it isn't the same across all of the elements so slice it down to
					//  what has passed so far and check again
					if (el.indexOf(postfix.slice(0, j)) !== 0) {
						postfix = postfix.slice(0, j - 1);

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

		return '';
	}

	private _getDP(data, postfix): number {
		let highestDP = 0;
		let replaceRegex = new RegExp(postfix + '$');

		for (let el of data) {
			// Replace the postfix as it's characters do not count as decimal places
			let split = el.toString().replace(replaceRegex, '').split(this.decimalCharacter);

			// Check that there is a decimal place and also if there are
			// more than previously seen - the highest value should be used
			if (split.length > 1 && split[1].length > highestDP) {
				highestDP = split[1].length;
			}
		}

		return highestDP;
	}

	private _getExcelDP(data, postfix): number {
		let highestDP = 0;
		let replaceRegex = new RegExp(postfix + '$');

		for (let el of data) {
			// Replace the postfix as it's characters do not count as decimal places
			let split = el.value.toString().replace(replaceRegex, '').split(this.decimalCharacter);

			// Check that there is a decimal place and also if there are
			// more than previously seen - the highest value should be used
			if (split.length > 1 && split[1].length > highestDP) {
				highestDP = split[1].length;
			}
		}

		return highestDP;
	}
}

// This method is a good start towards more advanced excel format detection.
// Cloudtables is not yet equipped to deal with this much info yet though so it can wait here incase that point comes.

// interface IExcelFormat {
// 	dp: number;
// 	fraction: boolean;
// 	scaleThousands: number;
// 	thousandsSeparated: boolean;
// 	leadingZeros: number;
// 	forceLeadingZeros: boolean;
// 	colours: object[];
// 	hideZeroValues: boolean;
// 	hideAllValues: boolean;
// 	includesDateTime: boolean;
// }

// public getAdvancedExcelFormat(el: any): any {
// 	if (typeof el !== 'object' || Object.keys(el).length !== 2) {
// 		return false;
// 	}

// 	let value = el.value;
// 	let code = el.excel;
// 	let format: IExcelFormat = {
// 		colours: [],
// 		dp: 0,
// 		forceLeadingZeros: false,
// 		fraction: false,
// 		hideAllValues: false,
// 		hideZeroValues: false,
// 		includesDateTime: false,
// 		leadingZeros: 0,
// 		scaleThousands: 0,
// 		thousandsSeparated: false
// 	};

// 	if (code.indexOf('.') !== -1) {
// 		format.dp = code.split('.')[1].length;
// 	}

// 	if (code.indexOf('/') !== -1 && code.match(/[a-z]/ig) === null) {
// 		format.fraction = true;
// 	}

// 	if (code.indexOf(',') !== - 1) {
// 		if (code.lastIndexOf(',') !== code.length - 1) {
// 			format.thousandsSeparated = true;
// 		}

// 		let tempCode = code;

// 		while (tempCode.lastIndexOf(',') === tempCode.length - 1) {
// 			tempCode = tempCode.slice(0, -1);
// 			format.scaleThousands++;
// 		}
// 	}

// 	if (code.indexOf('"') === 0 && code.split('"')[1].indexOf('0') === 0) {
// 		format.forceLeadingZeros = true;
// 	}

// 	if (code.split('"')[(code.split('"').length > 1 ? 1 : 0)].match(/^0+/g) !== null) {
// 		format.leadingZeros = code.split('"')[(code.split('"').length > 1 ? 1 : 0)].match(/^0+/g)[0].length;
// 	}

// 	let tempCode = code;
// 	while (tempCode.indexOf('[') !== -1) {
// 		let match = tempCode.match(/\[[^\[]*\]/ig)[0];
// 		let colour = match.split(/(\[|\])/ig)[1];
// 		let condition = null;
// 		tempCode = tempCode.replace(match, '');
// 		if (tempCode.indexOf('[') !== -1) {
// 			match = tempCode.match(/\[[^\[]*\]/ig)[0];
// 			condition = match.split(/(\[|\])/ig)[1];
// 			tempCode = tempCode.replace(match, '');
// 		}
// 		format.colours.push({colour, condition});
// 	}

// 	if (code.match(/[^0-9\#\?]*/ig) !== null && code.match(/[^0-9\#\?]*/ig)[0].length === code.length) {
// 		format.includesDateTime = true;
// 	}

// 	return format;
// }
