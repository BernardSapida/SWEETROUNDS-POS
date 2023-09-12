import Placeholder from "react-bootstrap/Placeholder";

export default function Card(props: any) {
  return (
    <div
      className="p-3 text-white m-auto"
      style={{
        maxWidth: 310,
        minWidth: 280,
        width: "100%",
        borderRadius: 10,
        backgroundColor: props.color,
      }}
    >
      <p className="fs-6 lh-1 my-2" style={{ opacity: ".8" }}>
        {props.loading && (
          <Placeholder animation="glow">
            <Placeholder xs={6} style={{ borderRadius: 5 }} bg="light" />
          </Placeholder>
        )}
        {!props.loading && props.title}
      </p>
      <br />
      <p className="fs-2 lh-1 text-end mt-1 my-2">
        {props.loading && (
          <Placeholder animation="glow">
            <Placeholder xs={7} style={{ borderRadius: 5 }} bg="light" />
          </Placeholder>
        )}
        {!props.loading && props.value}
      </p>
      <p className="fs-6 lh-1 text-end my-2" style={{ opacity: ".8" }}>
        {props.loading && (
          <Placeholder animation="glow">
            <Placeholder xs={5} style={{ borderRadius: 5 }} bg="light" />
          </Placeholder>
        )}
        {!props.loading && props.date}
      </p>
    </div>
  );
}
