/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
// This code is only useful if at some point more advanced formatting data for excel is required.


let typeDetect = require('../dist/cloudtables-type-detect');

let failed = 0;
let total = 0;

let checkDetails = function(actual, expected) {
	console.log(Date.now());
	total = total + 16;
	if(actual.type === expected.type) {
		console.log('   TYPE: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log('   TYPE: \033[0;31mFAIL\033[0m');
		console.log(
			'       Expected:\'' + (expected.type === null ? 'null' : expected.type) +
			'\'+ Got:\'' + (actual.type === null ? 'null' : actual.type) + '\''
		);
	}

	if(actual.format === expected.format) {
		console.log(' FORMAT: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log(' FORMAT: \033[0;31mFAIL\033[0m');
		console.log(
			'       Expected:\'' + (expected.format === null ? 'null' : expected.format) +
			'\'+ Got:\''+ (actual.format === null ? 'null' : actual.format) + '\''
		);
	}

	if(actual.prefix === expected.prefix) {
		console.log(' PREFIX: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log(' PREFIX: \033[0;31mFAIL\033[0m');
		console.log(
			'       Expected:\'' + (expected.prefix === null ? 'null' : expected.prefix) +
			'\'+ Got:\''+ (actual.prefix === null ? 'null' : actual.prefix) + '\''
		);
	}

	if(actual.postfix === expected.postfix) {
		console.log('POSTFIX: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log('POSTFIX: \033[0;31mFAIL\033[0m');
		console.log(
			'       Expected:\'' + (expected.postfix === null ? 'null' : expected.postfix) +
			'\'+ Got:\''+ (actual.postfix === null ? 'null' : actual.postfix) + '\''
		);
	}

	if(actual.dp === expected.dp) {
		console.log('     DP: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log('     DP: \033[0;31mFAIL\033[0m');
		console.log(
			'       Expected:\'' + (expected.dp === null ? 'null' : expected.dp) +
			'\'+ Got:\''+ (actual.dp === null ? 'null' : actual.dp) + '\''
		);
	}
	console.log('\n');
};

let detector = new typeDetect['default']();
// Simple Numbers
console.log('CHECK  Simple Numbers...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#' ,
			value: '1'
		},
		{
			excel: '#' ,
			value: '1.45'
		},
		{
			excel: '#' ,
			value: '10'
		},
	]),
	{
		dp: 2,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

// Simple Numbers
console.log('CHECK  Simple Numbers...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#' ,
			value: '1'
		},
		{
			excel: '#' ,
			value: '2'
		},
		{
			excel: '#',
			value: '3'
		}
	]),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

// Decimal Numbers
console.log('CHECK  Decimal Numbers...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#.#',
			value: 1.1
		},
		{
			excel: '#.#',
			value: 2.5
		},
		{
			excel: '#.#',
			value: 3.6
		}
	]),
	{
		dp: 1,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

// Mixed Length Decimal Numbers
console.log('CHECK  Mixed Length Decimal Numbers...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#.??',
			value: 11.1
		},
		{
			excel: '#.??',
			value: 2
		},
		{
			excel: '#.??',
			value: 3.67
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

// Decimal Numbers in String Form
console.log('CHECK  Decimal Numbers in String Form...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#.??',
			value: '11.1'
		},
		{
			excel: '#.??',
			value: '2'
		},
		{
			excel: '#.??',
			value: '3.67'
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

// Thousands Separated Numbers
console.log('CHECK  Thousands Separated Numbers...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#,###',
			value: '11,100'
		},
		{
			excel: '#,###',
			value: '2'
		},
		{
			excel: '#,###',
			value: '3,670'
		}
	]),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

// Thousands Separated Numbers with Decimal places
console.log('CHECK  Thousands Separated Numbers with Decimal places...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#,###.?',
			value: '1,111.1'
		},
		{
			excel: '#,###.?',
			value: '2'
		},
		{
			excel: '#,###.?',
			value: '1,456,300.67'
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

// Currency Numbers
console.log('CHECK  Currency Numbers...');
checkDetails(
	detector.typeDetect([
		{
			excel: '"$"0.00',
			value: '$1.99'
		},
		{
			excel: '"$"0.00',
			value: '$2.50'
		},
		{
			excel: '"$"0.00',
			value: '$3.00'
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: '',
		prefix: '$',
		type: 'number',
	}
);

// Currency Numbers
console.log('CHECK  Currency Numbers with repeated character in prefix...');
checkDetails(
	detector.typeDetect([
		{
			excel: '"ALL"0.00',
			value: 'ALL1.99'
		},
		{
			excel: '"ALL"0.00',
			value: 'ALL2.50'
		},
		{
			excel: '"ALL"0.00',
			value: 'ALL3.00'
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: '',
		prefix: 'ALL',
		type: 'number',
	}
);

// Numbers with postfixed unit with identical trailing 0s
console.log('CHECK  Numbers with prefix same first number...');
checkDetails(
	detector.typeDetect([
		{
			excel: '"ALL "0.00',
			value: 'ALL 1.90'
		},
		{
			excel: '"ALL "0.00',
			value: 'ALL 1.50'
		},
		{
			excel: '"ALL "0.00',
			value: 'ALL 1.00'
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: '',
		prefix: 'ALL ',
		type: 'number',
	}
);

// Numbers with postfixed unit
console.log('CHECK  Numbers with postfixed unit...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#.00" beans"',
			value: '1.99 beans'
		},
		{
			excel: '#.00" beans"',
			value: '2.50 beans'
		},
		{
			excel: '#.00" beans"',
			value: '3.00 beans'
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: ' beans',
		prefix: '',
		type: 'number',
	}
);

// Numbers with postfixed unit where the unit has repeated characters
console.log('CHECK  Numbers with postfixed unit with repeated characters...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#.00" butterflies"',
			value: '1.99 butterflies'
		},
		{
			excel: '#.00" butterflies"',
			value: '2.50 butterflies'
		},
		{
			excel: '#.00" butterflies"',
			value: '3.00 butterflies'
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: ' butterflies',
		prefix: '',
		type: 'number',
	}
);

// Numbers with postfixed unit with identical trailing 0s
console.log('CHECK  Numbers with postfixed unit and trailing 0s...');
checkDetails(
	detector.typeDetect([
		{
			excel: '#.00" butterflies"',
			value: '1.90 butterflies'
		},
		{
			excel: '#.00" butterflies"',
			value: '2.50 butterflies'
		},
		{
			excel: '#.00" butterflies"',
			value: '3.00 butterflies'
		}
	]),
	{
		dp: 2,
		format: null,
		postfix: ' butterflies',
		prefix: '',
		type: 'number',
	}
);

// Numbers with postfixed unit with identical trailing 0s
console.log('CHECK  Strings with postfixed unit and trailing 0s...');
checkDetails(
	detector.typeDetect([
		{
			excel: '',
			value: 'butterflies'
		},
		{
			excel: '',
			value: 'Sandy'
		},
		{
			excel: '',
			value: 'Janitor'
		}
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates standard...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'yyyy-mm-dd' ,
			value: '2021-03-11'
		},
		{
			excel: 'yyyy-mm-dd' ,
			value: '2020-12-25'
		},
		{
			excel: 'yyyy-mm-dd',
			value: '2021-01-01'
		}
	]),
	{
		dp: null,
		format: 'YYYY-MM-DD',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-D
console.log('CHECK  Dates small day...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'yyyy-mm-d' ,
			value: '2021-03-1'
		},
		{
			excel: 'yyyy-mm-d' ,
			value: '2020-12-25'
		},
		{
			excel: 'yyyy-mm-d',
			value: '2021-01-11'
		}
	]),
	{
		dp: null,
		format: 'YYYY-MM-D',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Dates small day not first...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'yyyy-mm-d',
			value: '2020-12-25'
		},
		{
			excel: 'yyyy-mm-d',
			value: '2021-03-1'
		},
		{
			excel: 'yyyy-mm-d',
			value: '2021-01-11'
		}
	]),
	{
		dp: null,
		format: 'YYYY-MM-D',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Dates year last...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'mm-d-yyyy' ,
			value: '12-25-2020'
		},
		{
			excel: 'mm-d-yyyy' ,
			value: '03-1-2021'
		},
		{
			excel: 'mm-d-yyyy',
			value: '01-11-1999'
		}
	]),
	{
		dp: null,
		format: 'MM-D-YYYY',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Dates small day and small month not first...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'm-dd-yyyy',
			value: '12-25-2020'
		},
		{
			excel: 'm-dd-yyyy',
			value: '3-01-2021'
		},
		{
			excel: 'm-dd-yyyy',
			value: '1-11-1999'
		}
	]),
	{
		dp: null,
		format: 'M-DD-YYYY',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Dates small day and small month not first...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'm-d-yyyy',
			value: '12-25-2020'
		},
		{
			excel: 'm-d-yyyy',
			value: '3-1-2021'
		},
		{
			excel: 'm-d-yyyy',
			value: '1-11-1999'
		}
	]),
	{
		dp: null,
		format: 'M-D-YYYY',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Mixed Dates...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'mm-dd-yyyy',
			value: '12-25-2020'
		},
		{
			excel: 'mm-dd-yyyy',
			value: '03-01-2021'
		},
		{
			excel: 'dd-mm-yyyy',
			value: '25-01-1999'
		}
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'mixed'
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Small Year...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'mm-dd-yy',
			value: '12-25-20'
		},
		{
			excel: 'mm-dd-yy',
			value: '03-01-21'
		},
		{
			excel: 'mm-dd-yy',
			value: '04-01-99'
		}
	]),
	{
		dp: null,
		format: 'MM-DD-YY',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates standard \'/\' separator...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'yyyy/mm/dd',
			value: '2021/03/11'
		},
		{
			excel: 'yyyy/mm/dd',
			value: '2020/12/25'
		},
		{
			excel: 'yyyy/mm/dd',
			value: '2021/01/01'
		}
	]),
	{
		dp: null,
		format: 'YYYY/MM/DD',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates standard \' \' separator...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'yyyy mm dd' ,
			value: '2021 03 11'
		},
		{
			excel: 'yyyy mm dd' ,
			value: '2020 12 25'
		},
		{
			excel: 'yyyy mm dd',
			value: '2021 01 01'
		}
	]),
	{
		dp: null,
		format: 'YYYY MM DD',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMMM...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'd mmmm, yyyy' ,
			value: '1 October, 2020'
		},
		{
			excel: 'd mmmm, yyyy' ,
			value: '17 October, 1999'
		},
		{
			excel: 'd mmmm, yyyy',
			value: '2 January, 2025'
		}
	]),
	{
		dp: null,
		format: 'D MMMM, YYYY',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMM...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'd mmm, yyyy' ,
			value: '10 Oct, 2020'
		},
		{
			excel: 'd mmm, yyyy' ,
			value: '17 Oct, 1999'
		},
		{
			excel: 'd mmm, yyyy',
			value: '2 Jan, 2025'
		}
	]),
	{
		dp: null,
		format: 'D MMM, YYYY',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMM and long time...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'd mmmm, yyyy hh:mm:ss' ,
			value: '10 Oct, 2020 17:12:47'
		},
		{
			excel: 'd mmmm, yyyy hh:mm:ss' ,
			value: '17 Oct, 1999 12:56:07'
		},
		{
			excel: 'd mmmm, yyyy hh:mm:ss',
			value: '2 Jan, 2025 09:02:00'
		}
	]),
	{
		dp: null,
		format: 'D MMM, YYYY HH:mm:ss',
		postfix: null,
		prefix: null,
		type: 'datetime'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMM and long time...');
checkDetails(
	detector.typeDetect([
		{
			excel: 'D/MM/YYYY' ,
			value: '18/09/2020'
		},
		{
			excel: 'D/MM/YYYY' ,
			value: '11/05/2020'
		},
		{
			excel: 'D/MM/YYYY',
			value: '15/09/2020'
		}
	]),
	{
		dp: null,
		format: 'D/MM/YYYY',
		postfix: null,
		prefix: null,
		type: 'date'
	}
);

console.log('CHECK  Strings with null data...');
checkDetails(
	detector.typeDetect([
		null,
		{
			excel: '',
			value: 'Sandy'
		},
		{
			excel: '',
			value: 'Janitor'
		}
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

console.log('CHECK  Strings with multi null data...');
checkDetails(
	detector.typeDetect([
		null,
		{
			excel: '',
			value: 'Sandy'
		},
		null
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);


console.log('Failed', failed, 'of', total, 'tests. See above for details');
