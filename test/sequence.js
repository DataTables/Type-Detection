
/* eslint-disable sort-keys */
/* eslint-disable max-len */

module.exports = {
	name: 'Sequence',
	tests: [
		// Normal sequence
		{
			name: 'CHECK  123...',
			input: [1, 2, 3],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  123 as strings...',
			input: ['1', '2', '3'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  2468...',
			input: [2, 4, 6, 8],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  2468 as string...',
			input: ['2', '4', '6', '8'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  8642 as string...',
			input: ['8', '6', '4', '2'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  4628 as string...',
			input: ['4', '6', '2', '8'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  0, 10, 20, 30 as string...',
			input: ['0', '10', '20', '30'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},

		// Normal sequence as string
		{
			name: 'CHECK  0, -10, -20, -30 as string...',
			input: ['0', '-10', '-20', '-30'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  0.5, 1.0, 2.0, 3.0 as string fails because decimal...',
			input: ['0.5', '1.0', '1.5', '2.0'],
			expected: {
				dp: 1,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  prefixes fail $0, $10, $20, $30 as string...',
			input: ['$0', '$10', '$20', '$30'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '$',
				type: 'number',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  postfixes fail 0$, 10$, 20$, 30$ as string...',
			input: ['0$', '10$', '20$', '30$'],
			expected: {
				dp: 0,
				format: null,
				postfix: '$',
				prefix: '',
				type: 'number',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  postfixes pass thousands format 1,000, 2,000, 3,000, 4,000 as string...',
			input: ['1,000', '2,000', '3,000', '4,000'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'sequence',
			}
		},
		// Normal sequence as string
		{
			name: 'CHECK  postfixes pass thousands format 1,000, 2,000, 3,000, 4,000 as string...',
			input: ['1,000', '2,000', '3,000', '4,000', '4,001'],
			expected: {
				dp: 0,
				format: null,
				postfix: '',
				prefix: '',
				type: 'number',
			}
		},
	]
};
