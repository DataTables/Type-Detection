import { fileURLToPath } from 'url';
import * as moment from '../node_modules/moment/moment';

type TReturnType = 'date' | 'datetime' | 'time' | 'mixed' | 'string' | 'number' | 'html' | 'sequence';

interface IDetails {
	dp: null | number;
	format: null | string;
	locale: null | string;
	postfix: null | string;
	prefix: null | string;
	type: null | TReturnType;
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
	definite: boolean;
	firm: boolean;
	value: string;
}

interface ILangOpts {
	abbrDays?: {[key: string]: RegExp};
	abbrMonths?: {[key: string]: RegExp};
	days?: {[key: string]: RegExp};
	months?: {[key: string]: RegExp};
	postFixes?: {[key: string]: RegExp};
}

export default class TypeDetect {

	private decimalCharacter: string;
	private thousandsSeparator: string;
	private langOpts: ILangOpts;

	public constructor(decimalCharacter= '.', thousandsSeparator= ',') {
		this.decimalCharacter = decimalCharacter;
		this.thousandsSeparator = thousandsSeparator;
		this.langOpts = {
			abbrDays: {
				deDE: /^(mo\.|di\.|mi\.|do\.|fr\.|sa\.|so\.)$/gi,
				en: /^(mon|tue|wed|thu|fri|sat|sun)$/gi,
				esES: /^(lun\.|mar\.|mié\.|jue\.|vie\.|sáb\.|dom\.)$/gi,
				frFR: /^(lun\.|mar\.|mer\.|jeu\.|ven\.|sam\.|dim\.)$/gi
			},
			abbrMonths: {
				deDE: /^(jan\.|feb\.|märz\.|apr\.|mai\.|juni\.|juli\.|aug\.|sep\.|okt\.|nov\.|dez\.)$/gi,
				en: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/gi,
				esES: /^(ene\.|feb\.|mar\.|abr\.|may\.|jun\.|jul\.|ago\.|sep\.|oct\.|nov\.|dic\.)$/gi,
				frFR: /^(janv\.|févr\.|mars\.|avr\.|mai\.|juin\.|juil\.|août\.|sept\.|oct\.|nov\.|dec\.)$/gi
			},
			days: {
				deDE: /(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)/gi,
				en: /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi,
				esES: /(lunes|martes|miércoles|jueves|viernes|sábado|domingo)/gi,
				frFR: /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)/gi
			},
			months: {
				deDE: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)$/gi,
				en: /^(january|february|march|april|may|june|july|august|september|october|november|december)$/gi,
				esES: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)$/gi,
				frFR: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)$/gi
			},
			postFixes: {
				deDE: /^[0-9]+(st|nd|rd|th)$/gi,
				en:   /^[0-9]+(st|nd|rd|th)$/gi,
				esES: /^[0-9]+(st|nd|rd|th)$/gi,
				frFR: /^[0-9]+(st|nd|rd|th)$/gi
			}
		};
	}

	/**
	 * Detects the type and additional details from the overall data set.
	 *
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
		if (
			potentialType.indexOf('date_') === 0 ||
			potentialType.indexOf('time_') === 0 ||
			potentialType.indexOf('datetime_') === 0
		) {
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
		else if (potentialType.includes('number')) {
			// If the type is a number then use the previously identified postfix and prefix
			details.type = 'number';
			details.prefix = possPrefix;
			details.postfix = possPostfix;
			// Also determine the number of decimal places
			details.dp = this._getDP(data, possPostfix);
		}
		else if (potentialType.includes('sequence')) {
			// If the type is a number then use the previously identified postfix and prefix
			details.type = 'sequence';
			details.prefix = '';
			details.postfix = '';
			// Also determine the number of decimal places
			details.dp = this._getDP(data, '');

			// Sequences cannot have decimal places
			if(details.dp > 0) {
				details.type = 'number';
			}
		}
		else {
			details.type = potentialType as TReturnType;
		}

		return details;
	}

	/**
	 * Extends the language options that are available by default.
	 *
	 * @param langOpts The extra language options that are to be added to/override the existing language options
	 * @returns self for chaining
	 */
	public i18n(langOpts: ILangOpts): TypeDetect {
		if (langOpts.abbrDays) {
			this.langOpts.abbrDays = {...this.langOpts.abbrDays, ...langOpts.abbrDays};
		}
		if (langOpts.abbrMonths) {
			this.langOpts.abbrMonths = {...this.langOpts.abbrMonths, ...langOpts.abbrMonths};
		}
		if (langOpts.days) {
			this.langOpts.days = {...this.langOpts.days, ...langOpts.days};
		}
		if (langOpts.months) {
			this.langOpts.months = {...this.langOpts.months, ...langOpts.months};
		}
		if (langOpts.postFixes) {
			this.langOpts.postFixes = {...this.langOpts.postFixes, ...langOpts.postFixes};
		}
		return this;
	}

	/**
	 * Gets the actual type of the data as a string
	 *
	 * @param data The array of data to be processed
	 * @param prefix Any prefix that has been detected within the dataset
	 * @param postfix Any postfix that has been detected within the dataset
	 * @returns string - the actual type of the data and occasionally the
	 * format of the data in dates this is underscore separated
	 */
	private _getType(data: any[], prefix: string, postfix: string): string {
		let types: string[] = [];
		let dateSuggestion: null | IDateFormat = null;
		let postFixRegExp = new RegExp(this._escapeRegExp(postfix) + '$');
		let thousandsRegExp = new RegExp(this._escapeRegExp(this.thousandsSeparator), 'g');

		// A type can only be set if all of the data fits it
		for (let i = 0; i < data.length; i ++) {
			let el = data[i];

			if (el === null || el === undefined || el === '') {
				continue;
			}

			let type: string = typeof el;
			let tempEl = el;

			if (Array.isArray(tempEl)) {
				return 'array';
			}
			else if (type === 'object' && tempEl.excel === undefined) {
				return 'object';
			}

			if (type === 'object') {
				type = typeof el.value;
				tempEl = el.value;
			}

			// Need a temp el to replace and one to track
			let tempElReplaced = tempEl;

			// If the prefix exists, replace it within the temporary el
			if (prefix.length > 0 && tempEl.indexOf(prefix) === 0 && tempEl.length !== prefix.length) {
				tempElReplaced = tempElReplaced.replace(prefix, '');
			}

			// If the postfix exists replace it within the temporary el
			if (
				postfix.length > 0 &&
				tempElReplaced.indexOf(postfix) === tempElReplaced.length - postfix.length &&
				tempElReplaced.length !== prefix.length
			) {
				tempElReplaced = tempElReplaced.replace(postFixRegExp, '');
			}

			// Replace any thousands separators in the temporary element
			if (type === 'string') {
				tempElReplaced = tempElReplaced.replace(thousandsRegExp, '');
			}

			// Replace any decimal characters in the temporary element
			if (this.decimalCharacter !== '.' && tempElReplaced.includes(this.decimalCharacter)) {
				tempElReplaced = tempElReplaced.split(this.decimalCharacter).join('.');
			}

			// Check if there are any html tags
			if (type === 'string' && tempEl.match(/<(“[^”]*”|'[^’]*’|[^'”>])*>/g) !== null) {
				type = 'html';
			}
			// Check if it is a url
			else if(type === 'string' && tempEl.match(/:\/\//g) !== null) {
				type = 'string';
			}
			// At this point if the remaining value within tempEl can be converted to a number then it is a number
			else if (
				type === 'string' &&
				(!isNaN(+el) && el.length > 0 || !isNaN(+tempElReplaced) && tempElReplaced.length > 0)
			) {
				if(data.length === 1 && prefix.length + postfix.length > 3 * tempElReplaced.length) {
					type = 'string';
				}
				else {
					type = 'number';
				}
			}
			else if (type === 'string') {
				// Get a format for the datapoint
				let format = this._getDateFormat(typeof el === 'string' ? el : el.value, dateSuggestion);

				// getDateFormat can tell if the data is mixed based on the
				//  suggested format and if there is a definite order
				if (dateSuggestion !== null && (format === 'mixed' || format === 'string')) {
					return format;
				}
				else if (typeof format !== 'string') {
					// If there is a suggested format and it doesn't match this format then check all
					//  of the previous data points against this new format as it could work for them
					if (dateSuggestion !== null && format.momentFormat !== dateSuggestion.momentFormat) {
						for (let j = 0; j < i; j++) {
							if (
								!moment(
									!(typeof el === 'object') ? data[j] : data[j].value,
									format.momentFormat,
									format.locales.length > 0 ?
										format.locales[0].substring(0, 2) :
										'en'
								).isValid()
							) {
								// This didn't work for the previous data,
								// but did the previous suggestion work for this point?
								if(
									!moment(
										!(typeof el === 'object') ? data[i] : data[i].value,
										dateSuggestion.momentFormat,
										dateSuggestion.locales.length > 0 ?
											dateSuggestion.locales[0].substring(0, 2) :
											'en'
									).isValid()
								) {
									return 'mixed';
								}
								else {
									format = dateSuggestion;
								}
							}
						}
					}

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

					let leadingtoken = 'date_';
					if (format.momentFormat.includes(':')) {
						let tempFormat = format.momentFormat.replace(' A', 'A').replace(' a', 'a');
						leadingtoken = tempFormat.includes(' ') || tempFormat.includes('T') ?
							'datetime_' :
							'time_';
					}
					// Set the type for this format and the suggestion for the next
					type = leadingtoken + format.momentFormat + '_' + format.locales.join('-');
					dateSuggestion = format;
				}
			}

			// If this type has not been identified yet then add it to the array
			if (!types.includes(type)) {
				types.push(type);
			}

			if (
				types.length === 2 &&
				(
					!types.includes('string') ||
					!types.includes('html')
				)
			) {
				return 'mixed';
			}
		}

		// If more than one type has been identified then it must be mixed
		if (types.length === 2 && types.includes('string') && types.includes('html')) {
			return 'html';
		}
		else if (types.length > 1) {
			return 'mixed';
		}
		else if(types[0] === 'number') {
			return this._isSequence(data) ? 'sequence' : types[0];
		}
		// Otherwise if only numbers have been found then that is the type
		else if (
			types.length && (
				types[0].includes('date') ||
				types[0].includes('time') ||
				types[0].includes('html')
			)
		) {
			return types[0];
		}

		// If no other types are found then default to string
		return 'string';
	}

	/**
	 * Determines a date format for a value that is passed in.
	 * A big major condition here is that some combinations of tokens are not allowed.
	 * For example, `2021 2021` will not be picked up as `YYYY YYYY` and
	 * `2021 21` will not be picked up as `YYYY YY` Full details on this are provided in the readme
	 * https://github.com/DataTables/Type-Detection#tokens
	 *
	 * @param el The potential date that is to have a value determined
	 * @param suggestion The previously suggested format for other values in the same field
	 * @returns the suggested format for the field
	 */
	private _getDateFormat(el: string, suggestion: IDateFormat): IDateFormat | 'mixed' | 'string' {
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

		let defaultFormatFormat = {
			definite: false,
			firm: false,
			value: ''
		};

		let origEl = el;
		// Get the possible locales
		let locales = format.locales.length > 0 ?
			format.locales :
			Object.keys(this.langOpts.abbrDays);

		for (let locale of locales) {
			if(el.match(this.langOpts.days[locale]) !== null) {
				el = el.replace(this.langOpts.days[locale], '{day}');
				format.locales.push(locale);
			}
		}

		let charSplit = el.split('');
		let separators = ['-', '/', ':', ',', ' ', '+'];
		let prev = '';

		// Iterate over all of the characters
		for (let char of charSplit) {
			// If the character is a separator
			if (separators.includes(char)) {
				if(prev.match(/[0-9]T[0-9]/g)) {
					let prevSplit = prev.split('T');
					format.split.push(prevSplit[0]);
					format.separators.push('T');
					format.format.push(defaultFormatFormat); // Add a part to identify
					format.split.push(prevSplit[1]);
				}
				else {
					// Add the characters that appeared since the last separator to the split array
					format.split.push(prev);
				}
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
				let value = format.format[i].value; // Used a lot so store in temp variable
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
				format.format[i] = {
					definite: true,
					firm: true,
					value: ''
				};
				continue;
			}

			if (spl === '{day}') {
				this._setDateFormat(format, i, 'dddd', true, true);
			}
			else if (spl === 'T') {
				this._setDateFormat(format, i, 'T', true, true);
			}
			// Some tokens are numbers
			else if (!isNaN(+spl)) {
				// If the previous separator was a plus and offset has not been included yet
				if (
					format.separators[i-1] === '+' &&
					!format.tokensUsed.includes('ZZ') &&
					!format.tokensUsed.includes('Z') ||
					// Or the previous separator was a minus, immediately preceeded by a ' '
					format.separators[i-1] === '-' &&
					format.separators[i-2] === ' ' &&
					format.split[i-1] === '' ||
					// Or the previous separator was a minus and the one immediately before that was a ':'
					format.separators[i-1] === '-' &&
					format.separators[i-2] === ':'
				) {
					// The current token must be a time offset
					format = this._determineTokenFormat(format, i, 'ZZ', 'Z');
				}
				else if(i > 1 && format.format[i-1].value.includes('Z')) {
					format.format[i] = {
						definite: true,
						firm: true,
						value: ''
					};
					continue;
				}
				// If the current separator is a colon then it must be immediately followed by an hour,
				// minute or second token. This has to be in that order.
				else if (format.separators[i] === ':') {
					// Have to check for all 4 tokens here to ensure not 2 hours even though we will only set HH or H
					// These can be converted later to hh and h if AM/PM is detected later.
					if (
						!format.tokensUsed.includes('HH') &&
						!format.tokensUsed.includes('H') &&
						!format.tokensUsed.includes('hh') &&
						!format.tokensUsed.includes('h')
					) {
						format = this._determineTokenFormat(format, i, 'HH', 'H');
					}
					else if (!format.tokensUsed.includes('mm') && !format.tokensUsed.includes('m')) {
						format = this._determineTokenFormat(format, i, 'mm', 'm');
					}
					else if (!format.tokensUsed.includes('ss') && !format.tokensUsed.includes('s')) {
						format = this._determineTokenFormat(format, i, 'ss', 's');
					}
				}
				// If the last separator was a colon then it is the end of the time so can only be
				//   a minute or second token
				else if (i > 0 && format.separators[i - 1] === ':') {
					if (!format.tokensUsed.includes('mm') && !format.tokensUsed.includes('m')) {
						format = this._determineTokenFormat(format, i, 'mm', 'm');
					}
					else if (!format.tokensUsed.includes('ss') && !format.tokensUsed.includes('s')) {
						format = this._determineTokenFormat(format, i, 'ss', 's');
					}
				}
				// If it's not a colon then can attempt to detect year
				// Can't attempt to detect months or days at this point
				// as values under 31 could be a day or a year, and under
				// 12 could be month, day or year. These are determined later in the code.
				// Only year can be 4 characters long and a number
				else if (!format.tokensUsed.includes('YYYY') && spl.length === 4) {
					format = this._setDateFormat(format, i, 'YYYY', true, true, undefined, 'hasYear');
					continue;
				}
				// Alternatively could be 2 digits if greater than 31
				// Only years can be greater than 31, months and days mean
				//  that we cannot determine this below that value
				else if (!format.tokensUsed.includes('YY') && +spl > 31) {
					format = this._setDateFormat(format, i, 'YY', true, false, undefined, 'hasYear');
				}
			}
			// Some tokens are strings
			else {
				// Check for AM/PM
				// Put conditions into variables to avoid evaluating them multiple times each.
				let condUpper = !format.tokensUsed.includes('A') && (spl === 'AM' || spl === 'PM');
				let condLower = !format.tokensUsed.includes('a') && (spl === 'am' || spl === 'pm');
				if (condUpper || condLower) {
					if (condUpper) {
						format = this._setDateFormat(format, i, 'A', true, true);
					}
					else {
						format = this._setDateFormat(format, i, 'a', true, true);
					}

					// If this is found then need to make sure that any hours found are 12 hour
					for (let j = 0; j < i; j++) {
						let formatFormat = format.format[j];
						if (formatFormat.firm === false && formatFormat.value.includes('H')) {
							format = this._setDateFormat(format, j, formatFormat.value.toLocaleLowerCase(), true, true);
							break;
						}
					}
				}
				// Check for other string tokens
				else {
					// Get the possible locales
					locales = format.locales.length > 0 ?
						format.locales :
						Object.keys(this.langOpts.abbrDays);

					let tokensThisRound = [];
					let localesThisRound = [];

					for (let locale of locales) {
						format.latestToken = null;
						format.latestLocale = null;
						if (
							(!format.tokensUsed.includes('Do') || tokensThisRound.includes('Do')) &&
							spl.match(this.langOpts.postFixes[locale])
						) {
							format = this._setDateFormat(format, i, 'Do', true, true, locale, 'hasDay');
						}
						else if (
							(!format.tokensUsed.includes('MMMM') || tokensThisRound.includes('MMMM')) &&
							spl.match(this.langOpts.months[locale]) && this.langOpts.months[locale] !== undefined
						) {
							format = this._setDateFormat(
								format,
								i,
								'MMMM',
								true,
								spl === 'may' ? false : true, locale, 'hasMonth'
							);
						}
						else if (
							(!format.tokensUsed.includes('MMM') || tokensThisRound.includes('MMM')) &&
							spl.match(this.langOpts.abbrMonths[locale])
						) {
							format = this._setDateFormat(
								format,
								i,
								'MMM',
								true,
								spl === 'may' ? false : true, locale, 'hasMonth'
							);
						}
						else if (
							(!format.tokensUsed.includes('dddd') || tokensThisRound.includes('dddd')) &&
							spl.match(this.langOpts.days[locale])
						) {
							this._setDateFormat(format, i, 'dddd', true, true, locale);
						}
						else if (
							(!format.tokensUsed.includes('ddd') || tokensThisRound.includes('ddd')) &&
							spl.match(this.langOpts.abbrDays[locale])
						) {
							this._setDateFormat(format, i, 'ddd', true, true, locale);
						}

						if (format.latestToken !== null) {
							tokensThisRound.push(format.latestToken);
						}
						if (format.latestLocale !== null) {
							localesThisRound.push(format.latestLocale);
						}
					}

					let newLocales = [];

					for (let locale of localesThisRound) {
						if (format.locales.includes(locale)) {
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

		let changeMade = true;
		let allIdentified = false;
		while(changeMade && !allIdentified) {
			changeMade = false;
			allIdentified = true;
			for (let i = 0; i < format.format.length; i++) {
				if (
					format.format[i].value.length === 0 && format.format[i].definite === false &&
					!isNaN(+format.split[i]) &&
					(!format.hasDay || !format.hasYear || !format.hasMonth)
				) {
					// Year and Day - must be month
					if (format.hasYear && format.hasDay && +format.split[i] <= 12) {
						format = this._determineTokenFormat(format, i, 'MM', 'M', undefined, 'hasMonth');
						changeMade = true;
					}
					// Day and Month - must be year
					else if (format.hasDay && format.hasMonth) {
						format = this._determineTokenFormat(format, i, 'YY', 'Y', undefined, 'hasYear');
						changeMade = true;
					}
					// Month and Year - must be day
					else if (format.hasMonth && format.hasYear) {
						format = this._determineTokenFormat(format, i, 'DD', 'D', undefined, 'hasDay');
						changeMade = true;
					}
					// Year or Day - must be month
					else if ((format.hasYear || format.hasDay) && +format.split[i] <= 12) {
						format = this._determineTokenFormat(format, i, 'MM', 'M', undefined, 'hasMonth');
						changeMade = true;
					}
					// Month then assume day next
					else if (format.hasMonth && +format.split[i] <= 31) {
						format = this._determineTokenFormat(format, i, 'DD', 'D', undefined, 'hasDay');
						changeMade = true;
					}
					// Last resort assume Month
					else if(+format.split[i] <= 12) {
						format = this._determineTokenFormat(format, i, 'MM', 'M', undefined, 'hasMonth');
						changeMade = true;
					}
					else {
						allIdentified = false;
					}
				}
			}
		}

		// Construct momentFormat from parts and separator
		for (let i = 0; i < format.split.length - 1; i++) {
			if(!format.format[i].definite) {
				return 'string';
			}
			format.momentFormat += format.format[i].value;
			// We don't want to add the current separator if the next token is a Z
			// or the current token is a Z and the next separator is a : as this is included in the Z token
			if (!(
				format.format[i+1].value.includes('Z') ||
				format.format[i].value.includes('Z') && format.separators[i] === ':'
			)) {
				format.momentFormat += format.separators[i];
			}
		}

		// Faster to do this here than add a check every loop
		format.momentFormat += format.format[format.split.length - 1].value;

		// If there is a format and it is valid then return it
		if (
			format.momentFormat.length > 0 &&
			moment(
				origEl,
				format.momentFormat,
				format.locales.length > 0 ? format.locales[0].substring(0, 2) : 'en'
			).isValid()
		) {
			return format;
		}
		// Otherwise assume mixed
		else {
			return 'mixed';
		}
	}

	private _isSequence(data) {
		let thousandsRegExp = new RegExp(this.thousandsSeparator, 'g');
		data = data
			.map(a => typeof a === 'string' ? a.replace(thousandsRegExp, '') : a)
			.sort((a, b) => {
				if(+a > +b) {
					return 1;
				}
				else if(+b > +a) {
					return -1;
				}
				else return 0;
			});


		if(data.length < 3 || isNaN(+data[1]) || isNaN(+data[0])) {
			return false;
		}

		let initGap = +data[1] - +data[0];
		for(let i = 2; i < data.length; i++) {
			if(isNaN(data[i]) || +data[i] !== +data[i-1] + initGap) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Determine whether to use a double or single token if there is a leading 0
	 *
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
	 *
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
		format.format[idx] = {
			definite,
			firm,
			value
		};
		format.tokensUsed.push(value);
		format.latestToken = value;
		format.latestLocale = locale !== undefined ? locale : null;

		if (locale !== undefined && !format.locales.includes(locale)) {
			format.locales.push(locale);
		}

		// Set the flag if it has been defined
		if (has.length > 0) {
			format[has] = true;
		}

		return format;
	}

	/**
	 * Identifies a common prefix amongst an array of data
	 *
	 * @param data The data that is to be parsed to determine a prefix
	 * @returns string, the prefix that has been identified
	 */
	private _getPrefix(data: any[]): string {
		let prefix = data[0]; // Initialise prefix to be the entire first value

		// If the first item is an object, then we are parsing excel data so our
		// interaction with it is slightly different.
		if (typeof prefix === 'object') {
			if (! prefix.excel) {
				return '';
			}

			let idx = prefix.excel.indexOf('"');

			// Can check for a quotation mark before going any further
			// If there is not one at the start then no prefix
			if (idx !== 0) {
				return '';
			}

			let lastIdx = prefix.excel.lastIndexOf('"');

			// There needs to be at least 2 quotation marks
			if (idx !== lastIdx) {
				let excelPrefix = prefix.excel.match(/^"[^"]*"/ig)[0];

				for (let i = 1; i < data.length; i++) {
					if(data[i] === '') {
						continue;
					}
					if (data[i].excel.indexOf(excelPrefix) !== 0) {
						return '';
					}
				}

				return excelPrefix.replace(/"/g, '');
			}

			return '';
		}
		else {
			prefix = this._determinePrefix(data);

			// Anything left at this point is present at the start of every value
			//  and _may_ be considered a prefix, but this will depend on the type
			let matches = prefix.match(/^[^0-9]+/g);
			return matches !== null ? matches[0] : '';
		}
	}

	private _determinePrefix(data: string[], postfix = false): string {
		let prefix = postfix ? data[0].split('').reverse().join('') : data[0];
		for (let i = 1; i < data.length; i++) {

			if(data[i] === '') {
				continue;
			}

			// There can't be a prefix if the type isn't a string
			if (typeof data[i] !== 'string') {
				return '';
			}

			let el = postfix ? data[i].split('').reverse().join('') : data[i];

			// If the whole prefix is at the start of the value then it isn't going
			// to be shortened further so we can proceed to the next value
			if (el.indexOf(prefix) === 0) {
				continue;
			}

			// Gradually increase the prefix in length to check that it matches the start of the value
			for (let j = 0; j < prefix.length; j++) {
				// If this portion of prefix is at the beginning of the string then carry on
				// Otherwise it isn't the same across all of the elements so slice it down
				//  to what has passed so far and check again
				if (el.indexOf(prefix.slice(0, j)) !== 0) {
					prefix = prefix.slice(0, j - 1);

					// If the length of the prefix is 0 then there has been no match between this value
					// and the previous value. There is therefore no need to iterate through the remaining
					// values as we can tell at this point that there isn't going to be a common prefix
					// across the entire dataset
					if (prefix.length === 0) {
						return '';
					}
				}
			}
		}

		return prefix;
	}

	/**
	 * Identifies a common postfix amongst an array of data
	 *
	 * @param data The data that is to be parsed to determine a postfix
	 * @returns string, the postfix that has been identified
	 */
	private _getPostfix(data: any[]): string {
		let postfix = data[0];

		if (typeof postfix === 'object') {
			if (! postfix.excel) {
				return '';
			}

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
				let excelPostfix = postfix.excel.match(/"[^"]*"$/ig)[0];

				for (let i = 1; i < data.length; i++) {
					if(data[i] === '') {
						continue;
					}
					if (data[i].excel.match(new RegExp(this._escapeRegExp(excelPostfix) + '$')) === null) {
						return '';
					}
				}

				return excelPostfix.replace(/"/g, '');
			}

			return '';
		}
		// If the type of the first element is not a string then there cannot be a postfix
		// Need to check this now before the string operations
		else if (typeof postfix === 'string') {
			// Reverse the string, a postfix is a prefix working from the other end of the string
			// So, can use the same algorithm as above in `getPrefix()` to do this
			let possPost = this._determinePrefix(data, true);

			// Anything left at this point is present at the end of every value, once it is
			//  reversed and _may_ be considered a postfix, but this will depend on the type
			let matches = possPost.split('').reverse().join('').match(/[^0-9]+$/g);
			return matches !== null ? matches[matches.length - 1] : '';
		}

		return '';
	}

	/**
	 * Identifies the highest number of decimal places within the dataset
	 *
	 * @param data The data that is to be parsed to determine the number of decimal places
	 * @param postfix The datas postfix that is stripped from the data to accurately determine number of decimal places
	 * @returns number, the highest number of decimal places in the entire dataset
	 */
	private _getDP(data: any[], postfix: string): number {
		let highestDP = 0;
		let replaceRegex = new RegExp(this._escapeRegExp(postfix) + '$');

		for (let el of data) {
			// Replace the postfix as it's characters do not count as decimal places
			let split = (typeof el === 'object' ? el.value : el)
				.toString()
				.replace(replaceRegex, '')
				.split(this.decimalCharacter);

			// Check that there is a decimal place and also if there are
			// more than previously seen - the highest value should be used
			if (split.length > 1 && split[1].length > highestDP) {
				highestDP = split[1].length;
			}
		}

		return highestDP;
	}

	private _escapeRegExp(val: string): string {
		let escapeRegExp = new RegExp(
			'(\\' +
			['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\') +
			')',
			'g'
		);
		return val.replace(escapeRegExp, '\\$1');
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

// 	if (code.includes('.')) {
// 		format.dp = code.split('.')[1].length;
// 	}

// 	if (code.includes('/') && code.match(/[a-z]/ig) === null) {
// 		format.fraction = true;
// 	}

// 	if (code.includes(',')) {
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
// 	while (tempCode.includes('[')) {
// 		let match = tempCode.match(/\[[^\[]*\]/ig)[0];
// 		let colour = match.split(/(\[|\])/ig)[1];
// 		let condition = null;
// 		tempCode = tempCode.replace(match, '');
// 		if (tempCode.includes('[')) {
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
