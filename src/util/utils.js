import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// alphanumeric sort
export function sortToggle(arr, key, order) {
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });
  if (arr) {
    return arr.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      if (order === 'asc') {
        return collator.compare(x, y);
      }
      if (order === 'desc') {
        return collator.compare(x, y) * -1;
      }
      if (order === '') {
        return Math.random() - 0.5;
      }
    });
  }
}


export const exportTableToExcel = (apiData, fileName) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(apiData);
  const wb = {Sheets: {data: ws}, SheetNames: ['data']};
  const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
  const data = new Blob([excelBuffer], {type: fileType});
  FileSaver.saveAs(data, fileName + fileExtension);
}
