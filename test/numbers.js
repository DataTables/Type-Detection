
/* eslint-disable sort-keys */
/* eslint-disable max-len */

module.exports = {
	name: 'Numbers',
	tests: [
		{
			name: 'Simple Numbers...',
			input: [1, 2, 4],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number'
			}
		},

		// Decimal Numbers
		{
			name: 'Decimal Numbers...',
			input: [1.1, 2.5, 3.6],
			expected: {
				dp: 1,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number'
			}
		},

		// Mixed Length Decimal Numbers
		{
			name: 'Mixed Length Decimal Numbers...',
			input: [11.1, 2, 3.67],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number'
			}
		},

		// Decimal Numbers in String Form
		{
			name: 'Decimal Numbers in String Form...',
			input: ['11.1', '2', '3.67'],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number'
			}
		},

		// Thousands Separated Numbers
		{
			name: 'Thousands Separated Numbers...',
			input: ['11,100', '2', '3,670'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number'
			}
		},

		// Thousands Separated Numbers with Decimal places
		{
			name: 'Thousands Separated Numbers with Decimal places...',
			input: ['1,111.1', '2', '1,456,300.67'],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number'
			}
		},

		// Currency Numbers
		{
			name: 'Currency Numbers...',
			input: ['$1.99', '$2.50', '$3.00'],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '$',
				type: 'number'
			}
		},

		// Currency Numbers
		{
			name: 'Currency Numbers with repeated character in prefix...',
			input: ['ALL1.99', 'ALL2.50', 'ALL3.00'],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: 'ALL',
				type: 'number'
			}
		},

		// Numbers with postfixed unit with identical trailing 0s
		{
			name: 'Numbers with prefix same first number...',
			input: ['ALL 1.90', 'ALL 1.50', 'ALL 1.00'],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: 'ALL ',
				type: 'number'
			}
		},

		// Numbers with postfixed unit
		{
			name: 'Numbers with postfixed unit...',
			input: ['1.99 beans', '2.50 beans', '3.00 beans'],
			expected: {
				dp: 2,
				format: null,
				postfix: ' beans',
				prefix: '',
				type: 'number'
			}
		},

		// Numbers with postfixed unit where the unit has repeated characters
		{
			name: 'Numbers with postfixed unit with repeated characters...',
			input: ['1.99 butterflies', '2.50 butterflies', '3.00 butterflies'],
			expected: {
				dp: 2,
				format: null,
				postfix: ' butterflies',
				prefix: '',
				type: 'number'
			}
		},

		// Numbers with postfixed unit with identical trailing 0s
		{
			name: 'Numbers with postfixed unit and trailing 0s...',
			input: ['1.90 butterflies', '2.50 butterflies', '3.00 butterflies'],
			expected: {
				dp: 2,
				format: null,
				postfix: ' butterflies',
				prefix: '',
				type: 'number'
			}
		},

		// Currency Numbers
		{
			name: 'Currency Numbers with empty string...',
			input: ['$20.00', '$22.10', '$11222.33', ''],
			expected: {
				dp: 2,
				format: null,
				postfix: '',
				prefix: '$',
				type: 'number'
			}
		},
	]
};
