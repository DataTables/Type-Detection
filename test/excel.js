// This code is only useful if at some point more advanced formatting data for excel is required.


var typeDetect = require('../dist/cloudtables-type-detect');

var failed = 0;
var total = 0;

var checkDetails = function(actual, expected) {
    console.log(Date.now())
    total = total + 16;
    if(actual.type === expected.type) {
        console.log("   TYPE: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("   TYPE: \033[0;31mFAIL\033[0m");
        console.log("       Expected:'"+ (expected.type === null ? "null" : expected.type)+ "'+ Got:'"+ (actual.type === null ? "null" : actual.type) + "'")
    }

    if(actual.format === expected.format) {
        console.log(" FORMAT: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log(" FORMAT: \033[0;31mFAIL\033[0m");
        console.log("       Expected:'"+ (expected.format === null ? "null" : expected.format)+ "'+ Got:'"+ (actual.format === null ? "null" : actual.format) + "'")
    }

    if(actual.prefix === expected.prefix) {
        console.log(" PREFIX: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log(" PREFIX: \033[0;31mFAIL\033[0m");
        console.log("       Expected:'"+ (expected.prefix === null ? "null" : expected.prefix)+ "'+ Got:'"+ (actual.prefix === null ? "null" : actual.prefix) + "'");
    }

    if(actual.postfix === expected.postfix) {
        console.log("POSTFIX: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("POSTFIX: \033[0;31mFAIL\033[0m");
        console.log("       Expected:'"+ (expected.postfix === null ? "null" : expected.postfix)+ "'+ Got:'"+ (actual.postfix === null ? "null" : actual.postfix) + "'");
    }

    if(actual.dp === expected.dp) {
        console.log("     DP: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("     DP: \033[0;31mFAIL\033[0m");
        console.log("       Expected:'"+ (expected.dp === null ? "null" : expected.dp)+ "'+ Got:'"+ (actual.dp === null ? "null" : actual.dp) + "'");
    }
    console.log("\n")
}

var detector = new typeDetect["default"]();
// Simple Numbers
console.log("CHECK  Simple Numbers...")
checkDetails(
    detector.typeDetect([
        { value: '1', excel: '#' },
        { value: '1.45', excel: '#' },
        { value: '10', excel: '#' },
      ]),
      {
        type: 'number',
        format: null,
        prefix: '',
        postfix: '',
        dp: 2
      }
)

// Simple Numbers
console.log("CHECK  Simple Numbers...")
checkDetails(
    detector.typeDetect([
        { value: '1', excel: '#' },
        { value: '2', excel: '#' },
        { value: '3', excel: '#' }
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: '',
        dp: 0
    }
)

// Decimal Numbers
console.log("CHECK  Decimal Numbers...")
checkDetails(
    detector.typeDetect([
        { value: 1.1, excel: '#.#'},
        { value: 2.5, excel: '#.#'},
        { value: 3.6, excel: '#.#'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: '',
        dp: 1
    }
)

// Mixed Length Decimal Numbers
console.log("CHECK  Mixed Length Decimal Numbers...")
checkDetails(
    detector.typeDetect([
        { value: 11.1, excel: '#.??'},
        { value: 2, excel: '#.??'},
        { value: 3.67, excel: '#.??'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: '',
        dp: 2
    }
)

// Decimal Numbers in String Form
console.log("CHECK  Decimal Numbers in String Form...")
checkDetails(
    detector.typeDetect([
        { value: '11.1', excel: '#.??'},
        { value: '2', excel: '#.??'},
        { value: '3.67', excel: '#.??'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: '',
        dp: 2
    }
)

// Thousands Separated Numbers
console.log("CHECK  Thousands Separated Numbers...")
checkDetails(
    detector.typeDetect([
        { value: '11,100', excel: '#,###'},
        { value: '2', excel: '#,###'},
        { value: '3,670', excel: '#,###'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: '',
        dp: 0
    }
)

// Thousands Separated Numbers with Decimal places
console.log("CHECK  Thousands Separated Numbers with Decimal places...")
checkDetails(
    detector.typeDetect([
        { value: "1,111.1", excel: '#,###.?'},
        { value: "2", excel: '#,###.?'},
        { value: "1,456,300.67", excel: '#,###.?'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: '',
        dp: 2
    }
)

// Currency Numbers
console.log("CHECK  Currency Numbers...")
checkDetails(
    detector.typeDetect([
        { value: '$1.99', excel: '"$"0.00'},
        { value: '$2.50', excel: '"$"0.00'},
        { value: '$3.00', excel: '"$"0.00'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '$',
        postfix: '',
        dp: 2
    }
)

// Currency Numbers
console.log("CHECK  Currency Numbers with repeated character in prefix...")
checkDetails(
    detector.typeDetect([
        { value: 'ALL1.99', excel: '"ALL"0.00'},
        { value: 'ALL2.50', excel: '"ALL"0.00'},
        { value: 'ALL3.00', excel: '"ALL"0.00'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: 'ALL',
        postfix: '',
        dp: 2
    }
)

// Numbers with postfixed unit with identical trailing 0s
console.log("CHECK  Numbers with prefix same first number...")
checkDetails(
    detector.typeDetect([
        { value: 'ALL 1.90', excel: '"ALL "0.00'},
        { value: 'ALL 1.50', excel: '"ALL "0.00'},
        { value: 'ALL 1.00', excel: '"ALL "0.00'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: 'ALL ',
        postfix: '',
        dp: 2
    }
)

// Numbers with postfixed unit
console.log("CHECK  Numbers with postfixed unit...")
checkDetails(
    detector.typeDetect([
        { value: '1.99 beans', excel: '#.00" beans"'},
        { value: '2.50 beans', excel: '#.00" beans"'},
        { value: '3.00 beans', excel: '#.00" beans"'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: ' beans',
        dp: 2
    }
)

// Numbers with postfixed unit where the unit has repeated characters
console.log("CHECK  Numbers with postfixed unit with repeated characters...")
checkDetails(
    detector.typeDetect([
        { value: '1.99 butterflies', excel: '#.00" butterflies"'},
        { value: '2.50 butterflies', excel: '#.00" butterflies"'},
        { value: '3.00 butterflies', excel: '#.00" butterflies"'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: ' butterflies',
        dp: 2
    }
)

// Numbers with postfixed unit with identical trailing 0s
console.log("CHECK  Numbers with postfixed unit and trailing 0s...")
checkDetails(
    detector.typeDetect([
        { value: '1.90 butterflies', excel: '#.00" butterflies"'},
        { value: '2.50 butterflies', excel: '#.00" butterflies"'},
        { value: '3.00 butterflies', excel: '#.00" butterflies"'}
    ]),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: ' butterflies',
        dp: 2
    }
)

// Numbers with postfixed unit with identical trailing 0s
console.log("CHECK  Strings with postfixed unit and trailing 0s...")
checkDetails(
    detector.typeDetect([
        { value: 'butterflies', excel: ''},
        { value: 'Sandy', excel: ''},
        { value: 'Janitor', excel: ''}
    ]),
    {
        type: 'string',
        format: null,
        prefix: null,
        postfix: null,
        dp: null
    }
)



console.log("Failed", failed, "of", total, "tests. See above for details");