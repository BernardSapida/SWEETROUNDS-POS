import React from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  fill: {
    colors: undefined,
    opacity: 1,
    type: "gradient",
    gradient: {
      shadeIntensity: 0,
      opacityFrom: 1,
      opacityTo: 0,
      stops: [70, 100],
      type: "vertical",
      colorStops: [
        [
          {
            offset: 50,
            color: "#F9B15D",
            opacity: 50,
          },
        ],
      ],
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      borderRadius: 5,
      dataLabels: {
        position: "none",
        total: {
          enabled: true,
          style: {
            fontSize: "10px",
          },
        },
      },
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  legend: {
    position: "right",
    offsetY: 40,
  },
};

const ColumnChart = (props: any) => {
  return (
    <ReactApexChart
      type="bar"
      series={props.data}
      options={chartOptions}
      height={props.height}
      width={props.width}
    />
  );
};

export default ColumnChart;
