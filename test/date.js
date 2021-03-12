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
// Dates YYYY-MM-DD
console.log("CHECK  Dates standard...")
checkDetails(
    detector.typeDetect(['2021-03-11','2020-12-25','2021-01-01']),
    {
        type: 'date',
        format: 'YYYY-MM-DD',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-D
console.log("CHECK  Dates small day...")
checkDetails(
    detector.typeDetect(['2021-03-1','2020-12-25','2021-01-11']),
    {
        type: 'date',
        format: 'YYYY-MM-D',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-D but not in the first element
console.log("CHECK  Dates small day not first...")
checkDetails(
    detector.typeDetect(['2020-12-25', '2021-03-1', '2021-01-11']),
    {
        type: 'date',
        format: 'YYYY-MM-D',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-D but not in the first element
console.log("CHECK  Dates year last...")
checkDetails(
    detector.typeDetect(['12-25-2020', '03-1-2021', '01-11-1999']),
    {
        type: 'date',
        format: 'MM-D-YYYY',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-D but not in the first element
console.log("CHECK  Dates small day and small month not first...")
checkDetails(
    detector.typeDetect(['12-25-2020', '3-01-2021', '1-11-1999']),
    {
        type: 'date',
        format: 'M-DD-YYYY',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-D but not in the first element
console.log("CHECK  Dates small day and small month not first...")
checkDetails(
    detector.typeDetect(['12-25-2020', '3-1-2021', '1-11-1999']),
    {
        type: 'date',
        format: 'M-D-YYYY',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-D but not in the first element
console.log("CHECK  Mixed Dates...")
checkDetails(
    detector.typeDetect(['12-25-2020', '03-01-2021', '25-01-1999']),
    {
        type: 'mixed',
        format: null,
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-D but not in the first element
console.log("CHECK  Small Year...")
checkDetails(
    detector.typeDetect(['12-25-20', '03-01-21', '04-01-99']),
    {
        type: 'date',
        format: 'MM-DD-YY',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-DD
console.log("CHECK  Dates standard '/' separator...")
checkDetails(
    detector.typeDetect(['2021/03/11','2020/12/25','2021/01/01']),
    {
        type: 'date',
        format: 'YYYY/MM/DD',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-DD
console.log("CHECK  Dates standard ' ' separator...")
checkDetails(
    detector.typeDetect(['2021 03 11','2020 12 25','2021 01 01']),
    {
        type: 'date',
        format: 'YYYY MM DD',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-DD
console.log("CHECK  Dates with 'Do'...")
checkDetails(
    detector.typeDetect(['1st 10 2020','17th 10 1999','2nd 1 2025']),
    {
        type: 'date',
        format: 'Do M YYYY',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-DD
console.log("CHECK  Dates with Do comma and MMMM...")
checkDetails(
    detector.typeDetect(['1st October, 2020','17th October, 1999','2nd January, 2025']),
    {
        type: 'date',
        format: 'Do MMMM, YYYY',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-DD
console.log("CHECK  Dates with Do comma and MMMM...")
checkDetails(
    detector.typeDetect(['1st Oct, 2020','17th Oct, 1999','2nd Jan, 2025']),
    {
        type: 'date',
        format: 'Do MMM, YYYY',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-DD
console.log("CHECK  Dates with Do comma and MMMM...")
checkDetails(
    detector.typeDetect(['1st Oct, 2020 17:12:47','17th Oct, 1999 12:56:07','2nd Jan, 2025 09:02:00']),
    {
        type: 'date',
        format: 'Do MMM, YYYY HH:mm:ss',
        prefix: null,
        postfix: null,
        dp: null
    }
)


console.log("Failed", failed, "of", total, "tests. See above for details");