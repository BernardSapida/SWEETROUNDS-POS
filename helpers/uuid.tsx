export function generateUUID() {
  const timestamp = Date.now().toString(); // Get current timestamp as a string
  const randomNum = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const invoiceId = timestamp + randomNum.toString().padStart(4, "0"); // Combine timestamp and random number

  return invoiceId;
}
