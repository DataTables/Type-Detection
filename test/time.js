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
			'           Expected:\''+ (expected.type === null ? 'null' : expected.type) +
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
			'           Expected:\''+ (expected.format === null ? 'null' : expected.format) +
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
			'           Expected:\''+ (expected.prefix === null ? 'null' : expected.prefix) +
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
			'           Expected:\''+ (expected.postfix === null ? 'null' : expected.postfix) +
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
			'           Expected:\''+ (expected.dp === null ? 'null' : expected.dp) +
			'\'+ Got:\''+ (actual.dp === null ? 'null' : actual.dp) + '\''
		);
	}
	console.log('\n');
};

let detector = new typeDetect['default']();
// Dates YYYY-MM-DD
console.log('CHECK  Times HH:mm:ss...');
checkDetails(
	detector.typeDetect(['17:12:47','12:56:07','09:02:00']),
	{
		dp: null,
		format: 'HH:mm:ss',
		postfix: null,
		prefix: null,
		type: 'time'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Times h:mm:ss a...');
checkDetails(
	detector.typeDetect(['11:12:47 am','10:56:07 pm','9:02:00 am']),
	{
		dp: null,
		format: 'h:mm:ss a',
		postfix: null,
		prefix: null,
		type: 'time'
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Times h:mm:ss A...');
checkDetails(
	detector.typeDetect(['11:12:47 AM','10:56:07 PM','9:02:00 AM']),
	{
		dp: null,
		format: 'h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'time'
	}
);


console.log('Failed', failed, 'of', total, 'tests. See above for details');
