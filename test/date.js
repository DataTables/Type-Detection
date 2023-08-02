
/* eslint-disable sort-keys */
/* eslint-disable max-len */

module.exports = {
	name: 'Dates',
	tests: [
		{
			name: 'YYYY-MM-DD',
			input: ['2021-03-11', '2020-12-25', '2021-01-01'],
			expected: {
				dp: null,
				format: 'YYYY-MM-DD',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {

			name: 'YYYY-MM-D',
			input: ['2021-03-1', '2020-12-25', '2021-01-11'],
			expected: {
				dp: null,
				format: 'YYYY-MM-D',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {

			name: 'YYYY-MM-D but not in the first element',
			input: ['2020-12-25', '2021-03-1', '2021-01-11'],
			expected: {
				dp: null,
				format: 'YYYY-MM-D',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {

			name: 'Dates year last...',
			input: ['12-25-2020', '03-1-2021', '01-11-1999'],
			expected: {
				dp: null,
				format: 'MM-D-YYYY',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {

			name: 'Dates small day and small month not first...',
			input: ['12-25-2020', '3-01-2021', '1-11-1999'],
			expected: {
				dp: null,
				format: 'M-DD-YYYY',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {

			name: 'CHECK  Dates small day and small month not first...',
			input: ['12-25-2020', '3-1-2021', '1-11-1999'],
			expected: {
				dp: null,
				format: 'M-D-YYYY',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {

			name: 'CHECK  Mixed Dates...',
			input: ['12-25-2020', '03-01-2021', '25-01-1999'],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'mixed',
			}
		}, {


			name: 'CHECK  Small Year...',
			input: ['12-25-20', '03-01-21', '04-01-99'],
			expected: {
				dp: null,
				format: 'MM-DD-YY',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {


			name: 'CHECK  Dates standard \'/\' separator...',
			input: ['2021/03/11', '2020/12/25', '2021/01/01'],
			expected: {
				dp: null,
				format: 'YYYY/MM/DD',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {


			name: 'CHECK  Dates standard \' \' separator...',
			input: ['2021 03 11', '2020 12 25', '2021 01 01'],
			expected: {
				dp: null,
				format: 'YYYY MM DD',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {


			name: 'CHECK  Dates with \'Do\'...',
			input: ['1st 10 2020', '17th 10 1999', '2nd 1 2025'],
			expected: {
				dp: null,
				format: 'Do M YYYY',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {


			name: 'CHECK  Dates with Do comma and MMMM...',
			input: ['1st October, 2020', '17th October, 1999', '2nd January, 2025'],
			expected: {
				dp: null,
				format: 'Do MMMM, YYYY',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {


			name: 'CHECK  Dates with Do comma and MMM...',
			input: ['1st Oct, 2020', '17th Oct, 1999', '2nd Jan, 2025'],
			expected: {
				dp: null,
				format: 'Do MMM, YYYY',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {


			name: 'CHECK  just time...',
			input: ['17:12:47', '12:56:07', '09:02:00'],
			expected: {
				dp: null,
				format: 'HH:mm:ss',
				postfix: null,
				prefix: null,
				type: 'time',
			}
		}, {


			name: 'CHECK  Dates with Do comma and MMM and long time...',
			input: ['1st Oct, 2020 17:12:47', '17th Oct, 1999 12:56:07', '2nd Jan, 2025 09:02:00'],
			expected: {
				dp: null,
				format: 'Do MMM, YYYY HH:mm:ss',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK  Dates with Do comma and MMM and ampm...',
			input: ['1st Oct, 2020 11:12:47 am', '17th Oct, 1999 10:56:07 pm', '2nd Jan, 2025 9:02:00 am'],
			expected: {
				dp: null,
				format: 'Do MMM, YYYY h:mm:ss a',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK  Dates with Do comma and MMMM and AMPM...',
			input: ['1st Oct, 2020 11:12:47 AM', '17th Oct, 1999 10:56:07 PM', '2nd Jan, 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK  Dates with ddd Do comma and MMMM and AMPM...',
			input: ['Thu 1st Oct, 2020 11:12:47 AM', 'Sun 17th Oct, 1999 10:56:07 PM', 'Fri 3rd Jan, 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'ddd Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK  Dates with dddd Do comma and MMMM and AMPM...',
			input: ['Thursday 1st Oct, 2020 11:12:47 AM', 'Sunday 17th Oct, 1999 10:56:07 PM', 'Friday 3rd Jan, 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'dddd Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK German Dates with Do comma and MMM and ampm...',
			input: ['1st Okt., 2020 11:12:47 am', '17th Okt., 1999 10:56:07 pm', '2nd Jan., 2025 9:02:00 am'],
			expected: {
				dp: null,
				format: 'Do MMM, YYYY h:mm:ss a',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK German Dates with Do comma and MMMM and AMPM...',
			input: ['1st Oktober, 2020 11:12:47 AM', '17th Oktober, 1999 10:56:07 PM', '2nd Januar, 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'Do MMMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK German Dates with ddd Do comma and MMMM and AMPM...',
			input: ['Do. 1st Okt., 2020 11:12:47 AM', 'So. 17th Okt., 1999 10:56:07 PM', 'Fr. 3rd Jan., 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'ddd Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK German Dates with dddd Do comma and MMMM and AMPM...',
			input: [
				'Donnerstag 1st Okt., 2020 11:12:47 AM',
				'Sonntag 17th Okt., 1999 10:56:07 PM',
				'Freitag 3rd Jan., 2025 9:02:00 AM'
			],
			expected: {
				dp: null,
				format: 'dddd Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK French Dates with Do comma and MMM and ampm...',
			input: ['1st Oct., 2020 11:12:47 am', '17th Oct., 1999 10:56:07 pm', '2nd Janv., 2025 9:02:00 am'],
			expected: {
				dp: null,
				format: 'Do MMM, YYYY h:mm:ss a',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK French Dates with Do comma and MMMM and AMPM...',
			input: ['1st Octobre, 2020 11:12:47 AM', '17th Octobre, 1999 10:56:07 PM', '2nd Janvier, 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'Do MMMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK French Dates with ddd Do comma and MMMM and AMPM...',
			input: ['Jeu. 1st Oct., 2020 11:12:47 AM', 'Dim. 17th Oct., 1999 10:56:07 PM', 'Ven. 3rd Jan., 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'ddd Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK French Dates with dddd Do comma and MMMM and AMPM...',
			input: ['Jeudi 1st Oct., 2020 11:12:47 AM', 'Dimanche 17th Oct., 1999 10:56:07 PM', 'Vendredi 3rd Jan., 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'dddd Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK Spanish Dates with Do comma and MMM and ampm...',
			input: ['1st Oct., 2020 11:12:47 am', '17th Oct., 1999 10:56:07 pm', '2nd Ene., 2025 9:02:00 am'],
			expected: {
				dp: null,
				format: 'Do MMM, YYYY h:mm:ss a',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK Spanish Dates with Do comma and MMMM and AMPM...',
			input: ['1st Octubre, 2020 11:12:47 AM', '17th Octubre, 1999 10:56:07 PM', '2nd Enero, 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'Do MMMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK Spanish Dates with ddd Do comma and MMMM and AMPM...',
			input: ['Jue. 1st Oct., 2020 11:12:47 AM', 'Dom. 17th Oct., 1999 10:56:07 PM', 'Vie. 3rd Ene., 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'ddd Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK Spanish Dates with dddd Do comma and MMMM and AMPM...',
			input: ['Jueves 1st Oct., 2020 11:12:47 AM', 'Domingo 17th Oct., 1999 10:56:07 PM', 'Viernes 3rd Ene., 2025 9:02:00 AM'],
			expected: {
				dp: null,
				format: 'dddd Do MMM, YYYY h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK Strict ISO8601 format YYYY-MM-DDTHH:mm:ss...',
			input: ['2021-07-14T17:02:00', '1974-02-21T01:11:45', '2025-12-01T23:56:59'],
			expected: {
				dp: null,
				format: 'YYYY-MM-DDTHH:mm:ss',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK for time offset Z just +...',
			input: ['2021-07-14T17:02:00+12:00', '1974-02-21T01:11:45+12:00', '2025-12-01T23:56:59+12:00'],
			expected: {
				dp: null,
				format: 'YYYY-MM-DDTHH:mm:ssZ',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK for time offset ZZ just +...',
			input: ['2021-07-14T17:02:00+02:00', '1974-02-21T01:11:45+12:00', '2025-12-01T23:56:59+01:00'],
			expected: {
				dp: null,
				format: 'YYYY-MM-DDTHH:mm:ssZZ',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK for time offset Z just -...',
			input: ['2021-07-14T17:02:00-12:00', '1974-02-21T01:11:45-12:00', '2025-12-01T23:56:59-12:00'],
			expected: {
				dp: null,
				format: 'YYYY-MM-DDTHH:mm:ssZ',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK for time offset ZZ just -...',
			input: ['2021-07-14T17:02:00-02:00', '1974-02-21T01:11:45-12:00', '2025-12-01T23:56:59-01:00'],
			expected: {
				dp: null,
				format: 'YYYY-MM-DDTHH:mm:ssZZ',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK for time offset Z just -...',
			input: ['2021-07-14T17:02:00-12:00', '1974-02-21T01:11:45+12:00', '2025-12-01T23:56:59-12:00'],
			expected: {
				dp: null,
				format: 'YYYY-MM-DDTHH:mm:ssZ',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK for time offset ZZ just -...',
			input: ['2021-07-14T17:02:00+02:00', '1974-02-21T01:11:45-12:00', '2025-12-01T23:56:59+01:00'],
			expected: {
				dp: null,
				format: 'YYYY-MM-DDTHH:mm:ssZZ',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK for time offset Z just -...',
			input: ['17:02:00 -12:00 2021-07-14', '01:11:45 +12:00 1974-02-21', '23:56:59 -12:00 2025-12-01'],
			expected: {
				dp: null,
				format: 'HH:mm:ss Z YYYY-MM-DD',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {


			name: 'CHECK for D/MM/Y...',
			input: ['18/09/20', '11/05/20', '15/09/20'],
			expected: {
				dp: null,
				format: 'D/MM/Y',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {


			name: 'CHECK for D/MM/Y with leading space is ok...',
			input: [' 18/09/20', ' 11/05/20', ' 15/09/20'],
			expected: {
				dp: null,
				format: ' D/MM/Y',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}, {


			name: 'CHECK  Dates with other words should be string...',
			input: ['The 1st of Oct, 2020', 'The 17th of Oct, 1999', 'The 2nd of Jan, 2025'],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string',
			}
		}, {

			name: 'CHECK  Dates and times American style...',
			input: ['3/7/2022 11:14am', '3/7/2022 7:36am', '3/11/2022 8:01pm'],
			expected: {
				dp: null,
				format: 'M/D/YYYY h:mma',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {

			name: 'CHECK  Dates and times American style caps...',
			input: ['3/7/2022 11:14AM', '3/7/2022 7:36AM', '3/11/2022 8:01PM'],
			expected: {
				dp: null,
				format: 'M/D/YYYY h:mmA',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}, {

			name: 'CHECK  Dates and times American style with a space...',
			input: ['3/7/2022 11:14 am', '3/7/2022 7:36 am', '3/11/2022 8:01 pm'],
			expected: {
				dp: null,
				format: 'M/D/YYYY h:mm a',
				postfix: null,
				prefix: null,
				type: 'datetime',
			}
		}
	]
};

