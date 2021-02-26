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

	constructor (decimalCharacter='.', thousandsSeparator=',') {
		this.decimalCharacter = decimalCharacter;
		this.thousandsSeparator = thousandsSeparator;
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
		if (details.type === 'datetime' || details.type === 'date' || details.type === 'time') {
			details.format = this.getFormat(data, details.type);

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
		
		// A type can only be set if all of the data fits it
		for (let el of data) {
			let type = typeof el; // Get the js type of the element
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
			
			// If this type has not been identified yet then add it to the array
			if (types.indexOf(type) === -1) {
				types.push(type);
			}
		}

		// If more than one type has been identified then it must be mixed
		if (types.length > 1) {
			return 'mixed';
		}
		// Otherwise if only numbers have been found then that is the type
		else if (types[0] === 'number') {
			return 'number';
		}

		// If no other types are found then default to string
		return 'string';
	}

	public getFormat(data, type: string): string {
		return null;
	}

	public getPrefix(data): string {
		let prefix = data[0]; // Initialise prefix to be the entire first value
		
		for (let el of data) {
			// There can't be a prefix if the type isn't a string
			if(typeof el !== "string") {
				return ''; 
			}

			// Gradually increase the prefix to check that it matches
			for(let i = 0; i < prefix.length; i++) {
				// If this portion of prefix is at the beginning of the string then carry on
				if(el.indexOf(prefix.slice(0, i)) === 0) {
					continue;
				}
				// Otherwise it isn't the same across all of the elements so slice it down to what has passed so far and check again
				else {
					prefix = prefix.slice(0, i-1);

					if (prefix.length === 0) {
						return '';
					}
				}
			}
		}
		
		// Anything left at this point is present at the start of every value and _may_ be considered a prefix, but this will depend on the type
		return prefix;
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
		
		for (let el of data) {
			// There can't be a postfix if the type isn't a string
			if(typeof el !== "string") {
				return ''; 
			}

			// Reverse the element to match the reversed postfix
			el = el.split('').reverse().join('');

			// Gradually increase the postfix to check that it matches
			for(let i = 0; i < postfix.length; i++) {
				// If this portion of postfix is at the beginning of the string then carry on
				if(el.indexOf(postfix.slice(0, i)) === 0) {
					continue;
				}
				// Otherwise it isn't the same across all of the elements so slice it down to what has passed so far and check again
				else {
					postfix = postfix.slice(0, i-1);
					if (postfix.length === 0) {
						return '';
					}
				}
			}
		}
		
		// Anything left at this point is present at the end of every value, once it is reversed and _may_ be considered a postfix, but this will depend on the type
		return postfix.split('').reverse().join('');
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
