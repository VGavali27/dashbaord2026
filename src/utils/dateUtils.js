// src/utils/dateUtils.js

/**
 * Formats a given date to "dd-MMM-yyyy, hh:mm:ss a" format (with AM/PM).
 * @param {string | Date} dateValue - The date to format (can be a string or Date object).
 * @param {string} timezone - The timezone to use for formatting.
 * @returns {string} The formatted date-time string.
 */
export function formatDateTime(dateValue, timezone) {
  if (!dateValue) return "-"; // Return "-" if no date is provided.

  const date = new Date(dateValue);

  return date.toLocaleString("en-IN", {
    timeZone: timezone, // Use provided timezone
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // To display AM/PM
  });
}

export function formatDateInput(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getMonthRange(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const format = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  return {
    from_date: format(start),
    to_date: format(end),
  };
}