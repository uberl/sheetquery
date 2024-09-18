/// <reference types="google-apps-script" />
export type { Spreadsheet, Sheet } from 'gasmask/src/SpreadsheetApp';
/**
 * Run new sheet query
 *
 * @param {Spreadsheet} activeSpreadsheet Specific spreadsheet to use, or will use SpreadsheetApp.getActiveSpreadsheet() if undefined\
 * @return {SheetQueryBuilder}
 */
export declare function sheetQuery(activeSpreadsheet?: any): SheetQueryBuilder;
export declare type DictObject = {
    [key: string]: any;
};
export declare type RowObject = {
    [key: string]: any;
    __meta: {
        row: number;
        cols: number;
    };
};
export declare type WhereFn = (row: RowObject) => boolean;
export declare type UpdateFn = (row: RowObject) => RowObject;
/**
 * SheetQueryBuilder class - Kind of an ORM for Google Sheets
 */
export declare class SheetQueryBuilder {
    activeSpreadsheet: any;
    columnNames: string[];
    sheetName: string | undefined;
    headingRow: number;
    whereFn: WhereFn | undefined;
    _sheet: any;
    _sheetValues: any;
    _sheetHeadings: string[];
    constructor(activeSpreadsheet?: any);
    select(columnNames: string | string[]): SheetQueryBuilder;
    /**
     * Name of spreadsheet to perform operations on
     *
     * @param {string} sheetName
     * @param {number} headingRow
     * @return {SheetQueryBuilder}
     */
    from(sheetName: string, headingRow?: number): SheetQueryBuilder;
    /**
     * Apply a filtering function on rows in a spreadsheet before performing an operation on them
     *
     * @param {Function} fn
     * @return {SheetQueryBuilder}
     */
    where(fn: WhereFn): SheetQueryBuilder;
    /**
     * Get Sheet object that is referenced by the current query from() method
     *
     * @return {Sheet}
     */
    getSheet(): GoogleAppsScript.Spreadsheet.Sheet;
    /**
     * Get values in sheet from current query + where condition
     */
    getValues(): any;
    /**
     * Return matching rows from sheet query
     *
     * @return {RowObject[]}
     */
    getRows(): RowObject[];
    /**
     * Get array of headings in current sheet from()
     *
     * @return {string[]}
     */
    getHeadings(): string[];
    /**
     * Get all cells from a query + where condition
     * @returns {any[]}
     */
    getCells(): any[];
    /**
     * Get cells in sheet from current query + where condition and from specific header
     * @param {string} key name of the column
     * @param {Array<string>} [keys] optionnal names of columns use to select more columns than one
     * @returns {any[]} all the colum cells from the query's rows
     */
    getCellsWithHeadings(key: string, headings: Array<string>): any[];
    /**
     * Insert new rows into the spreadsheet
     * Arrays of objects like { Heading: Value }
     *
     * @param {DictObject[]} newRows - Array of row objects to insert
     * @return {SheetQueryBuilder}
     */
    insertRows(newRows: DictObject[]): SheetQueryBuilder;
    /**
     * Delete matched rows from spreadsheet
     *
     * @return {SheetQueryBuilder}
     */
    deleteRows(): SheetQueryBuilder;
    /**
     * Update matched rows in spreadsheet with provided function
     *
     * @param {UpdateFn} updateFn
     * @return {SheetQueryBuilder}
     */
    updateRows(updateFn: UpdateFn): SheetQueryBuilder;
    /**
     * Update single row
     */
    updateRow(row: any, updateFn: UpdateFn): SheetQueryBuilder;
    /**
     * Clear cached values, headings, and flush all operations to sheet
     *
     * @return {SheetQueryBuilder}
     */
    clearCache(): SheetQueryBuilder;
}
