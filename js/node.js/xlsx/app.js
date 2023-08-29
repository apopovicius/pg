const XLSX = require('xlsx');
const fs = require('fs').promises;
const path = require('path');

const data = {
    header: ['Name', 'Age', 'City'],
    rows: [
        { City: 'La', Name: 'Phil King', Age: 61 },
        { Name: 'John Doe', Age: 25, City: 'New York' },
        { Name: 'Jane Smith', Age: 35, City: 'San Francisco' },
        { Name: 'Bob Johnson', Age: 42, City: 'Chicago' },
        { Age: 54, Name: 'Mark Twin', City: 'Boston' },
        { City: 'Boston' },
        { Age: 61 },
    ],
};

const data2 = {
    header: ['Name', 'Age', 'City'],
    rows: [{ Name: 'JTohe', Age: 255, City: 'FSD' }],
};

function worksheetToJson(worksheet) {
    return XLSX.utils.sheet_to_json(worksheet, { raw: false });
}

function jsonToSheet(rows, header) {
    return XLSX.utils.json_to_sheet(rows, { header: header });
}

async function readWorkbook(workbookPath) {
    let workbook;
    try {
        const existingWorkbookBuffer = await fs.readFile(
            path.join(__dirname, workbookPath)
        );
        workbook = XLSX.read(existingWorkbookBuffer, { type: 'buffer' });
    } catch (err) {
        workbook = XLSX.utils.book_new();
    }
    return workbook;
}

async function readWorksheet(workbookPath, sheetName) {
    const workbook = await readWorkbook(workbookPath);
    const json = worksheetToJson(workbook.Sheets[sheetName]);
    return json;
}

async function writeWorksheetData(workbookPath, sheetName, data) {
    let workbook = await readWorkbook(workbookPath);

    // check if worksheet already exists
    if (workbook.SheetNames.indexOf(sheetName) !== -1) {
        // worksheet already exists, append data to existing sheet
        const worksheet = workbook.Sheets[sheetName];
        const existingData = worksheetToJson(worksheet);
        existingData.push(...data.rows);
        const updatedWorksheet = jsonToSheet(existingData, data.header);
        workbook.Sheets[sheetName] = updatedWorksheet;
    } else {
        // worksheet doesn't exist, create new sheet with data
        const worksheet = jsonToSheet(data.rows, data.header);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    // write workbook to file
    const buffer = XLSX.write(workbook, { type: 'buffer' });
    await fs.writeFile(workbookPath, buffer);
}

async function test() {
    try {
        await writeWorksheetData('test.xlsx', 'This is a test', data);
        await writeWorksheetData('test.xlsx', 'This is a test', data2);
        let json = await readWorksheet('test.xlsx', 'This is a test 2');
        console.log(json);
    } catch (err) {
        throw err;
    }
}

test();
