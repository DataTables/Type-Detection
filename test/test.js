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

// // DateTimes
// console.log("CHECK  DateTimes...")
// checkDetails(
//     detector.typeDetect(['2021-03-11 17:30','2020-12-25 9:45','2021-01-01 1:12']),
//     {
//         type: 'datetime',
//         format: 'YYYY-MM-DD HH:mm',
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )


// // Mixed
// console.log("CHECK  Mixed...")
// checkDetails(
//     detector.typeDetect(['Test', 123, '$1']),
//     {
//         type: 'mixed',
//         format: null,
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )

// // Excel
// console.log("CHECK  Excel...")
// checkDetails(
//     detector.typeDetect([{ value: '1', excel: '0.00' },{ value: '1.45', excel: '0.00' },{ value: '10', excel: '0.00' }]),
//     {
//         type: 'excel',
//         format: null,
//         prefix: '',
//         postfix: '',
//         dp: 2
//     }
// )

// // Empty
// console.log("CHECK  Empty...")
// checkDetails(
//     detector.typeDetect([]),
//     {
//         type: null,
//         format: null,
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )

console.log('Failed', failed, 'of', total, 'tests. See above for details');
