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

		if(data.length === 0) {
			return details;
		}

		let possPrefix = this.getPrefix(data);
		let possPostfix = this.getPostfix(data);

		details.type = this.getType(data, possPrefix, possPostfix);

		if (details.type === 'datetime' || details.type === 'date' || details.type === 'time') {
			details.format = this.getFormat(data, details.type);

			if (details.format === null) {
				details.type = 'string';
			}
		}
		else if (details.type === 'number') {
			details.prefix = possPrefix;
			details.postfix = possPostfix;
			details.dp = this.getDP(data, possPrefix, possPostfix);
		}

		return details;
	}

	public getType(data, prefix, postfix): string {
		let types = []
		
		for (let el of data) {
			let type = typeof el;
			let tempEl = el;

			if(prefix.length > 0 && el.indexOf(prefix) === 0) {
				tempEl = tempEl.replace(prefix, '');
			}

			if(postfix.length > 0 && el.indexOf(postfix) === el.length - postfix.length) {
				tempEl = tempEl.replace(new RegExp(postfix + '$'), '');
			}
			
			if(type === "string" && tempEl.indexOf(this.thousandsSeparator) !== -1) {
				tempEl = tempEl.split(this.thousandsSeparator).join('');
			}
			
			if(type === 'string' && (!isNaN(+el) || !isNaN(+tempEl))) {
				type = 'number';
			}
			
			if (types.indexOf(type) === -1) {
				types.push(type);
			}
		}

		if (types.length > 1) {
			return 'mixed';
		}
		else if (types.length === 1 && types[0] === 'number') {
			return 'number';
		}

		return 'string';
	}

	public getFormat(data, type: string): string {
		return null;
	}

	public getPrefix(data): string {
		let prefix = data[0];
		
		for (let el of data) {
			if(typeof el !== "string") {
				return ''; 
			}

			for(let i = 0; i < prefix.length; i++) {
				if(el.indexOf(prefix[i]) === i) {
					continue;
				}
				else {
					prefix = prefix.slice(0, i);
				}
			}
		}
		
		return prefix;
	}

	public getPostfix(data): string {
		if (typeof data[0] !== "string") {
			return '';
		}

		let postfix = data[0].split('').reverse().join('');
		
		for (let el of data) {
			if(typeof el !== "string") {
				return ''; 
			}

			el = el.split('').reverse().join('');

			for(let i = 0; i < postfix.length; i++) {
				if(el.indexOf(postfix[i]) === i) {
					continue;
				}
				else {
					postfix = postfix.slice(0, i);
				}
			}
		}
		
		return postfix.split('').reverse().join('');
	}

	public getDP(data, prefix, postfix): number {
		let highestDP = 0;

		for (let el of data) {
			let split = el.toString().replace(prefix, '').replace(new RegExp(postfix + '$'), '').split(this.decimalCharacter);

			if(split.length > 1 && split[1].length > highestDP) {
				highestDP = split[1].length;
			}
		}

		return highestDP;
	}
}
