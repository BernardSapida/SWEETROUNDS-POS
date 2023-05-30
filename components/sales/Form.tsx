import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";

import { getInitialValues, validationSchema } from "@/helpers/SalesReport/Form";
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
} from "@/helpers/SalesReport/Methods";

import Field from "@/components/form/InputField";

export default function ModalForm({ userRole }: { userRole: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = getInitialValues();

  const displayAlertMessage = () => {
    Swal.fire({
      icon: "success",
      title: "Report is generating...",
      text: "Please wait for the report to be generated",
    });
  };

  const handleSubmit = async (
    values: {
      report_by: string;
      day: string;
      week: string;
      month: string;
    },
    { resetForm }: { resetForm: any }
  ) => {
    let revenueRecord,
      transactionRecord,
      averageSaleRecord,
      newCustomersRecord,
      lowQuantityDonutRecord,
      top10DonutsRecord,
      donutSaleRecord,
      cashiertransactionRecord;

    if (!values.day && !values.week && !values.month) return;

    setLoading(true);

    if (values.report_by == "Day") {
      const walkinRevenue = await fetchWalkinRevenueByDay(values.day);
      const onlineRevenue = await fetchOnlineRevenueByDay(values.day);
      revenueRecord = [
        {
          "Walk-ins Revenue": walkinRevenue,
          "Online Revenue": onlineRevenue,
          "Total Revenue": walkinRevenue + onlineRevenue,
        },
      ];

      const walkinTransaction = await fetchWalkinTransactionByDay(values.day);
      const onlineTransaction = await fetchOnlineTransactionByDay(values.day);
      transactionRecord = [
        {
          "Walk-ins Transaction": walkinTransaction,
          "Online Transaction": onlineTransaction,
          "Total Transaction": walkinTransaction + onlineTransaction,
        },
      ];

      const walkinAverageSale = await fetchWalkinAverageSaleByDay(values.day);
      const onlineAverageSale = await fetchOnlineAverageSaleByDay(values.day);
      averageSaleRecord = [
        {
          "Walk-ins Average Sale": walkinAverageSale,
          "Online Average Sale": onlineAverageSale,
          "Overall Average Sale": (walkinAverageSale + onlineAverageSale) / 2,
        },
      ];

      cashiertransactionRecord = await fetchCashierTransactionByDay(values.day);
    } else if (values.report_by == "Week") {
      const [year, week] = values.week.split("-W");

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
      const [year, month] = values.month.split("-");

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

    displayAlertMessage();
    setLoading(false);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit} id="reportForm">
            <FloatingLabel className="mb-3" label="Generate report by">
              <Form.Select
                name="report_by"
                onChange={handleChange}
                value={values.report_by}
                disabled={loading || userRole !== "Manager"}
              >
                <option value="">-- Choose an option --</option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                {/* <option value="Year">Year</option> */}
              </Form.Select>
              <ErrorMessage
                name="report_by"
                component="p"
                className="text-danger"
              />
            </FloatingLabel>
            <Form.Group className="mb-3">
              {values.report_by === "Day" && (
                <>
                  <Field
                    type="date"
                    name="day"
                    label="Day"
                    handleChange={handleChange}
                    value={values.day}
                    loading={loading}
                  />
                  <p className="text-danger">
                    {!values.day && "Day is required"}
                  </p>
                </>
              )}
              {values.report_by === "Week" && (
                <>
                  <Field
                    type="week"
                    name="week"
                    label="Week"
                    handleChange={handleChange}
                    value={values.week}
                    loading={loading}
                  />
                  <p className="text-danger">
                    {!values.week && "Week is required"}
                  </p>
                </>
              )}
              {values.report_by === "Month" && (
                <>
                  <Field
                    type="month"
                    name="month"
                    label="Month"
                    handleChange={handleChange}
                    value={values.month}
                    loading={loading}
                  />
                  <p className="text-danger">
                    {!values.month && "Month is required"}
                  </p>
                </>
              )}
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                type="submit"
                form="reportForm"
                disabled={loading || userRole !== "Manager"}
              >
                {!loading && "Generate Report"}
                {loading && (
                  <>
                    <Spinner
                      as="span"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span>&nbsp; Generating report...</span>
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
