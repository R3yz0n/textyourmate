function formatTimeFromDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date");
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Add leading zero if needed
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
}

// Example usage:
const currentDate = new Date(); // Replace this with your actual date
const formattedTime = formatTimeFromDate(currentDate);
console.log(formattedTime);
