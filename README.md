# Type-Detection
This Library provieds raw data type detection for Numbers, HTML, Dates and Strings. It was created with 	
&#10084; by the [CloudTables](https://cloudtables.com) team.

## Install
Install from npm by using

```bash
npm install @datatables/type-detector
```
## Usage
### ES3
```js
var TypeDetect = require('@datatables/type-detector');

var detector = new TypeDetect["default"]();

var type = detector.typeDetect(dataArray);
```
### ES6
```ts
import TypeDetect from '@datatables/type-detector';

let detector = new TypeDetect();

let type = detector.typeDetect(dataArray);
```

Where `dataArray` is a single dimensional array of data who's type is to be detected.

The constructor takes 2 optional parameters as follows.
| Parameter | Default | Description |
|:---------:|:-------:|:-----------:|
| `decimalCharacter` | `'.'` | This is used when determining the number of decimal places that a number has. |
| `thousandsSeparator` | `','` | This is removed from strings when attempting to determine a number type. |
## Return Format
The following object is returned from the `detector.typeDetect(dataArray)` call mentioned above. If a given property is not relevant to the type that has been detected then it is set to null.
```
{
	type: null | string;
	format: null | string;
	locale: null | string;
	prefix: null | string;
	postfix: null | string;
	dp: null | number;
}
```

| Property | Description |
|:--------:|:-----------:|
| `type`   | The type that has been determined for the data. |
| `format` | If a date has been detected as the type then this property is set to the moment format of that date. |
| `locale` | If a date has been detected then this property is set to store the locale of that date. |
| `prefix` | If numeric data has been detected then any common prefix across the entire data set is stored on this property. |
| `postfix`| If numeric data has been detected then any common postfix across the entire data set is stored on this property. |
| `dp`     | If numeric data has been detected then the largest number of decimal places present within the data set is stored on this property. |
## Detectable Types

The following types can be detected by the Type-Detection library. They are listed here in the order that identification is attempted in.

### Excel
CloudTables allows the importing of data from excel sheets. When this occurs the data that is read in has both a value and a format within an object.
> `[{ value: 1.1, excel: '#.#'}, { value: 2.5, excel: '#.#'}, { value: 3.6, excel: '#.#'}]`

The data within this set is numeric, and therefore the type returned will be number. The `dp`, `prefix` and `postfix` properties are also determined using a combination of the `value` and `excel` properties. [This page](https://support.microsoft.com/en-us/office/number-format-codes-5026bbd6-04bc-48cd-bf33-80f18b4eae68) is useful for understanding the different formats that excel can create.

Excel imports can also include dates, in which case a format is also set in the `excel` property. In this case the date detection methods implemented within this library are used as the excel date formats are different to the moment formats that Cloudtables uses.

Strings and can also be determined from excel data.
### Numbers
The Type-Detection library is capable of identifying a variety of formats of numbers.

* JS numbers (`100`)
* Numeric Strings (`'100'`)
* Numeric Strings with a prefix, such ascurrency (`'$100'`)
* Numeric Strings with a postfix, such as a unit (`'100 cm'`)
* Numeric Strings with both a prefix and a postfix (`'$100 per month'`)
* All of the above with decmial places, `'.'` by default (`100.5, '100.5', '$100.50', '100.5 cm', '$100.50 per month'`)
* All of the above (except JS Numbers) with a thousands separator, `','` by default (`'100,000.5', '$100,000.50', '100,000.5 cm', '$100,000.50 per month'`)

There is no limit to the size of prefixes or postfixes.

### HTML
To determine HTML the string inputs are checked against the following Regular Expression...

> `/<(“[^”]*”|'[^’]*’|[^'”>])*>/g`

A data set does not need to be solely comprised of html code to get the html type. If there are also strings present then an html type can be returned.
### Dates
Moment is used to aid in the detection of dates and their formats. Any date containing the following tokens can be detected, but each token should only be used once in the field.

#### Tokens
| Token | Description | Example | Extra Notes |
|:-----:|:-----------:|:-------:|:-----------:|
| YYYY  | Full Year | 2020, 2021 | Cannot be used with YY |
| YY    | Short Year | 20, 21 | Cannot be used with YYYY |
| MMMM  | Full Month | January, February | Cannot be used with MMM, MM, M |
| MMM   | Abbreviated Month | Jan, Feb | Cannot be used with MMMM, MM, M |
| MM    | Month as Number | 01, 02 | Cannot be used with MMMM, MMM, M |
| M     | Month as Short Number | 1, 2 | Cannot be used with MMMM, MMM, MM |
| DD    | Day as Number | 01, 02 | Cannot be used with D, Do |
| D     | Day as Short Number | 1, 2 | Cannot be used with DD, Do |
| Do    | Day with Postfix | 1st, 2nd | Cannot be used with DD, D |
| dddd  | Day of the Week | Monday, Tuesday | Cannot be used with ddd |
| ddd   | Abbreviated Day of the Week | Mon, Tue | Cannot be used with dddd |
| HH    | 24 Hour | 01, 02, ..., 23 | Cannot be used with H, hh, h. If used with A or a will become h |
| H     | 24 Hour Short | 1, 2, ..., 23 | Cannot be used with HH, hh, h. If used with A or a will become h |
| hh    | 12 Hour | 01, 02, ..., 12 | Cannot be used with HH, H, h |
| h     | 12 Hour Short | 1, 2, ..., 12 | Cannot be used with HH, H, hh |
| mm    | Minutes | 01, 02, ..., 59 | Cannot be used with m |
| m     | Minutes Short | 1, 2, ..., 59 | Cannot be used with mm |
| ss    | Seconds | 01, 02, ..., 59 | Cannot be used with s |
| s     | Seconds Short | 1, 2, ..., 59 | Cannot be used with ss |
| A     | AM/PM in Capitals | AM, PM | Cannot be used with HH, H |
| a     | am/pm in lower case | am, pm | Cannot be used with HH, H |

#### Some Examples
The date detection segment will always return one of the following.
* A moment format - in this case a date has been succesfully identified with a consistent format.
* A mixed type - in this case multiple different date formats have been identified.
* null - no dates could be identified and other types will be checked.

Consider the following array of data.
> `['Thursday 1st Oct, 2020 11:12:47 AM','Sunday 17th Oct, 1999 10:56:07 PM','Friday 3rd Jan, 2025 9:02:00 AM']`

The moment format that is detected is `dddd Do MMM, YYYY h:mm:ss A`, which is correct. Some changes can be made to this data to create ambiguity in the format that is used. If the AM/PM part of the dates is removed as follows...

> `['Thursday 1st Oct, 2020 11:12:47','Sunday 17th Oct, 1999 10:56:07','Friday 3rd Jan, 2025 9:02:00']`

Now the moment format that is returned is `dddd Do MMM, YYYY H:mm:ss`, Notice the change from 12 hours (h) to 24 hours (H). In this case either token is valid, H is selected as it allows more flexibility if more data is added in the future.

There are a number of cases such as the above where some ambiguity is present - this is why there isn't a pre-existing type detection library in common use. A common example that is used is...
> `['10/10/10', '11/11/11', '12/12/12']`

There isn't a definitive way to derive a format for these tokens, instead a good guess is taken. The moment format that is produced in this case is `M/D/Y` which again is valid, but it could be `MM/DD/YY`, `YY/MM/DD` , `YY/D/M` or a whole variety of combinations of the Day, Month and Year. The best that can be done in situations like these is to take a guess with a format that is valid for the entire set.

When it comes to dates in the above format where certainty is not guaranteed the order of priority is Months > Days > Years.

When it comes to time the order of priority is Hours > Minutes > Seconds.

#### Locales
Differnet locales can also be detected where the tokens are strings rather than numbers (`Do`, `dddd` etc.). The languages that are currently integrated are 
* English (default)
* German
* French
* Spanish

As with other elements of date detection, where a single locale cannot be determined, one will be selected that can apply to all of the data in the set.

The detection of locales is completed using [a series of Regular Expressions](https://github.com/DataTables/Type-Detection/blob/main/src/cloudtables-type-detect.ts#L45-L74). These are iterated over in an attempt to find matches.
### Mixed
If multiple different types are detected across the entire dataset then a mixed type is returned. This type will also be returned if there are dates with multiple different formats.

Note. The only exception to the mixed rule is a combination of strings and html. In this case a type of html will be returned.
### Strings

If no other type can be detected then the type defaults to string.

## Performance
The library has been tested with a data set 10,000 elements in length for each type that can be detected. The response times achieved were around 10-20 ms for most types. The exception to this was complex date formats where the response time increased to around 400 ms.

Pull requests are welcome and encouraged to increase the performance of the library.