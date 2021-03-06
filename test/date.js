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
// Dates YYYY-MM-DD
console.log('CHECK  Dates standard...');
checkDetails(
	detector.typeDetect(['2021-03-11','2020-12-25','2021-01-01']),
	{
		dp: null,
		format: 'YYYY-MM-DD',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-D
console.log('CHECK  Dates small day...');
checkDetails(
	detector.typeDetect(['2021-03-1','2020-12-25','2021-01-11']),
	{
		dp: null,
		format: 'YYYY-MM-D',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Dates small day not first...');
checkDetails(
	detector.typeDetect(['2020-12-25', '2021-03-1', '2021-01-11']),
	{
		dp: null,
		format: 'YYYY-MM-D',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Dates year last...');
checkDetails(
	detector.typeDetect(['12-25-2020', '03-1-2021', '01-11-1999']),
	{
		dp: null,
		format: 'MM-D-YYYY',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Dates small day and small month not first...');
checkDetails(
	detector.typeDetect(['12-25-2020', '3-01-2021', '1-11-1999']),
	{
		dp: null,
		format: 'M-DD-YYYY',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Dates small day and small month not first...');
checkDetails(
	detector.typeDetect(['12-25-2020', '3-1-2021', '1-11-1999']),
	{
		dp: null,
		format: 'M-D-YYYY',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Mixed Dates...');
checkDetails(
	detector.typeDetect(['12-25-2020', '03-01-2021', '25-01-1999']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'mixed',
	}
);

// Dates YYYY-MM-D but not in the first element
console.log('CHECK  Small Year...');
checkDetails(
	detector.typeDetect(['12-25-20', '03-01-21', '04-01-99']),
	{
		dp: null,
		format: 'MM-DD-YY',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates standard \'/\' separator...');
checkDetails(
	detector.typeDetect(['2021/03/11','2020/12/25','2021/01/01']),
	{
		dp: null,
		format: 'YYYY/MM/DD',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates standard \' \' separator...');
checkDetails(
	detector.typeDetect(['2021 03 11','2020 12 25','2021 01 01']),
	{
		dp: null,
		format: 'YYYY MM DD',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with \'Do\'...');
checkDetails(
	detector.typeDetect(['1st 10 2020','17th 10 1999','2nd 1 2025']),
	{
		dp: null,
		format: 'Do M YYYY',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMMM...');
checkDetails(
	detector.typeDetect(['1st October, 2020','17th October, 1999','2nd January, 2025']),
	{
		dp: null,
		format: 'Do MMMM, YYYY',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMM...');
checkDetails(
	detector.typeDetect(['1st Oct, 2020','17th Oct, 1999','2nd Jan, 2025']),
	{
		dp: null,
		format: 'Do MMM, YYYY',
		postfix: null,
		prefix: null,
		type: 'date',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  just time...');
checkDetails(
	detector.typeDetect(['17:12:47','12:56:07','09:02:00']),
	{
		dp: null,
		format: 'HH:mm:ss',
		postfix: null,
		prefix: null,
		type: 'time',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMM and long time...');
checkDetails(
	detector.typeDetect(['1st Oct, 2020 17:12:47','17th Oct, 1999 12:56:07','2nd Jan, 2025 09:02:00']),
	{
		dp: null,
		format: 'Do MMM, YYYY HH:mm:ss',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMM and ampm...');
checkDetails(
	detector.typeDetect(['1st Oct, 2020 11:12:47 am','17th Oct, 1999 10:56:07 pm','2nd Jan, 2025 9:02:00 am']),
	{
		dp: null,
		format: 'Do MMM, YYYY h:mm:ss a',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(['1st Oct, 2020 11:12:47 AM','17th Oct, 1999 10:56:07 PM','2nd Jan, 2025 9:02:00 AM']),
	{
		dp: null,
		format: 'Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with ddd Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['Thu 1st Oct, 2020 11:12:47 AM','Sun 17th Oct, 1999 10:56:07 PM','Fri 3rd Jan, 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'ddd Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK  Dates with dddd Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['Thursday 1st Oct, 2020 11:12:47 AM','Sunday 17th Oct, 1999 10:56:07 PM','Friday 3rd Jan, 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'dddd Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK German Dates with Do comma and MMM and ampm...');
checkDetails(
	detector.typeDetect(['1st Okt., 2020 11:12:47 am','17th Okt., 1999 10:56:07 pm','2nd Jan., 2025 9:02:00 am']),
	{
		dp: null,
		format: 'Do MMM, YYYY h:mm:ss a',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK German Dates with Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['1st Oktober, 2020 11:12:47 AM','17th Oktober, 1999 10:56:07 PM','2nd Januar, 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'Do MMMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK German Dates with ddd Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['Do. 1st Okt., 2020 11:12:47 AM','So. 17th Okt., 1999 10:56:07 PM','Fr. 3rd Jan., 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'ddd Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK German Dates with dddd Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		[
			'Donnerstag 1st Okt., 2020 11:12:47 AM',
			'Sonntag 17th Okt., 1999 10:56:07 PM',
			'Freitag 3rd Jan., 2025 9:02:00 AM'
		]
	),
	{
		dp: null,
		format: 'dddd Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK French Dates with Do comma and MMM and ampm...');
checkDetails(
	detector.typeDetect(
		['1st Oct., 2020 11:12:47 am','17th Oct., 1999 10:56:07 pm','2nd Janv., 2025 9:02:00 am']
	),
	{
		dp: null,
		format: 'Do MMM, YYYY h:mm:ss a',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK French Dates with Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['1st Octobre, 2020 11:12:47 AM','17th Octobre, 1999 10:56:07 PM','2nd Janvier, 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'Do MMMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK French Dates with ddd Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['Jeu. 1st Oct., 2020 11:12:47 AM','Dim. 17th Oct., 1999 10:56:07 PM','Ven. 3rd Jan., 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'ddd Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK French Dates with dddd Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['Jeudi 1st Oct., 2020 11:12:47 AM','Dimanche 17th Oct., 1999 10:56:07 PM','Vendredi 3rd Jan., 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'dddd Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK Spanish Dates with Do comma and MMM and ampm...');
checkDetails(
	detector.typeDetect(['1st Oct., 2020 11:12:47 am','17th Oct., 1999 10:56:07 pm','2nd Ene., 2025 9:02:00 am']),
	{
		dp: null,
		format: 'Do MMM, YYYY h:mm:ss a',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK Spanish Dates with Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['1st Octubre, 2020 11:12:47 AM','17th Octubre, 1999 10:56:07 PM','2nd Enero, 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'Do MMMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK Spanish Dates with ddd Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['Jue. 1st Oct., 2020 11:12:47 AM','Dom. 17th Oct., 1999 10:56:07 PM','Vie. 3rd Ene., 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'ddd Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK Spanish Dates with dddd Do comma and MMMM and AMPM...');
checkDetails(
	detector.typeDetect(
		['Jueves 1st Oct., 2020 11:12:47 AM','Domingo 17th Oct., 1999 10:56:07 PM','Viernes 3rd Ene., 2025 9:02:00 AM']
	),
	{
		dp: null,
		format: 'dddd Do MMM, YYYY h:mm:ss A',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK Strict ISO8601 format YYYY-MM-DDTHH:mm:ss...');
checkDetails(
	detector.typeDetect(
		['2021-07-14T17:02:00','1974-02-21T01:11:45','2025-12-01T23:56:59']
	),
	{
		dp: null,
		format: 'YYYY-MM-DDTHH:mm:ss',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK for time offset Z just +...');
checkDetails(
	detector.typeDetect(
		['2021-07-14T17:02:00+12:00','1974-02-21T01:11:45+12:00','2025-12-01T23:56:59+12:00']
	),
	{
		dp: null,
		format: 'YYYY-MM-DDTHH:mm:ssZ',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK for time offset ZZ just +...');
checkDetails(
	detector.typeDetect(
		['2021-07-14T17:02:00+02:00','1974-02-21T01:11:45+12:00','2025-12-01T23:56:59+01:00']
	),
	{
		dp: null,
		format: 'YYYY-MM-DDTHH:mm:ssZZ',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK for time offset Z just -...');
checkDetails(
	detector.typeDetect(
		['2021-07-14T17:02:00-12:00','1974-02-21T01:11:45-12:00','2025-12-01T23:56:59-12:00']
	),
	{
		dp: null,
		format: 'YYYY-MM-DDTHH:mm:ssZ',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK for time offset ZZ just -...');
checkDetails(
	detector.typeDetect(
		['2021-07-14T17:02:00-02:00','1974-02-21T01:11:45-12:00','2025-12-01T23:56:59-01:00']
	),
	{
		dp: null,
		format: 'YYYY-MM-DDTHH:mm:ssZZ',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK for time offset Z just -...');
checkDetails(
	detector.typeDetect(
		['2021-07-14T17:02:00-12:00','1974-02-21T01:11:45+12:00','2025-12-01T23:56:59-12:00']
	),
	{
		dp: null,
		format: 'YYYY-MM-DDTHH:mm:ssZ',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK for time offset ZZ just -...');
checkDetails(
	detector.typeDetect(
		['2021-07-14T17:02:00+02:00','1974-02-21T01:11:45-12:00','2025-12-01T23:56:59+01:00']
	),
	{
		dp: null,
		format: 'YYYY-MM-DDTHH:mm:ssZZ',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

// Dates YYYY-MM-DD
console.log('CHECK for time offset Z just -...');
checkDetails(
	detector.typeDetect(
		['17:02:00 -12:00 2021-07-14','01:11:45 +12:00 1974-02-21','23:56:59 -12:00 2025-12-01']
	),
	{
		dp: null,
		format: 'HH:mm:ss Z YYYY-MM-DD',
		postfix: null,
		prefix: null,
		type: 'datetime',
	}
);

console.log('Failed', failed, 'of', total, 'tests. See above for details');
