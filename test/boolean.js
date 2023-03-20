/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
let TypeDetect = require('../dist/cloudtables-type-detect');
let checkDetails = require('./shared').checkDetails;
let result = require('./shared').result;
let detector = new TypeDetect['default']();

console.log('True only');
checkDetails(
	detector.typeDetect([true, true, true]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'boolean'
	}
);

console.log('False only');
checkDetails(
	detector.typeDetect([false, false, false]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'boolean'
	}
);

console.log('Mixed boolean');
checkDetails(
	detector.typeDetect([true, false, true]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'boolean'
	}
);

console.log('With a string');
checkDetails(
	detector.typeDetect([true, false, 'test']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'mixed'
	}
);

console.log('Number booleans');
checkDetails(
	detector.typeDetect([0, 1, 0]),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'boolean'
	}
);

console.log('String booleans');
checkDetails(
	detector.typeDetect(['t', 'f', 't']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'boolean'
	}
);

console.log('String with a non-boolean');
checkDetails(
	detector.typeDetect(['t', 'f', 'g']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

console.log('Upper case');
checkDetails(
	detector.typeDetect(['TRUE', 'FALSE', 'FALSE']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'boolean'
	}
);

console.log('Mixed case');
checkDetails(
	detector.typeDetect(['True', 'False', 'False']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'boolean'
	}
);

console.log('String with a one boolean and one not');
checkDetails(
	detector.typeDetect(['f', 'g']),
	{
		dp: null,
		format: null,
		postfix: null,
		prefix: null,
		type: 'string'
	}
);

result();

