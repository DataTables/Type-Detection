interface IDetails {
    type: null | string;
    format: null | string | object;
    locale: null | string;
    prefix: null | string;
    postfix: null | string;
    dp: null | number;
}
export default class typeDetect {
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
     * @param data The dataset to have a type detected
     * @returns string - the type that has been detected and any additional details for that type
     */
    typeDetect(data: any[]): IDetails;
    /**
     * Gets the actual type of the data as a string
     * @param data The array of data to be processed
     * @param prefix Any prefix that has been detected within the dataset
     * @param postfix Any postfix that has been detected within the dataset
     * @returns string - the actual type of the data
     */
    private _getType;
    /**
     * Determines a date format for a value that is passed in.
     * @param el The potential date that is to have a value determined
     * @param suggestion The previously suggested format for other values in the same field
     * @returns the suggested format for the field
     */
    private _getDateFormat;
    /**
     * Determine whether to use a double or single token if there is a leading 0
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
    private _getPrefix;
    private _getPostfix;
    private _getDP;
    private _getExcelDP;
}
export {};
