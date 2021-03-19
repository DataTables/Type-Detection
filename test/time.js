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
console.log("CHECK  Dates with Do comma and MMM and long time...")
checkDetails(
    detector.typeDetect(['17:12:47','12:56:07','09:02:00']),
    {
        type: 'date',
        format: 'HH:mm:ss',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-DD
console.log("CHECK  Dates with Do comma and MMM and ampm...")
checkDetails(
    detector.typeDetect(['11:12:47 am','10:56:07 pm','9:02:00 am']),
    {
        type: 'date',
        format: 'H:mm:ss a',
        prefix: null,
        postfix: null,
        dp: null
    }
)

// Dates YYYY-MM-DD
console.log("CHECK  Dates with Do comma and MMMM and AMPM...")
checkDetails(
    detector.typeDetect(['11:12:47 AM','10:56:07 PM','9:02:00 AM']),
    {
        type: 'date',
        format: 'H:mm:ss A',
        prefix: null,
        postfix: null,
        dp: null
    }
)


console.log("Failed", failed, "of", total, "tests. See above for details");