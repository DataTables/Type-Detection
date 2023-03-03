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

// Strings
console.log('CHECK  Strings...');
checkDetails(
	detector.typeDetect(['Test','Archie','Hugo']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

// Strings
console.log('CHECK  Strings...');
checkDetails(
	detector.typeDetect([
		'http://live.datatables.net/gipugure/1/edit',
		'http://live.datatables.net/gipugure/1/edit',
		'http://live.datatables.net/gipugure/1/edit'
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

// Strings
console.log('CHECK  Strings...');
checkDetails(
	detector.typeDetect([
		'http://live.datatables.net/gipugure/1/edit',
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

console.log('CHECK  A passed in object');
checkDetails(
	detector.typeDetect([
		{a: 1},
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'object'
	}
);


console.log('CHECK  A passed in array');
checkDetails(
	detector.typeDetect([
		[1,2,3],
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'array'
	}
);


console.log('CHECK  Leading null');
checkDetails(
	detector.typeDetect([
		null,
		'a',
		'b'
	]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);


console.log('CHECK  Multi nulls');
checkDetails(
	detector.typeDetect([
		null,
		'a',
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

console.log('CHECK  Strings with a month name');
checkDetails(
	detector.typeDetect(['Alpha','September','Beta']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

console.log('Failed', failed, 'of', total, 'tests. See above for details');
