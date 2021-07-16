/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
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

let months = {
	en: [
		'january',
		'January',
		'february',
		'February',
		'march',
		'March',
		'april',
		'April',
		'may',
		'May',
		'june',
		'June',
		'july',
		'July',
		'august',
		'August',
		'september',
		'September',
		'october',
		'October',
		'november',
		'November',
		'december',
		'December']
};
let abbrMonths = {
	en: [
		'jan',
		'Jan',
		'feb',
		'Feb',
		'mar',
		'Mar',
		'apr',
		'Apr',
		'may',
		'May',
		'jun',
		'Jun',
		'jul',
		'Jul',
		'aug',
		'Aug',
		'sep',
		'Sep',
		'oct',
		'Oct',
		'nov',
		'Nov',
		'dec',
		'Dec']
};
let days = {
	en: [
		'monday',
		'Monday',
		'tuesday',
		'Tuesday',
		'wednesday',
		'Wednesday',
		'thursday',
		'Thursday',
		'friday',
		'Friday',
		'saturday',
		'Saturday',
		'sunday',
		'Sunday']
};
let abbrDays = {
	en: [
		'mon',
		'Mon',
		'tue',
		'Tue',
		'wed',
		'Wed',
		'thu',
		'Thu',
		'fri',
		'Fri',
		'sat',
		'Sat',
		'sun',
		'Sun'
	]
};
let postFixes = {
	en: [
		'1st',
		'2nd',
		'3rd',
		'4th',
		'5th',
		'6th',
		'7th',
		'8th',
		'9th',
		'10th',
		'11th',
		'12th',
		'13th',
		'14th',
		'15th',
		'16th',
		'17th',
		'18th',
		'19th',
		'20th',
		'21st',
		'22nd',
		'23rd',
		'24th',
		'25th',
		'26th',
		'27th',
		'28th',
		'29th',
		'30th',
		'31st'
	]
};

let separators = [
	'-', '/', ':', ',', ' '
];

let tokens = {
	ampm:[
		'A',
		'a'
	],
	day:[
		'DD',
		'Do',
		'D',
	],
	hour:[
		'HH',
		'H',
		'hh',
		'h',
	],
	minute:[
		'mm',
		'm',
	],
	month:[
		'MMMM',
		'MMM',
		'MM',
		'M',
	],
	second:[
		'ss',
		's',
	],
	weekday:[
		'dddd',
		'ddd',
	],
	year:[
		'YYYY',
		'YY',
		'Y',
	]
};

let combos = [];
let keys = Object.keys(tokens);
let depth = 0;

for (let key of keys) {
	for (let token of tokens[key]) {
		console.log('depth', depth);
		combos.push(token);
		let previousKeys = [key];
		let previousValues = [token];
		combos.concat(getCombos(combos, previousKeys, previousValues, tokens, keys, depth));
	}
}

console.log(combos);


console.log('Failed', failed, 'of', total, 'tests. See above for details');

function getCombos(combosIn, previousKeys, previousValues, tokensIn, keysIn, depthIn) {
	depthIn++;
	if(previousKeys.length === keysIn.length) {
		console.log(previousKeys.length);
		return combosIn;
	}
	console.log(previousKeys);
	for(let key of keysIn) {
		if(previousKeys.indexOf(key) === -1) {
			for(let token of tokensIn[keys]) {
				console.log('depth', depthIn);
				combosIn.push(token);
				previousKeys.push(keys);
				previousValues.push(token);
				combosIn.concat(getCombos(combosIn, previousKeys, previousValues, tokensIn, keysIn, depthIn));
			}
		}
	}
}
