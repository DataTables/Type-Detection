
/* eslint-disable sort-keys */
/* eslint-disable max-len */

module.exports = {
	name: 'Times',
	tests: [

		{
			name: 'Times HH:mm:ss...',
			input: ['17:12:47', '12:56:07', '09:02:00'],
			expected: {
				dp: null,
				format: 'HH:mm:ss',
				postfix: null,
				prefix: null,
				type: 'time'
			}
		},
		{
			name: 'Times HH:mm:ss...',
			input: ['13:03:09.000Z', '09:14:43.000Z', '08:46:23.000Z'],
			expected: {
				dp: null,
				format: 'HH:mm:ss.SSS',
				postfix: null,
				prefix: null,
				type: 'time'
			}
		},

		{
			name: 'Times h:mm:ss a...',
			input: ['11:12:47 am', '10:56:07 pm', '9:02:00 am'],
			expected: {
				dp: null,
				format: 'h:mm:ss a',
				postfix: null,
				prefix: null,
				type: 'time'
			}
		},

		{
			name: 'Times h:mm:ss A...',
			input: ['11:12:47 AM', '10:56:07 PM', '9:02:00 AM'],
			expected: {
				dp: null,
				format: 'h:mm:ss A',
				postfix: null,
				prefix: null,
				type: 'time'
			}
		},
	]
};

