import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const generateExcel = (
  revenueRecord: Array<Record<string, any>>,
  transactionRecord: Array<Record<string, any>>,
  averageSaleRecord: Array<Record<string, any>>,
  newCustomersRecord: Array<Record<string, any>>,
  lowQuantityDonutRecord: Array<Record<string, any>>,
  top10DonutsRecord: Array<Record<string, any>>,
  donutSaleRecord: Array<Record<string, any>>,
  cashiertransactionRecord: Array<Record<string, any>>
) => {
  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();

  createRevenueReport(workbook, XLSX, revenueRecord);
  createTransactionReport(workbook, XLSX, transactionRecord);
  createAverageSaleReport(workbook, XLSX, averageSaleRecord);
  createNewCustomerReport(workbook, XLSX, newCustomersRecord);
  createLowQuantityDonutReport(workbook, XLSX, lowQuantityDonutRecord);
  createTop10DonutsReport(workbook, XLSX, top10DonutsRecord);
  createDonutSaleReport(workbook, XLSX, donutSaleRecord);
  createCashierTransaction(workbook, XLSX, cashiertransactionRecord);

  // Convert the workbook to a binary Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Create a Blob from the buffer
  const excelBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Save the Blob as a file
  saveAs(excelBlob, "sales_report.xlsx");
};

const createRevenueReport = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  revenueRecord: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(revenueRecord);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue Report");
};

const createTransactionReport = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  transactionRecord: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(transactionRecord);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction Report");
};

const createAverageSaleReport = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  averageSaleRecord: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(averageSaleRecord);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Average Sales Report");
};

const createNewCustomerReport = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  newCustomersRecord: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(newCustomersRecord);
  XLSX.utils.book_append_sheet(workbook, worksheet, "New Customers Report");
};

const createLowQuantityDonutReport = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  lowQuantityDonutRecord: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(lowQuantityDonutRecord);
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Low Quantity Donuts Report"
  );
};

const createTop10DonutsReport = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  top10DonutsRecord: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(top10DonutsRecord);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Top 10 Donuts Report");
};

const createDonutSaleReport = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  donutSaleRecord: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(donutSaleRecord);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Donuts Sale Report");
};

const createCashierTransaction = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  cashiertransactionRecord: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(cashiertransactionRecord);
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Cashier Transaction Report"
  );
};
