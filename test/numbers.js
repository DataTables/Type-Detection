var typeDetect = require('../dist/cloudtables-type-detect');

var failed = 0;
var total = 0;

var checkDetails = function(actual, expected) {
    console.log(Date.now())
    total = total + 5;
    if(actual.type === expected.type) {
        console.log("      TYPE: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("      TYPE: \033[0;31mFAIL\033[0m");
        console.log("           Expected:'"+ (expected.type === null ? "null" : expected.type)+ "'+ Got:'"+ (actual.type === null ? "null" : actual.type) + "'")
    }

    if(actual.format === expected.format) {
        console.log("    FORMAT: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("    FORMAT: \033[0;31mFAIL\033[0m");
        console.log("           Expected:'"+ (expected.format === null ? "null" : expected.format)+ "'+ Got:'"+ (actual.format === null ? "null" : actual.format) + "'");
    }

    if(actual.prefix === expected.prefix) {
        console.log("    PREFIX: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("    PREFIX: \033[0;31mFAIL\033[0m");
        console.log("           Expected:'"+ (expected.prefix === null ? "null" : expected.prefix)+ "'+ Got:'"+ (actual.prefix === null ? "null" : actual.prefix) + "'");
    }

    if(actual.postfix === expected.postfix) {
        console.log("   POSTFIX: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("   POSTFIX: \033[0;31mFAIL\033[0m");
        console.log("           Expected:'"+ (expected.postfix === null ? "null" : expected.postfix)+ "'+ Got:'"+ (actual.postfix === null ? "null" : actual.postfix) + "'");
    }

    if(actual.dp === expected.dp) {
        console.log("        DP: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("        DP: \033[0;31mFAIL\033[0m");
        console.log("           Expected:'"+ (expected.dp === null ? "null" : expected.dp)+ "'+ Got:'"+ (actual.dp === null ? "null" : actual.dp) + "'");
    }
    console.log("\n")
}

var detector = new typeDetect["default"]();
// Simple Numbers
console.log("CHECK  Simple Numbers...")
checkDetails(
    detector.typeDetect([1,2,3]),
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
    detector.typeDetect([1.1,2.5,3.6]),
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
    detector.typeDetect([11.1, 2, 3.67]),
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
    detector.typeDetect(["11.1", "2", "3.67"]),
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
    detector.typeDetect(["11,100", "2", "3,670"]),
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
    detector.typeDetect(["1,111.1", "2", "1,456,300.67"]),
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
    detector.typeDetect(['$1.99','$2.50','$3.00']),
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
    detector.typeDetect(['ALL1.99','ALL2.50','ALL3.00']),
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
    detector.typeDetect(['ALL 1.90','ALL 1.50','ALL 1.00']),
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
    detector.typeDetect(['1.99 beans','2.50 beans','3.00 beans']),
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
    detector.typeDetect(['1.99 butterflies','2.50 butterflies','3.00 butterflies']),
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
    detector.typeDetect(['1.90 butterflies','2.50 butterflies','3.00 butterflies']),
    {
        type: 'number',
        format: null,
        prefix: '',
        postfix: ' butterflies',
        dp: 2
    }
)

console.log("Failed", failed, "of", total, "tests. See above for details");