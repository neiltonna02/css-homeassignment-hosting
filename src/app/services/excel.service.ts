import { Injectable } from '@angular/core';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const extension = '.xlsx';

@Injectable()
export class ExcelService {

    constructor() {}

    //Exporting as an Excel file
    public export(json: any[], excelFileName: string): void
    {
        //Creating the worksheet
        const excelWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

        //Creating the workbook
        const excelWorkbook: XLSX.WorkBook = { Sheets: { 'data': excelWorksheet }, SheetNames: ['data'] };

        //Creating the buffer for writing
        const excelBufferWrite: any = XLSX.write(excelWorkbook, { bookType: 'xlsx', type: 'array' });

        //Saving the file
        this.save(excelBufferWrite, excelFileName);
    }

    //Saving the Excel file
    private save(buffer: any, fileName: string): void
    {
        //Creating a blob (blobs are used to hold multimedia objects to be added to a database)
        const data: Blob = new Blob([buffer], {type: type});

        //Saving the file by the given file name with the current seconds passed from 1970 (so that it will be unique) and its extension, and writing the given data to it
        fileSaver.saveAs(data, fileName + "_" + new  Date().getTime() + extension);
    }
}