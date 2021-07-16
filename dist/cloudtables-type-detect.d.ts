declare type TReturnType = 'date' | 'datetime' | 'time' | 'mixed' | 'string' | 'number' | 'html';
interface IDetails {
    dp: null | number;
    format: null | string;
    locale: null | string;
    postfix: null | string;
    prefix: null | string;
    type: null | TReturnType;
}
export default class TypeDetect {
    private decimalCharacter;
    private thousandsSeparator;
    private months;
    private abbrMonths;
    private days;
    private abbrDays;
    private postFixes;
    constructor(decimalCharacter?: string, thousandsSeparator?: string);
    /**
     * Detects the type and additional details from the overall data set.
     *
     * @param data The dataset to have a type detected
     * @returns string - the type that has been detected and any additional details for that type
     */
    typeDetect(data: any[]): IDetails;
    /**
     * Gets the actual type of the data as a string
     *
     * @param data The array of data to be processed
     * @param prefix Any prefix that has been detected within the dataset
     * @param postfix Any postfix that has been detected within the dataset
     * @returns string - the actual type of the data and occasionally the
     * format of the data in dates this is underscore separated
     */
    private _getType;
    /**
     * Determines a date format for a value that is passed in.
     * A big major condition here is that some combinations of tokens are not allowed.
     * For example, `2021 2021` will not be picked up as `YYYY YYYY` and
     * `2021 21` will not be picked up as `YYYY YY` Full details on this are provided in the readme
     * https://github.com/DataTables/Type-Detection#tokens
     *
     * @param el The potential date that is to have a value determined
     * @param suggestion The previously suggested format for other values in the same field
     * @returns the suggested format for the field
     */
    private _getDateFormat;
    /**
     * Determine whether to use a double or single token if there is a leading 0
     *
     * @param format The format object currently being constructed
     * @param idx The part number
     * @param a The first option if double token
     * @param b The second option if single token
     * @param has Any flag to be set
     * @returns the updated format
     */
    private _determineTokenFormat;
    /**
     * Set's all of the relevant values when a new token is determined
     *
     * @param format The format object currently being constructed
     * @param idx The part number
     * @param value The token to be set
     * @param definite Whether this is definitely the token's type
     * @param firm Whether this is the exact token
     * @param locale Optional, any locale that is associated with this value/token combination
     * @param has Any flag to be set
     * @returns the updated format
     */
    private _setDateFormat;
    /**
     * Identifies a common prefix amongst an array of data
     *
     * @param data The data that is to be parsed to determine a prefix
     * @returns string, the prefix that has been identified
     */
    private _getPrefix;
    /**
     * Identifies a common postfix amongst an array of data
     *
     * @param data The data that is to be parsed to determine a postfix
     * @returns string, the postfix that has been identified
     */
    private _getPostfix;
    /**
     * Identifies the highest number of decimal places within the dataset
     *
     * @param data The data that is to be parsed to determine the number of decimal places
     * @param postfix The datas postfix that is stripped from the data to accurately determine number of decimal places
     * @returns number, the highest number of decimal places in the entire dataset
     */
    private _getDP;
    private _getExcelDP;
}
export {};
