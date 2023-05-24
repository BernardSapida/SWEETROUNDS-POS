import DonutChart from "@/components/charts/DonutChart";

export default function ColumnGraph(props: any) {
  return (
    <>
      <p className="fs-5 lh-1 text-center">
        <strong>Sales by Customer Type</strong>
      </p>
      <DonutChart series={props.series} height="400" width="100%" />
    </>
  );
}
