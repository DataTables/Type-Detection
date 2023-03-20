
/* eslint-disable sort-keys */
/* eslint-disable max-len */

module.exports = {
	name: 'HTML',
	tests: [
		{
			name: 'CHECK  HTML...',
			input: ['<a href="//example.com>Example</a>', 'Archie', '<span>Hugo</span>'],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'html',
			}
		},

		{
			name: 'CHECK PURE HTML',
			input: ['<a href="/root">Root</a>'],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'html'
			}
		},

		{
			name: 'CHECK PURE HTML',
			input: ['<p><b>Bold!</b> Not bold</p>', '<p><b>Bold!</b> Not bold1</p>'],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'html'
			}
		},

		{
			name: 'CHECK PURE HTML',
			input: ['<p><b>Bold!</b> Not bold2</p>', '<p><b>Bold!</b> Not bold1</p>'],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'html'
			}
		},

		{
			name: 'CHECK PURE HTML',
			input: ['<a href="/root">Root</a>', '<a href="/root">Rootq</a>'],
			expected: {
				dp: null,
				format: null,
				postfix: null,
				prefix: null,
				type: 'html'
			}
		},

		{
			name: 'Just gt signs is not picked as HTML',
			input: ['3 > 2 > 1', 'a', '5 > 2'],
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
