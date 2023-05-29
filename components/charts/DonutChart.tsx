import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import React from "react";

const DonutChart = (props: any) => {
  const chartOptions: ApexCharts.ApexOptions = {
    series: props.series,
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#EB4886", "#6E54BC"],
    fill: {
      colors: ["#EB4886", "#6E54BC"],
    },
    legend: {
      show: true,
      position: "bottom",
      formatter: function (seriesName, opts) {
        return seriesName + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    labels: ["Online Orders", "Walk-Ins"],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return Math.floor(val) + "%";
      },
    },
  };

  return (
    <ReactApexChart
      type="donut"
      series={props.series}
      options={chartOptions}
      height={props.height}
      width={props.width}
    />
  );
};

export default DonutChart;
