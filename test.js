/* eslint-disable max-len */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

const typeDetect = require('./dist/cloudtables-type-detect');

const files = process.argv.slice(2);

let totalFailed = 0;
let totalPassed = 0;
let detector = new typeDetect['default']();

for (let file of files) {
	let testSet = require('./test/' + file);
	let failed = 0;
	let passed = 0;

	console.log('Test set: ' + testSet.name);

	for (let test of testSet.tests) {
		let format = detector.typeDetect(test.input);
		let pass = checkDetails(format, test.expected);

		if (! pass) {
			failed++;
			console.log(`  Test failed: ${file}.js - ${test.name}`);
			dumpResult(format, test.expected);
		}
		else {
			passed++;
		}
	}

	console.log(`  Passed: ${passed}  Failed: ${failed}`);
	totalFailed += failed;
	totalPassed += passed;
}

console.log(`Tests completed - ${files.length} sets run.`);
console.log(`${totalPassed + totalFailed} tests were run with ${totalPassed} passing and ${totalFailed} failing.`);
console.log('');


function checkDetails(actual, expected) {
	return actual.type === expected.type &&
		actual.format === expected.format &&
		actual.prefix === expected.prefix &&
		actual.postfix === expected.postfix &&
		actual.dp === expected.dp;
}


function dumpResult(actual, expected, name) {
	if(actual.type === expected.type) {
		console.log('    Type: ✓');
	}
	else{
		console.log('    Type: \033[0;31m✕\033[0m  Expected: \'' + (expected.type === null ? 'null' : expected.type) +
			'\' but got: \''+ (actual.type === null ? 'null' : actual.type) + '\''
		);
	}

	if(actual.format === expected.format) {
		console.log('    Format: ✓');
	}
	else{
		console.log('    Format: \033[0;31m✕\033[0m  Expected: \'' + (expected.format === null ? 'null' : expected.format) +
			'\' but got: \''+ (actual.format === null ? 'null' : actual.format) + '\''
		);
	}

	if(actual.prefix === expected.prefix) {
		console.log('    Prefix: ✓');
	}
	else{
		console.log('    Prefix: \033[0;31m✕\033[0m  Expected: \'' + (expected.prefix === null ? 'null' : expected.prefix) +
			'\' but got: \''+ (actual.prefix === null ? 'null' : actual.prefix) + '\''
		);
	}

	if(actual.postfix === expected.postfix) {
		console.log('    Postfix: ✓');
	}
	else{
		console.log('    Postfix: \033[0;31m✕\033[0m  Expected: \'' + (expected.postfix === null ? 'null' :
			expected.postfix) + '\' but got: \''+ (actual.postfix === null ? 'null' : actual.postfix) + '\''
		);
	}

	if(actual.dp === expected.dp) {
		console.log('    Decimal places: ✓');
	}
	else{
		console.log('    Decimal places: \033[0;31m✕\033[0m  Expected: \'' + (expected.dp === null ? 'null' : expected.dp) +
			'\' but got: \''+ (actual.dp === null ? 'null' : actual.dp) + '\''
		);
	}
}
