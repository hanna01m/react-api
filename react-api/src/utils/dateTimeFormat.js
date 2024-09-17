export const dateTimeFormat = (datetime) => {
  const date = new Date(datetime);

  const dateFormat = { year: "numeric", month: "2-digit", day: "2-digit" };
  const timeFormat = { hour: "2-digit", minute: "2-digit", hour12: false };

  const formattedDate = date.toLocaleDateString("sv-SE", dateFormat); // YYYY-MM-DD
  const formattedTime = date.toLocaleTimeString("sv-SE", timeFormat);

  return `${formattedDate} ${formattedTime}`;
};

export default dateTimeFormat;
