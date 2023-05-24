export function getLastDayOfMonth() {
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return lastDayOfMonth.getDate();
}

export function date(date: string | Date | null = null) {
  date = date ? new Date(date) : new Date();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getCurrentMonth() {
  const months = [
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
  ];
  const date = new Date();
  const currentMonth = months[date.getMonth()];

  return currentMonth;
}

export function getDay() {
  return new Date().getDay();
}

export function getYear() {
  return new Date().getFullYear();
}

export function getMonth() {
  return new Date().getMonth() + 1;
}

export function getMonthWeeks() {
  // Get the input date
  const inputDate = new Date(Date.now()); // change the date to your desired input date

  // Create a new date object with the same year as the input date, and January 1st as the date
  const startOfYear = new Date(inputDate.getFullYear(), 0, 1);

  // Calculate the difference between the input date and the start of the year in milliseconds
  const diffInMs = Number(inputDate) - Number(startOfYear);

  // Convert the difference to days
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Calculate the week number
  const weekNumber = Math.ceil((diffInDays + 1) / 7);

  // Output the week number
  return weekNumber;
}

export function getDate(date: string | Date | null = null) {
  date = date ? new Date(date) : new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
