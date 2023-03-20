
/* eslint-disable sort-keys */
/* eslint-disable max-len */

module.exports = {
	name: 'Excel',
	tests: [
		{
			name: 'Simple Numbers...',
			input: [
				{
					excel: '#',
					value: '1'
				},
				{
					excel: '#',
					value: '1.45'
				},
				{
					excel: '#',
					value: '10'
				},
			],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Simple Numbers...',
			input: [
				{
					excel: '#',
					value: '1'
				},
				{
					excel: '#',
					value: '2'
				},
				{
					excel: '#',
					value: '3'
				}
			],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Decimal Numbers...',
			input: [
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
			],
			expected: {
				dp: 1,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Mixed Length Decimal Numbers...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Decimal Numbers in String Form...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Thousands Separated Numbers...',
			input: [
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
			],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Thousands Separated Numbers with Decimal places...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Currency Numbers...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '$',
				type: 'number',
			}
		},
		{
			name: 'Currency Numbers with repeated character in prefix...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: 'ALL',
				type: 'number',
			}
		},
		{
			name: 'Numbers with prefix same first number...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: 'ALL ',
				type: 'number',
			}
		},
		{
			name: 'Numbers with postfixed unit...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: ' beans',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Numbers with postfixed unit with repeated characters...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: ' butterflies',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Numbers with postfixed unit and trailing 0s...',
			input: [
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
			],
			expected: {
				dp: 2,
				format: null,
				postfix: ' butterflies',
				prefix: '',
				type: 'number',
			}
		},
		{
			name: 'Strings with postfixed unit and trailing 0s...',
			input: [
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
			],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			}
		},
		{
			name: 'Dates standard...',
			input: [
				{
					excel: 'yyyy-mm-dd',
					value: '2021-03-11'
				},
				{
					excel: 'yyyy-mm-dd',
					value: '2020-12-25'
				},
				{
					excel: 'yyyy-mm-dd',
					value: '2021-01-01'
				}
			],
			expected: {
				dp: null,
				format: 'YYYY-MM-DD',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates small day...',
			input: [
				{
					excel: 'yyyy-mm-d',
					value: '2021-03-1'
				},
				{
					excel: 'yyyy-mm-d',
					value: '2020-12-25'
				},
				{
					excel: 'yyyy-mm-d',
					value: '2021-01-11'
				}
			],
			expected: {
				dp: null,
				format: 'YYYY-MM-D',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates small day not first...',
			input: [
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
			],
			expected: {
				dp: null,
				format: 'YYYY-MM-D',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates year last...',
			input: [
				{
					excel: 'mm-d-yyyy',
					value: '12-25-2020'
				},
				{
					excel: 'mm-d-yyyy',
					value: '03-1-2021'
				},
				{
					excel: 'mm-d-yyyy',
					value: '01-11-1999'
				}
			],
			expected: {
				dp: null,
				format: 'MM-D-YYYY',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates small day and small month not first...',
			input: [
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
			],
			expected: {
				dp: null,
				format: 'M-DD-YYYY',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates small day and small month not first...',
			input: [
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
			],
			expected: {
				dp: null,
				format: 'M-D-YYYY',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Mixed Dates...',
			input: [
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
			],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'mixed'
			}
		},
		{
			name: 'Small Year...',
			input: [
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
			],
			expected: {
				dp: null,
				format: 'MM-DD-YY',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates standard \'/\' separator...',
			input: [
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
			],
			expected: {
				dp: null,
				format: 'YYYY/MM/DD',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates standard \' \' separator...',
			input: [
				{
					excel: 'yyyy mm dd',
					value: '2021 03 11'
				},
				{
					excel: 'yyyy mm dd',
					value: '2020 12 25'
				},
				{
					excel: 'yyyy mm dd',
					value: '2021 01 01'
				}
			],
			expected: {
				dp: null,
				format: 'YYYY MM DD',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates with Do comma and MMMM...',
			input: [
				{
					excel: 'd mmmm, yyyy',
					value: '1 October, 2020'
				},
				{
					excel: 'd mmmm, yyyy',
					value: '17 October, 1999'
				},
				{
					excel: 'd mmmm, yyyy',
					value: '2 January, 2025'
				}
			],
			expected: {
				dp: null,
				format: 'D MMMM, YYYY',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates with Do comma and MMM...',
			input: [
				{
					excel: 'd mmm, yyyy',
					value: '10 Oct, 2020'
				},
				{
					excel: 'd mmm, yyyy',
					value: '17 Oct, 1999'
				},
				{
					excel: 'd mmm, yyyy',
					value: '2 Jan, 2025'
				}
			],
			expected: {
				dp: null,
				format: 'D MMM, YYYY',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		},
		{
			name: 'Dates with Do comma and MMM and long time...',
			input: [
				{
					excel: 'd mmmm, yyyy hh:mm:ss',
					value: '10 Oct, 2020 17:12:47'
				},
				{
					excel: 'd mmmm, yyyy hh:mm:ss',
					value: '17 Oct, 1999 12:56:07'
				},
				{
					excel: 'd mmmm, yyyy hh:mm:ss',
					value: '2 Jan, 2025 09:02:00'
				}
			],
			expected: {
				dp: null,
				format: 'D MMM, YYYY HH:mm:ss',
				postfix: null,
				prefix: null,
				type: 'datetime'
			}
		},
		{
			name: 'Dates with Do comma and MMM and long time...',
			input: [
				{
					excel: 'D/MM/YYYY',
					value: '18/09/2020'
				},
				{
					excel: 'D/MM/YYYY',
					value: '11/05/2020'
				},
				{
					excel: 'D/MM/YYYY',
					value: '15/09/2020'
				}
			],
			expected: {
				dp: null,
				format: 'D/MM/YYYY',
				postfix: null,
				prefix: null,
				type: 'date'
			}
		}, {
			name: 'Strings with null data...',
			input: [
				null,
				{
					excel: '',
					value: 'Sandy'
				},
				{
					excel: '',
					value: 'Janitor'
				}
			],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			}
		}, {
			name: 'Strings with multi null data...',
			input: [
				null,
				{
					excel: '',
					value: 'Sandy'
				},
				null
			],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			}
		},
	]
};
