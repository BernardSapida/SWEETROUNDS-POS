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
      <p className="fs-5 lh-1 my-2" style={{ opacity: ".8" }}>
        {props.title}
      </p>
      <br />
      <p className="fs-2 lh-1 text-end mt-3 my-2">{props.value}</p>
      <p className="fs-6 lh-1 text-end my-2" style={{ opacity: ".8" }}>
        {props.date}
      </p>
    </div>
  );
}
