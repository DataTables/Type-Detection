import * as fs from 'fs';
import * as moment from '../node_modules/moment/moment';

interface IDetails {
	type: null | string;
	format: null | string;
	prefix: null | string;
	postfix: null | string;
	dp: null | number;
}

export default class typeDetect {

	private decimalCharacter;
	private thousandsSeparator;
	private momentFormats;

	constructor (decimalCharacter='.', thousandsSeparator=',') {
		this.decimalCharacter = decimalCharacter;
		this.thousandsSeparator = thousandsSeparator;
		this.momentFormats = JSON.parse(fs.readFileSync('resources/momentFormats.json').toString());
	}

	public typeDetect(data) {
		let details: IDetails = {
			type: null,
			format: null,
			prefix: null,
			postfix: null,
			dp: null
		};

		// If there is no data then return blank details
		if(!data || data.length === 0) {
			return details;
		}

		let possPrefix = this.getPrefix(data); // Identify a possible prefix - will only be used if certain types are identified
		let possPostfix = this.getPostfix(data); // Identify a possible postfix - will only be used if certain types are identified

		details.type = this.getType(data, possPrefix, possPostfix); // Get the type of the data

		// If the type is a datetime, date or time then the format needs to be set.
		if (details.type === 'datetime' || details.type.indexOf('date') !== -1 || details.type === 'time') {
			let splitdate = details.type.split("-")
			details.format = splitdate.slice(1).join("-");
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
		let types = []
		let dateSuggestion = null;
		let definiteOrder = null;
		
		// A type can only be set if all of the data fits it
		for (let i = 0; i < data.length; i ++) {
			let el = data[i];
			let type: string = typeof el; // Get the js type of the element
			let tempEl = el; // Hold a temporary version of el that can be manipulated

			// If the prefix exists, replace it within the temporary el
			if(prefix.length > 0 && el.indexOf(prefix) === 0) {
				tempEl = tempEl.replace(prefix, '');
			}

			// If the postfix exists replace it within the temporary el
			if(postfix.length > 0 && el.indexOf(postfix) === el.length - postfix.length) {
				tempEl = tempEl.replace(new RegExp(postfix + '$'), '');
			}
			
			// Replace any thousands separators in the temporary element
			if(type === "string" && tempEl.indexOf(this.thousandsSeparator) !== -1) {
				tempEl = tempEl.split(this.thousandsSeparator).join('');
			}
			
			// At this point the remaining value within tempEl can be converted to a number then that is it's types
			if(type === 'string' && (!isNaN(+el) || !isNaN(+tempEl))) {
				type = 'number';
			}

			if(type === 'string' && el.match(/<(“[^”]*”|'[^’]*’|[^'”>])*>/g) !== null) {
				type = 'html';
			}

			if(type === 'string') {
				let format = this.getDateFormat(el, dateSuggestion, definiteOrder);

				if(format === "mixed") {
					return format;
				}

				if(format.order !== "dmy") {
					definiteOrder = format.order;
				}

				if(dateSuggestion !== null && format.format !== dateSuggestion.format) {
					for(var j = 0; j < i; j++){
						if(!moment(data[j], format.format).isValid()) {
							return 'mixed';
						}
					}
				}

				if(format !== null) {
					if(dateSuggestion !== null) {
						if(dateSuggestion.format.length < format.format.length){
							format.format = dateSuggestion.format;
						}
						else {
							types.splice(types.indexOf("date-" + dateSuggestion), 1);
						}
					}
					type = "date-" + format.format;
					dateSuggestion = format;
				}
			}
			
			// If this type has not been identified yet then add it to the array
			if (types.indexOf(type) === -1) {
				types.push(type);
			}
		}

		// If more than one type has been identified then it must be mixed
		if(types.length === 2 && types.indexOf("string") !== -1 && types.indexOf("html") !== -1) {
			return 'html';
		}
		else if (types.length > 1) {
			return 'mixed';
		}
		// Otherwise if only numbers have been found then that is the type
		else if (types[0] === 'number') {
			return 'number';
		}
		else if(types[0].indexOf("date") === 0) {
			return types[0];
		}

		// If no other types are found then default to string
		return 'string';
	}

	public getDateFormat(el: string, suggestion, definiteOrder) {
		var time = "time";
		var separator = "_";
		if(el.indexOf("-") !== -1) {
			separator = "-";
		}
		else if(el.indexOf("/") !== -1) {
			separator = "/";
		}

		let split = el.split(separator);

		let year = "shortYear";
		let small = [];
		let order = "dmy";
		for(let i = 0; i < split.length; i++) {
			let spl = split[i];
			if(spl.indexOf('0') === -1 && +spl < 10) {
				small.push(i);
			}
			if(!isNaN(+spl)) {
				if(spl.length === 4) {
					year = "longYear";
					if(i === 0) {
						order = "ymd";
					}
				}
				else if(+spl > 31) {
					if(i === 0) {
						order = "ymd";
					}
				}
				else if(+spl > 12 && i===1) {
					order = "mdy";
				}
			}
		}

		if(definiteOrder !== null) {
			if(order !== "dmy" && order !== definiteOrder) {
				return "mixed";
			}
			else {
				order = definiteOrder;
			}
		}

		let month = "stdMonth";
		let day = "longDay";
		if(small.length > 0) {
			if(order === "ymd") {
				if(small.indexOf(1) !== -1){
					month = "shortMonth";
				}
				if(small.indexOf(2) !== -1) {
					day = "shortDay";
				}
			}
			else if(order === "mdy") {
				if(small.indexOf(0) !== -1) {
					month = "shortMonth";
				}
				if(small.indexOf(1) !== -1) {
					day = "shortDay";
				}
			}
			else {
				if(small.indexOf(1) !== -1) {
					month = "shortMonth";
				}
				if(small.indexOf(0) !== -1) {
					day = "shortDay";
				}
			}

		}

		let potentials;
		if(el.indexOf(":") !== -1) {

		}
		else {
			time = "noTime";

			
			if(separator === "_") {
				var comma = "noComma";
				
				if(el.indexOf(",") !== -1){
					comma = "comma";
				}
	
				potentials = {
					format: this.momentFormats[time][separator][comma][month][year][day][order],
					order
				}
			}
			else {
				potentials = {
					format: this.momentFormats[time][separator][month][year][day][order],
					order
				}
			}
		}

		if(
			suggestion !== null &&
			((day === "longDay" && suggestion.format.indexOf("DD") !== -1) && (month === "stdMonth" && suggestion.format.indexOf("MM") !== -1)) &&
			moment(el, suggestion.format).isValid()
		) {
			return suggestion;
		}
		for(let pot of potentials.format) {
			if(moment(el, pot).isValid()) {
				return {
					format: pot,
					order
				}
			}
		}

		return definiteOrder !== null ? "mixed" : null;
	}

	public getFormat(data, type: string): string {
		return null;
	}

	public getPrefix(data): string {
		let prefix = data[0]; // Initialise prefix to be the entire first value
		let first = true;

		for (let el of data) {
			if(first) {
				first = false;
				continue;
			}
			// There can't be a prefix if the type isn't a string
			if(typeof el !== "string") {
				return ''; 
			}

			if(el.indexOf(prefix) === 0) {
				continue;
			}

			// Gradually increase the prefix to check that it matches
			for(let i = 0; i < prefix.length; i++) {
				// If this portion of prefix is at the beginning of the string then carry on
				// Otherwise it isn't the same across all of the elements so slice it down to what has passed so far and check again
				if(el.indexOf(prefix.slice(0, i)) !== 0) {
					prefix = prefix.slice(0, i-1);

					if (prefix.length === 0) {
						return '';
					}
				}
			}
		}
		
		// Anything left at this point is present at the start of every value and _may_ be considered a prefix, but this will depend on the type
		let matches = prefix.match(/^[^0-9]+/g);
		return matches !== null ? matches[0] : '';
	}

	public getPostfix(data): string {
		// If the type of the first element is not a string then there cannot be a postfix
		// Need to check this now before the string operations
		if (typeof data[0] !== "string") {
			return '';
		}

		// Reverse the string, a postfix is a prefix working from the other end of the string
		// So, can use the same algorithm as above in `getPrefix()` to do this
		let postfix = data[0].split('').reverse().join('');
		let first = true;

		for (let el of data) {
			if(first) {
				first = false;
				continue;
			}
			// There can't be a postfix if the type isn't a string
			if(typeof el !== "string") {
				return ''; 
			}

			// Reverse the element to match the reversed postfix
			el = el.split('').reverse().join('');

			if(el.indexOf(postfix) === 0) {
				continue;
			}

			// Gradually increase the postfix to check that it matches
			for(let i = 0; i < postfix.length; i++) {
				// If this portion of postfix is at the beginning of the string then carry on
				// Otherwise it isn't the same across all of the elements so slice it down to what has passed so far and check again
				if(el.indexOf(postfix.slice(0, i)) !== 0){
					postfix = postfix.slice(0, i-1);
					if (postfix.length === 0) {
						return '';
					}
				}
			}
		}
		
		// Anything left at this point is present at the end of every value, once it is reversed and _may_ be considered a postfix, but this will depend on the type
		let matches = postfix.split('').reverse().join('').match(/[^0-9]+$/g);
		return matches !== null ? matches[matches.length-1] : '';
	}

	public getDP(data, postfix): number {
		let highestDP = 0;

		for (let el of data) {
			// Replace the postfix as it's characters do not count as decimal places
			let split = el.toString().replace(new RegExp(postfix + '$'), '').split(this.decimalCharacter);

			// Check that there is a decimal place and also if there are more than previously seen - the highest value should be used
			if(split.length > 1 && split[1].length > highestDP) {
				highestDP = split[1].length;
			}
		}

		return highestDP;
	}
}
