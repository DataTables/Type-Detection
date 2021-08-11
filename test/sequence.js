/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
let typeDetect = require('../dist/cloudtables-type-detect');

let failed = 0;
let total = 0;

let checkDetails = function(actual, expected) {
	console.log(Date.now());
	total = total + 5;
	if(actual.type === expected.type) {
		console.log('      TYPE: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log('      TYPE: \033[0;31mFAIL\033[0m');
		console.log(
			'           Expected:\'' + (expected.type === null ? 'null' : expected.type) +
			'\'+ Got:\''+ (actual.type === null ? 'null' : actual.type) + '\''
		);
	}

	if(actual.format === expected.format) {
		console.log('    FORMAT: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log('    FORMAT: \033[0;31mFAIL\033[0m');
		console.log(
			'           Expected:\'' + (expected.format === null ? 'null' : expected.format) +
			'\'+ Got:\''+ (actual.format === null ? 'null' : actual.format) + '\''
		);
	}

	if(actual.prefix === expected.prefix) {
		console.log('    PREFIX: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log('    PREFIX: \033[0;31mFAIL\033[0m');
		console.log(
			'           Expected:\'' + (expected.prefix === null ? 'null' : expected.prefix) +
			'\'+ Got:\''+ (actual.prefix === null ? 'null' : actual.prefix) + '\''
		);
	}

	if(actual.postfix === expected.postfix) {
		console.log('   POSTFIX: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log('   POSTFIX: \033[0;31mFAIL\033[0m');
		console.log(
			'           Expected:\'' + (expected.postfix === null ? 'null' : expected.postfix) +
			'\'+ Got:\''+ (actual.postfix === null ? 'null' : actual.postfix) + '\''
		);
	}

	if(actual.dp === expected.dp) {
		console.log('        DP: \033[0;32mPASS\033[0m');
	}
	else{
		failed++;
		console.log('        DP: \033[0;31mFAIL\033[0m');
		console.log(
			'           Expected:\'' + (expected.dp === null ? 'null' : expected.dp) +
			'\'+ Got:\''+ (actual.dp === null ? 'null' : actual.dp) + '\''
		);
	}
	console.log('\n');
};

let detector = new typeDetect['default']();

// Normal sequence
console.log('CHECK  123...');
checkDetails(
	detector.typeDetect([1, 2, 3]),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);

// Normal sequence as string
console.log('CHECK  123 as strings...');
checkDetails(
	detector.typeDetect(['1', '2', '3']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);

// Normal sequence as string
console.log('CHECK  2468...');
checkDetails(
	detector.typeDetect([2, 4, 6, 8]),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);

// Normal sequence as string
console.log('CHECK  2468 as string...');
checkDetails(
	detector.typeDetect(['2', '4', '6', '8']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);

// Normal sequence as string
console.log('CHECK  8642 as string...');
checkDetails(
	detector.typeDetect(['8', '6', '4', '2']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);

// Normal sequence as string
console.log('CHECK  4628 as string...');
checkDetails(
	detector.typeDetect(['4', '6', '2', '8']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);

// Normal sequence as string
console.log('CHECK  0, 10, 20, 30 as string...');
checkDetails(
	detector.typeDetect(['0', '10', '20', '30']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);


// Normal sequence as string
console.log('CHECK  0, -10, -20, -30 as string...');
checkDetails(
	detector.typeDetect(['0', '-10', '-20', '-30']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);

// Normal sequence as string
console.log('CHECK  0.5, 1.0, 2.0, 3.0 as string fails because decimal...');
checkDetails(
	detector.typeDetect(['0.5', '1.0', '1.5', '2.0']),
	{
		dp: 1,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

// Normal sequence as string
console.log('CHECK  prefixes fail $0, $10, $20, $30 as string...');
checkDetails(
	detector.typeDetect(['$0', '$10', '$20', '$30']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '$',
		type: 'number',
	}
);

// Normal sequence as string
console.log('CHECK  postfixes fail 0$, 10$, 20$, 30$ as string...');
checkDetails(
	detector.typeDetect(['0$', '10$', '20$', '30$']),
	{
		dp: 0,
		format: null,
		postfix: '$',
		prefix: '',
		type: 'number',
	}
);

// Normal sequence as string
console.log('CHECK  postfixes pass thousands format 1,000, 2,000, 3,000, 4,000 as string...');
checkDetails(
	detector.typeDetect(['1,000', '2,000', '3,000', '4,000']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'sequence',
	}
);

// Normal sequence as string
console.log('CHECK  postfixes pass thousands format 1,000, 2,000, 3,000, 4,000 as string...');
checkDetails(
	detector.typeDetect(['1,000', '2,000', '3,000', '4,000', '4,001']),
	{
		dp: 0,
		format: null,
		postfix: '',
		prefix: '',
		type: 'number',
	}
);

console.log('Failed', failed, 'of', total, 'tests. See above for details');
