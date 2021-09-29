/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
let typeDetect = require('../dist/cloudtables-type-detect');
let checkDetails = require('./shared').checkDetails;
let result = require('./shared').result;
let detector = new typeDetect['default']();

// HTML
console.log('CHECK  HTML...');
checkDetails(
	detector.typeDetect(['<a href="//example.com>Example</a>','Archie','<span>Hugo</span>']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'html',
	}
);

console.log('CHECK PURE HTML');
checkDetails(
	detector.typeDetect(['<a href="/root">Root</a>']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'html'
	}
);

console.log('CHECK PURE HTML');
checkDetails(
	detector.typeDetect(['<p><b>Bold!</b> Not bold</p>', '<p><b>Bold!</b> Not bold1</p>']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'html'
	}
);

console.log('CHECK PURE HTML');
checkDetails(
	detector.typeDetect(['<p><b>Bold!</b> Not bold2</p>', '<p><b>Bold!</b> Not bold1</p>']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'html'
	}
);

console.log('CHECK PURE HTML');
checkDetails(
	detector.typeDetect(['<a href="/root">Root</a>', '<a href="/root">Rootq</a>']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'html'
	}
);

console.log('Just gt signs is not picked as HTML');
checkDetails(
	detector.typeDetect(['3 > 2 > 1', 'a', '5 > 2']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

result();
