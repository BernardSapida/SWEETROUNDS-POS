export function numberFormat(amount: number | string): string {
  const formattedAmount = Number(amount).toLocaleString("en-US", {
    style: "decimal",
  });
  return formattedAmount;
}
