var typeDetect = require('../dist/cloudtables-type-detect');

var failed = 0;
var total = 0;

var checkDetails = function(actual, expected) {
    total = total + 5;
    if(actual.type === expected.type) {
        console.log("      TYPE: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("      TYPE: \033[0;31mFAIL\033[0m");
        console.log("Expected:'"+ (expected.type === null ? "null" : expected.type)+ "'+ Got:'"+ (actual.type === null ? "null" : actual.type) + "'")
    }

    if(actual.format === expected.format) {
        console.log("    FORMAT: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("    FORMAT: \033[0;31mFAIL\033[0m");
        console.log("Expected:'"+ (expected.format === null ? "null" : expected.format)+ "'+ Got:'"+ (actual.format === null ? "null" : actual.format) + "'");
    }

    if(actual.prefix === expected.prefix) {
        console.log("    PREFIX: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("    PREFIX: \033[0;31mFAIL\033[0m");
        console.log("Expected:'"+ (expected.prefix === null ? "null" : expected.prefix)+ "'+ Got:'"+ (actual.prefix === null ? "null" : actual.prefix) + "'");
    }

    if(actual.postfix === expected.postfix) {
        console.log("   POSTFIX: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("   POSTFIX: \033[0;31mFAIL\033[0m");
        console.log("Expected:'"+ (expected.postfix === null ? "null" : expected.postfix)+ "'+ Got:'"+ (actual.postfix === null ? "null" : actual.postfix) + "'");
    }

    if(actual.dp === expected.dp) {
        console.log("        DP: \033[0;32mPASS\033[0m");
    }
    else{
        failed++;
        console.log("        DP: \033[0;31mFAIL\033[0m");
        console.log("Expected:'"+ (expected.dp === null ? "null" : expected.dp)+ "'+ Got:'"+ (actual.dp === null ? "null" : actual.dp) + "'");
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

// // Dates
// console.log("CHECK  Dates...")
// checkDetails(
//     detector.typeDetect(['2021-03-11','2020-12-25','2021-01-01']),
//     {
//         type: 'date',
//         format: 'YYYY-MM-DD',
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )

// // Times
// console.log("CHECK  Times...")
// checkDetails(
//     detector.typeDetect(['17:30','9:45','1:12']),
//     {
//         type: 'date',
//         format: 'YYYY-MM-DD HH:mm',
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )

// // DateTimes
// console.log("CHECK  DateTimes...")
// checkDetails(
//     detector.typeDetect(['2021-03-11 17:30','2020-12-25 9:45','2021-01-01 1:12']),
//     {
//         type: 'datetime',
//         format: 'YYYY-MM-DD HH:mm',
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )

// // Strings
// console.log("CHECK  Strings...")
// checkDetails(
//     detector.typeDetect(['Test','Archie','Hugo']),
//     {
//         type: 'string',
//         format: null,
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )

// // HTML
// console.log("CHECK  HTML...")
// checkDetails(
//     detector.typeDetect(['<a href="//example.com>Example</a>','Archie','<span>Hugo</span>']),
//     {
//         type: 'html',
//         format: null,
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )

// // Mixed
// console.log("CHECK  Mixed...")
// checkDetails(
//     detector.typeDetect(['Test', 123, '$1']),
//     {
//         type: 'mixed',
//         format: null,
//         prefix: null,
//         postfix: null,
//         dp: null
//     }
// )

// // Excel
// console.log("CHECK  Excel...")
// checkDetails(
//     detector.typeDetect([{ value: '1', excel: '0.00' },{ value: '1.45', excel: '0.00' },{ value: '10', excel: '0.00' }]),
//     {
//         type: 'excel',
//         format: null,
//         prefix: '',
//         postfix: '',
//         dp: 2
//     }
// )

// Empty
console.log("CHECK  Empty...")
checkDetails(
    detector.typeDetect([]),
    {
        type: null,
        format: null,
        prefix: null,
        postfix: null,
        dp: null
    }
)

console.log("Failed", failed, "of", total, "tests. See above for details")