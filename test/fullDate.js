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

var months = {
    en: [
        'january',
        'January',
        'february',
        'February',
        'march',
        'March',
        'april',
        'April',
        'may',
        'May',
        'june',
        'June',
        'july',
        'July',
        'august',
        'August',
        'september',
        'September',
        'october',
        'October',
        'november',
        'November',
        'december',
        'December']
}
var abbrMonths = {
    en: [
        'jan',
        'Jan',
        'feb',
        'Feb',
        'mar',
        'Mar',
        'apr',
        'Apr',
        'may',
        'May',
        'jun',
        'Jun',
        'jul',
        'Jul',
        'aug',
        'Aug',
        'sep',
        'Sep',
        'oct',
        'Oct',
        'nov',
        'Nov',
        'dec',
        'Dec']
}
var days = {
    en: [
        'monday',
        'Monday',
        'tuesday',
        'Tuesday',
        'wednesday',
        'Wednesday',
        'thursday',
        'Thursday',
        'friday',
        'Friday',
        'saturday',
        'Saturday',
        'sunday',
        'Sunday']
} 
var abbrDays = {
    en: [
        'mon',
        'Mon',
        'tue',
        'Tue',
        'wed',
        'Wed',
        'thu',
        'Thu',
        'fri',
        'Fri',
        'sat',
        'Sat',
        'sun',
        'Sun'
    ]
} 
var postFixes = {
    en: [
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th',
        '9th',
        '10th',
        '11th',
        '12th',
        '13th',
        '14th',
        '15th',
        '16th',
        '17th',
        '18th',
        '19th',
        '20th',
        '21st',
        '22nd',
        '23rd',
        '24th',
        '25th',
        '26th',
        '27th',
        '28th',
        '29th',
        '30th',
        '31st'
    ]
}

var separators = [
    "-", "/", ":", ",", " "
]

var tokens = {
    day:[
        'DD',
        'Do',
        'D',
    ],
    weekday:[
        'dddd',
        'ddd',
    ],
    month:[
        'MMMM',
        'MMM',
        'MM',
        'M',
    ],
    year:[
        'YYYY',
        'YY',
        'Y',
    ],
    hour:[
        'HH',
        'H',
        'hh',
        'h',
    ],
    minute:[
        'mm',
        'm',
    ],
    second:[
        'ss',
        's',
    ],
    ampm:[
        'A',
        'a'
    ]
}

var combos = [];
var keys = Object.keys(tokens);
depth = 0;
for(var i = 0; i < keys.length; i++) {
    for(var j = 0; j < tokens[keys[i]].length; j++) {
        console.log("depth", depth);
        combos.push(tokens[keys[i]][j])
        var previousKeys = [keys[i]];
        var previousValues = [tokens[keys[i]][j]]
        combos.concat(getCombos(combos, previousKeys, previousValues, tokens, keys, depth));
    }
}

console.log(combos);


console.log("Failed", failed, "of", total, "tests. See above for details");

function getCombos(combos, previousKeys, previousValues, tokens, keys, depth) {
    depth++
    if(previousKeys.length === keys.length) {
        console.log(previousKeys.length)
        return combos;
    }
    console.log(previousKeys)
    for(var i = 0; i < keys.length; i++) {
        if(previousKeys.indexOf(keys[i]) === -1) {
            console.log(i)
            // if(previousKeys.indexOf())
            for(var j = 0; j < tokens[keys[i]].length; j++) {
                console.log("depth", depth);
                combos.push(tokens[keys[i]][j])
                previousKeys.push(keys[i]);
                previousValues.push(tokens[keys[i]][j])
                combos.concat(getCombos(combos, previousKeys, previousValues, tokens, keys, depth));
            }
        }
    }
}