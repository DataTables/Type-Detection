
/* eslint-disable sort-keys */
/* eslint-disable max-len */

module.exports = {
	name: 'HTML',
	tests: [
		{
			name: 'Dates with Do comma and MMMM...',
			input: ['quinta-feira 1st out, 2020', 'domingo 17th out, 1999', 'quinta-feira 2nd jan, 2025'],
			expected: {
				dp: null,
				format: 'dddd Do MMM, YYYY',
				postfix: null,
				prefix: null,
				type: 'date',
			}
		}
	],
	setup(detector) {
		detector.i18n({
			abbrDays: {
				pt: /^(abc|def|ghi|jkl|mno|pqr|stu)$/gi,
			},
			abbrMonths: {
				pt: /^(jan|fev|março|abril|maio|junho|julho|agosto|set|out|nov|dez)$/gi,
			},
			days: {
				pt: /(segunda-feira|terça-feira|quarta-feira|quinta-feira|sexta-feira|sábado|domingo)/gi
			},
		});
	}
};
