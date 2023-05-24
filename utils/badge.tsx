export const getBadgeColor = (status: string) => {
  let color;

  if (
    status === "Active" ||
    status === "Online" ||
    status == "Available" ||
    status === "Completed"
  )
    color = "success";
  else if (status === "Pending" || status === "Offline") color = "dark";
  else if (status === "Processing") color = "warning";
  else if (status === "Shipped") color = "primary";
  else if (
    status === "Inactive" ||
    status === "Not Available" ||
    status === "Not Completed" ||
    status === "Cancelled"
  )
    color = "danger";

  return color;
};
