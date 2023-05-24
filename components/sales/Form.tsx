import Fade from "react-bootstrap/Fade";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useState } from "react";
import { generateExcel } from "@/utils/excel";
import {
  fetchWalkinRevenueByDay,
  fetchOnlineRevenueByDay,
  fetchWalkinTransactionByDay,
  fetchOnlineTransactionByDay,
  fetchWalkinAverageSaleByDay,
  fetchOnlineAverageSaleByDay,
  fetchCashierTransactionByDay,
  fetchWalkinRevenueByWeek,
  fetchOnlineRevenueByWeek,
  fetchWalkinTransactionByWeek,
  fetchOnlineTransactionByWeek,
  fetchWalkinAverageSaleByWeek,
  fetchOnlineAverageSaleByWeek,
  fetchCashierTransactionByWeek,
  fetchWalkinRevenueByMonth,
  fetchOnlineRevenueByMonth,
  fetchWalkinTransactionByMonth,
  fetchOnlineTransactionByMonth,
  fetchWalkinAverageSaleByMonth,
  fetchOnlineAverageSaleByMonth,
  fetchCashierTransactionByMonth,
  fetchNewCustomers,
  fetchLowQuantityDonut,
  fetchTop10Donuts,
  fetchDonutSale,
} from "@/helpers/sales_report";

export default function ModalForm(props: any) {
  const [report, setReport] = useState<string>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userRole } = props;

  const handleSubmit = async (event: any) => {
    let revenueRecord,
      transactionRecord,
      averageSaleRecord,
      newCustomersRecord,
      lowQuantityDonutRecord,
      top10DonutsRecord,
      donutSaleRecord,
      cashiertransactionRecord;

    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.target);
    const data: Record<string, any> = Object.fromEntries(formData.entries());

    if (data.report_by == "Day") {
      const walkinRevenue = await fetchWalkinRevenueByDay(data.day);
      const onlineRevenue = await fetchOnlineRevenueByDay(data.day);
      revenueRecord = [
        {
          "Walk-ins Revenue": walkinRevenue,
          "Online Revenue": onlineRevenue,
          "Total Revenue": walkinRevenue + onlineRevenue,
        },
      ];

      const walkinTransaction = await fetchWalkinTransactionByDay(data.day);
      const onlineTransaction = await fetchOnlineTransactionByDay(data.day);
      transactionRecord = [
        {
          "Walk-ins Transaction": walkinTransaction,
          "Online Transaction": onlineTransaction,
          "Total Transaction": walkinTransaction + onlineTransaction,
        },
      ];

      const walkinAverageSale = await fetchWalkinAverageSaleByDay(data.day);
      const onlineAverageSale = await fetchOnlineAverageSaleByDay(data.day);
      averageSaleRecord = [
        {
          "Walk-ins Average Sale": walkinAverageSale,
          "Online Average Sale": onlineAverageSale,
          "Overall Average Sale": (walkinAverageSale + onlineAverageSale) / 2,
        },
      ];

      cashiertransactionRecord = await fetchCashierTransactionByDay(data.day);
    } else if (data.report_by == "Week") {
      const [year, week] = data.week.split("-W");

      const walkinRevenue = await fetchWalkinRevenueByWeek(year, week);
      const onlineRevenue = await fetchOnlineRevenueByWeek(year, week);
      revenueRecord = [
        {
          "Walk-ins Revenue": walkinRevenue,
          "Online Revenue": onlineRevenue,
          "Total Revenue": walkinRevenue + onlineRevenue,
        },
      ];

      const walkinTransaction = await fetchWalkinTransactionByWeek(year, week);
      const onlineTransaction = await fetchOnlineTransactionByWeek(year, week);
      transactionRecord = [
        {
          "Walk-ins Transaction": walkinTransaction,
          "Online Transaction": onlineTransaction,
          "Total Transaction": walkinTransaction + onlineTransaction,
        },
      ];

      const walkinAverageSale = await fetchWalkinAverageSaleByWeek(year, week);
      const onlineAverageSale = await fetchOnlineAverageSaleByWeek(year, week);
      averageSaleRecord = [
        {
          "Walk-ins Average Sale": walkinAverageSale,
          "Online Average Sale": onlineAverageSale,
          "Overall Average Sale": (walkinAverageSale + onlineAverageSale) / 2,
        },
      ];

      cashiertransactionRecord = await fetchCashierTransactionByWeek(
        year,
        week
      );
    } else {
      const [year, month] = data.month.split("-");

      const walkinRevenue = await fetchWalkinRevenueByMonth(year, month);
      const onlineRevenue = await fetchOnlineRevenueByMonth(year, month);
      revenueRecord = [
        {
          "Walk-ins Revenue": walkinRevenue,
          "Online Revenue": onlineRevenue,
          "Total Revenue": walkinRevenue + onlineRevenue,
        },
      ];

      const walkinTransaction = await fetchWalkinTransactionByMonth(
        year,
        month
      );
      const onlineTransaction = await fetchOnlineTransactionByMonth(
        year,
        month
      );
      transactionRecord = [
        {
          "Walk-ins Transaction": walkinTransaction,
          "Online Transaction": onlineTransaction,
          "Total Transaction": walkinTransaction + onlineTransaction,
        },
      ];

      const walkinAverageSale = await fetchWalkinAverageSaleByMonth(
        year,
        month
      );
      const onlineAverageSale = await fetchOnlineAverageSaleByMonth(
        year,
        month
      );
      averageSaleRecord = [
        {
          "Walk-ins Average Sale": walkinAverageSale,
          "Online Average Sale": onlineAverageSale,
          "Overall Average Sale": (walkinAverageSale + onlineAverageSale) / 2,
        },
      ];

      cashiertransactionRecord = await fetchCashierTransactionByMonth(
        year,
        month
      );
    }

    newCustomersRecord = await fetchNewCustomers();
    lowQuantityDonutRecord = await fetchLowQuantityDonut();
    top10DonutsRecord = await fetchTop10Donuts();
    donutSaleRecord = await fetchDonutSale();

    generateExcel(
      revenueRecord,
      transactionRecord,
      averageSaleRecord,
      newCustomersRecord,
      lowQuantityDonutRecord,
      top10DonutsRecord,
      donutSaleRecord,
      cashiertransactionRecord
    );

    setLoading(false);
  };

  const handleCategoryInput = (event: any) => {
    setReport(event.target.value);
  };

  return (
    <>
      <Fade in={open} appear={true} unmountOnExit={true}>
        <div className="py-3 px-3 mb-3 rounded bg-success text-white">
          Sales report successfully generated!
        </div>
      </Fade>
      <Form onSubmit={handleSubmit} id="modalForm">
        <Form.Group className="mb-3">
          <Form.Label>
            Generate report by <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="report_by"
            onChange={handleCategoryInput}
            value={report}
            disabled={loading || userRole !== "Manager"}
            required
          >
            <option value="">-- Choose an option --</option>
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            {/* <option value="Year">Year</option> */}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          {report && (
            <Form.Label>
              Choose date <span className="text-danger">*</span>
            </Form.Label>
          )}
          {report === "Day" && (
            <Form.Control
              type="date"
              name="day"
              placeholder="day"
              disabled={loading}
              required
            />
          )}
          {report === "Week" && (
            <Form.Control
              type="week"
              name="week"
              placeholder="Week"
              disabled={loading}
              required
            />
          )}
          {report === "Month" && (
            <Form.Control
              type="month"
              name="month"
              placeholder="Month"
              disabled={loading}
              required
            />
          )}
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            type="submit"
            form="modalForm"
            disabled={loading || userRole !== "Manager"}
          >
            {!loading && "Generate Report"}
            {loading && (
              <>
                <Spinner as="span" size="sm" role="status" aria-hidden="true" />
                <span>&nbsp; Generating report...</span>
              </>
            )}
          </Button>
        </div>
      </Form>
    </>
  );
}
