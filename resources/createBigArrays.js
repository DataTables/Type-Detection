const fs = require('fs');

var bigDates = [];

months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
];
abbrMonths = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
];
days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];
abbrDays = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
];
postFixes = [
    "st",
    "nd",
    "rd",
    "th"
]


for(var i = 0; i < 10000; i++) {
    randomDay = (1 + Math.round(Math.random() * 27)).toString();
    postfix = "th";
    if(randomDay[randomDay.length-1] === "1") {
        postfix = "st";
    }
    else if(randomDay[randomDay.length-1] === "2") {
        postfix = "nd";
    }
    else if(randomDay[randomDay.length-1] === "3") {
        postfix = "rd";
    }
    randomMonth = abbrMonths[Math.round(Math.random() * 11)];
    randomYear = 1950 + Math.round(Math.random() * 99);
    randomHour = 1 + Math.round(Math.random() * 11);
    randomMinute = Math.round(Math.random() * 59);
    randomSecond = Math.round(Math.random() * 59);
    randomAMPM = 1 + Math.round(Math.random());
    bigDates.push(randomDay + postfix + " " + randomMonth + ", " + randomYear + " "  + randomHour + ":" + (randomMinute < 10 ? "0" + randomMinute : randomMinute) + ":" + (randomSecond < 10 ? "0" + randomSecond : randomSecond) + " " + (randomAMPM === 1 ? "AM" : "PM"))
}

console.log(bigDates);

fs.writeFileSync("./resources/bigDates.json", JSON.stringify(bigDates))