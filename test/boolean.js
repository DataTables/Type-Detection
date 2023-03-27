
module.exports = {
	name: 'Boolean',
	tests: [
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: [true, true, true],
			name: 'True only',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: [false, false, false],
			name: 'False only',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: [true, false, true],
			name: 'Mixed boolean',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'mixed'
			},
			input: [true, false, 'test'],
			name: 'With a string',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: [0, 1, 0],
			name: 'Number booleans',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: ['t', 'f', 't'],
			name: 'String booleans',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			},
			input: ['t', 'f', 'g'],
			name: 'String with a non-boolean',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: ['TRUE', 'FALSE', 'FALSE'],
			name: 'Upper case',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: ['True', 'False', 'False'],
			name: 'Mixed case',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			},
			input: ['f', 'g'],
			name: 'String with a one boolean and one not',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: [1, undefined, undefined, 1],
			name: 'Mixed undefined',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'boolean'
			},
			input: [1, null, null, 0],
			name: 'Mixed undefined',
		},
	]
};
