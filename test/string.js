
module.exports = {
	name: 'Strings',
	tests: [
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			},
			input: ['Test','Archie','Hugo'],
			name: 'Strings...',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			},
			input: [
				'http://live.datatables.net/gipugure/1/edit',
				'http://live.datatables.net/gipugure/1/edit',
				'http://live.datatables.net/gipugure/1/edit'
			],
			name: 'Strings...',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			},
			input: [
				'http://live.datatables.net/gipugure/1/edit',
			],
			name: 'Strings...',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'object'
			},
			input: [
				{a: 1},
			],
			name: 'A passed in object',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'array'
			},
			input: [
				[1,2,3],
			],
			name: 'A passed in array',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			},
			input: [
				null,
				'a',
				'b'
			],
			name: 'Leading null',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			},
			input: [
				null,
				'a',
				null
			],
			name: 'Multi nulls',
		},
		{
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'string'
			},
			input: ['Alpha','September','Beta'],
			name: 'Strings with a month name',
		}
	]
};
