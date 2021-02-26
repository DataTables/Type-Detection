interface IDetails {
	type: null | string;
	format: null | string;
	prefix: null | string;
	postfix: null | string;
	dp: null | number;
}

export default class typeDetect {

	public typeDetect(data: string[] | number[]) {
		let details: IDetails = {
			type: null,
			format: null,
			prefix: null,
			postfix: null,
			dp: null
		};

		details.type = this.getType(data);

		if (details.type === 'datetime' || details.type === 'date' || details.type === 'time') {
			details.format = this.getFormat(data, details.type);

			if (details.format === null) {
				details.type = 'string';
			}
		}
		else if (details.type === 'number') {
			details.prefix = this.getPrefix(data);
			details.postfix = this.getPostfix(data);
			details.dp = this.getDP(data);
		}

		return details;
	}

	public getType(data: string[] | number[]): string {
		return 'string';
	}

	public getFormat(data: string[] | number[], type: string): string {
		return null;
	}

	public getPrefix(data: string[] | number[]): string {
		return '';
	}

	public getPostfix(data: string[] | number[]): string {
		return '';
	}

	public getDP(data: string[] | number[]): number {
		return 0;
	}
}
