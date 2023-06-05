import Placeholder from "react-bootstrap/Placeholder";
import DonutChart from "@/components/charts/DonutChart";

export default function ColumnGraph({
  series,
  loading,
}: {
  series: number[];
  loading: boolean;
}) {
  return (
    <>
      <p className="fs-5 lh-1 text-center">
        {loading && (
          <Placeholder as="p" animation="glow">
            <Placeholder xs={7} style={{ borderRadius: 5 }} bg="dark" />
          </Placeholder>
        )}
        {!loading && <strong>Sales by Customer Type</strong>}
      </p>
      {loading && (
        <div className="d-grid">
          <Placeholder className="m-auto" animation="glow">
            <Placeholder
              style={{
                width: 400,
                height: 400,
                borderRadius: 200,
                backgroundColor: "#6E54BC",
              }}
            />
          </Placeholder>
        </div>
      )}
      {!loading && <DonutChart series={series} height="400" width="100%" />}
    </>
  );
}
