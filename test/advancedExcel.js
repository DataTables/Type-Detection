// This code is only useful if at some point more advanced formatting data for excel is required.


// var typeDetect = require('../dist/cloudtables-type-detect');

// var failed = 0;
// var total = 0;

// var checkExcelFormat = function(actual, expected) {
//     if (actual.dp === expected.dp) {
//         console.log("                format.dp: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log("                format.dp: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.dp === null ? "null" : expected.dp) + "'+ Got:'"+ (actual.dp === null ? "null" : actual.dp) + "'")
//     }
// 	if (actual.fraction === expected.fraction) {
//         console.log("          format.fraction: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log("          format.fraction: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.fraction === null ? "null" : expected.fraction) + "'+ Got:'"+ (actual.fraction === null ? "null" : actual.fraction) + "'")
//     }
// 	if (actual.scaleThousands === expected.scaleThousands) {
//         console.log("    format.scaleThousands: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log("    format.scaleThousands: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.scaleThousands === null ? "null" : expected.scaleThousands) + "'+ Got:'"+ (actual.scaleThousands === null ? "null" : actual.scaleThousands) + "'")
//     }
// 	if (actual.thousandsSeparated === expected.thousandsSeparated) {
//         console.log("format.thousandsSeparated: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log("format.thousandsSeparated: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.thousandsSeparated === null ? "null" : expected.thousandsSeparated) + "'+ Got:'"+ (actual.thousandsSeparated === null ? "null" : actual.thousandsSeparated) + "'")
//     }
// 	if (actual.leadingZeros === expected.leadingZeros) {
//         console.log("      format.leadingZeros: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log("      format.leadingZeros: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.leadingZeros === null ? "null" : expected.leadingZeros) + "'+ Got:'"+ (actual.leadingZeros === null ? "null" : actual.leadingZeros) + "'")
//     }
// 	if (actual.forceLeadingZeros === expected.forceLeadingZeros) {
//         console.log(" format.forceLeadingZeros: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log(" format.forceLeadingZeros: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.forceLeadingZeros === null ? "null" : expected.forceLeadingZeros) + "'+ Got:'"+ (actual.forceLeadingZeros === null ? "null" : actual.forceLeadingZeros) + "'")
//     }
// 	if (actual.colours.length === 0 && expected.colours.length === 0) {
//         console.log("           format.colours: \033[0;32mPASS\033[0m")
//     }
//     else if (actual.colours.length === expected.colours.length) {
//         for(var i = 0; i < actual.colours.length; i++) {
//             if(actual[i] !== expected[i]) {
//                 failed++;
//                 console.log("           format.colours: \033[0;31mFAIL\033[0m")
//                 console.log("                     Expected:'"+ (expected.colours === null ? "null" : expected.colours) + "'+ Got:'"+ (actual.colours === null ? "null" : actual.colours) + "'")
//                 break;
//             }
//         }
//         console.log("           format.colours: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log("           format.colours: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.colours === null ? "null" : expected.colours) + "'+ Got:'"+ (actual.colours === null ? "null" : actual.colours) + "'")
//     }
// 	if (actual.hideZeroValues === expected.hideZeroValues) {
//         console.log("    format.hideZeroValues: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log("    format.hideZeroValues: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.hideZeroValues === null ? "null" : expected.hideZeroValues) + "'+ Got:'"+ (actual.hideZeroValues === null ? "null" : actual.hideZeroValues) + "'")
//     }
// 	if (actual.hideAllValues === expected.hideAllValues) {
//         console.log("    format.hideAllValues: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log("    format.hideAllValues: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.hideAllValues === null ? "null" : expected.hideAllValues) + "'+ Got:'"+ (actual.hideAllValues === null ? "null" : actual.hideAllValues) + "'")
//     }
// 	if (actual.includesDateTime === expected.includesDateTime) {
//         console.log(" format.includesDateTime: \033[0;32mPASS\033[0m")
//     }
//     else {
//         failed++;
//         console.log(" format.includesDateTime: \033[0;31mFAIL\033[0m")
//         console.log("                     Expected:'"+ (expected.includesDateTime === null ? "null" : expected.includesDateTime) + "'+ Got:'"+ (actual.includesDateTime === null ? "null" : actual.includesDateTime) + "'")
//     }
// }

// var checkDetails = function(actual, expected) {
//     console.log(Date.now())
//     total = total + 16;
//     if(actual.type === expected.type) {
//         console.log("                    TYPE: \033[0;32mPASS\033[0m");
//     }
//     else{
//         failed++;
//         console.log("                    TYPE: \033[0;31mFAIL\033[0m");
//         console.log("                     Expected:'"+ (expected.type === null ? "null" : expected.type)+ "'+ Got:'"+ (actual.type === null ? "null" : actual.type) + "'")
//     }

//     checkExcelFormat(actual.format, expected.format);

//     if(actual.prefix === expected.prefix) {
//         console.log("                  PREFIX: \033[0;32mPASS\033[0m");
//     }
//     else{
//         failed++;
//         console.log("                  PREFIX: \033[0;31mFAIL\033[0m");
//         console.log("                     Expected:'"+ (expected.prefix === null ? "null" : expected.prefix)+ "'+ Got:'"+ (actual.prefix === null ? "null" : actual.prefix) + "'");
//     }

//     if(actual.postfix === expected.postfix) {
//         console.log("                 POSTFIX: \033[0;32mPASS\033[0m");
//     }
//     else{
//         failed++;
//         console.log("                 POSTFIX: \033[0;31mFAIL\033[0m");
//         console.log("                     Expected:'"+ (expected.postfix === null ? "null" : expected.postfix)+ "'+ Got:'"+ (actual.postfix === null ? "null" : actual.postfix) + "'");
//     }

//     if(actual.dp === expected.dp) {
//         console.log("                      DP: \033[0;32mPASS\033[0m");
//     }
//     else{
//         failed++;
//         console.log("                      DP: \033[0;31mFAIL\033[0m");
//         console.log("                     Expected:'"+ (expected.dp === null ? "null" : expected.dp)+ "'+ Got:'"+ (actual.dp === null ? "null" : actual.dp) + "'");
//     }
//     console.log("\n")
// }

// var detector = new typeDetect["default"]();
// // Simple Numbers
// console.log("CHECK  Simple Numbers...")
// checkDetails(
//     detector.typeDetect([
//         { value: '1', excel: '#' },
//         { value: '1.45', excel: '#' },
//         { value: '10', excel: '#' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 0,
//             thousandsSeparated: false,
//             leadingZeros: 0,
//             forceLeadingZeros: false,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// // Simple Numbers
// console.log("CHECK  Simple Numbers set zeros...")
// checkDetails(
//     detector.typeDetect([
//         { value: '1', excel: '0.00' },
//         { value: '1.45', excel: '0.00' },
//         { value: '10.1', excel: '0.00' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 2,
//             fraction: false,
//             scaleThousands: 0,
//             thousandsSeparated: false,
//             leadingZeros: 1,
//             forceLeadingZeros: false,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 2
//       }
// )

// // Simple Numbers
// console.log("CHECK  Fraction...")
// checkDetails(
//     detector.typeDetect([
//         { value: '1.83', excel: '# ???/???' },
//         { value: '1.05', excel: '# ???/???' },
//         { value: '10.15', excel: '# ???/???' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: true,
//             scaleThousands: 0,
//             thousandsSeparated: false,
//             leadingZeros: 0,
//             forceLeadingZeros: false,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// // Simple Numbers
// console.log("CHECK  Thousands Separated...")
// checkDetails(
//     detector.typeDetect([
//         { value: '5000', excel: '#,###' },
//         { value: '100000', excel: '#,###' },
//         { value: '23000', excel: '#,###' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 0,
//             thousandsSeparated: true,
//             leadingZeros: 0,
//             forceLeadingZeros: false,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// // Simple Numbers
// console.log("CHECK  Thousands scaled 1...")
// checkDetails(
//     detector.typeDetect([
//         { value: '5000', excel: '#,' },
//         { value: '100000', excel: '#,' },
//         { value: '23000', excel: '#,' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 1,
//             thousandsSeparated: false,
//             leadingZeros: 0,
//             forceLeadingZeros: false,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// // Simple Numbers
// console.log("CHECK  Thousands scaled 2...")
// checkDetails(
//     detector.typeDetect([
//         { value: '5000000', excel: '#,,' },
//         { value: '100000000', excel: '#,,' },
//         { value: '23000000', excel: '#,,' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 2,
//             thousandsSeparated: false,
//             leadingZeros: 0,
//             forceLeadingZeros: false,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// // Simple Numbers
// console.log("CHECK  Leading Zeros up to 5 digits...")
// checkDetails(
//     detector.typeDetect([
//         { value: '5', excel: '00000' },
//         { value: '10', excel: '00000' },
//         { value: '1000', excel: '00000' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 0,
//             thousandsSeparated: false,
//             leadingZeros: 5,
//             forceLeadingZeros: false,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// // Simple Numbers
// console.log("CHECK  Leading Zeros 3 forced...")
// checkDetails(
//     detector.typeDetect([
//         { value: '5', excel: '"000"#' },
//         { value: '10', excel: '"000"#' },
//         { value: '1000', excel: '"000"#' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 0,
//             thousandsSeparated: false,
//             leadingZeros: 3,
//             forceLeadingZeros: true,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// // Simple Numbers
// console.log("CHECK  Colours...")
// checkDetails(
//     detector.typeDetect([
//         { value: '5', excel: '[blue]#' },
//         { value: '10', excel: '[blue]#' },
//         { value: '1000', excel: '[blue]#' },
//     ]),
//     {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 0,
//             thousandsSeparated: false,
//             leadingZeros: 0,
//             forceLeadingZeros: false,
//             colours: [{colour: 'blue', condition: null}],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//     }
// )

// // Simple Numbers
// console.log("CHECK  Colours with conditions...")
// checkDetails(
//     detector.typeDetect([
//         { value: '5', excel: '[blue][>100][red][<100]#' },
//         { value: '10', excel: '[blue][>100][red][<100]#' },
//         { value: '1000', excel: '[blue][>100][red][<100]#' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 0,
//             thousandsSeparated: false,
//             leadingZeros: 0,
//             forceLeadingZeros: false,
//             colours: [{colour: 'blue', condition: '>100'}, {colour: 'red', condition: '<100'}],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: false
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// // // Simple Numbers
// // console.log("CHECK  Hide Zero Values...")
// // checkDetails(
// //     detector.typeDetect([
// //         { value: '5', excel: '0;–0;;@' },
// //         { value: '10', excel: '0;–0;;@' },
// //         { value: '1000', excel: '0;–0;;@' },
// //       ]),
// //       {
// //         type: 'excel',
// //         format: {
// //             dp: 0,
// //             fraction: false,
// //             scaleThousands: 0,
// //             thousandsSeparated: false,
// //             leadingZeros: 0,
// //             forceLeadingZeros: false,
// //             colours: [],
// //             hideZeroValues: true,
// //             hideAllValues: false,
// //             includesDateTime: false
// //         },
// //         prefix: '',
// //         postfix: '',
// //         dp: 0
// //       }
// // )

// // // Simple Numbers
// // console.log("CHECK  Hide All values...")
// // checkDetails(
// //     detector.typeDetect([
// //         { value: '5', excel: ';;;' },
// //         { value: '10', excel: ';;;' },
// //         { value: '1000', excel: ';;;' },
// //       ]),
// //       {
// //         type: 'excel',
// //         format: {
// //             dp: 0,
// //             fraction: false,
// //             scaleThousands: 0,
// //             thousandsSeparated: false,
// //             leadingZeros: 0,
// //             forceLeadingZeros: false,
// //             colours: [],
// //             hideZeroValues: false,
// //             hideAllValues: true,
// //             includesDateTime: false
// //         },
// //         prefix: '',
// //         postfix: '',
// //         dp: 0
// //       }
// // )

// // Simple Numbers
// console.log("CHECK  DateTime format")
// checkDetails(
//     detector.typeDetect([
//         { value: '5', excel: 'mm/dd/yy' },
//         { value: '10', excel: 'mm/dd/yy' },
//         { value: '1000', excel: 'mm/dd/yy' },
//       ]),
//       {
//         type: 'excel',
//         format: {
//             dp: 0,
//             fraction: false,
//             scaleThousands: 0,
//             thousandsSeparated: false,
//             leadingZeros: 0,
//             forceLeadingZeros: false,
//             colours: [],
//             hideZeroValues: false,
//             hideAllValues: false,
//             includesDateTime: true
//         },
//         prefix: '',
//         postfix: '',
//         dp: 0
//       }
// )

// console.log("Failed", failed, "of", total, "tests. See above for details");