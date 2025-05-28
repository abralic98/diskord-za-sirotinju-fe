import { format, isValid } from "date-fns";

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "invalid date";

  const parsedDate = new Date(dateString);

  if (!isValid(parsedDate)) return "invalid date";

  return format(parsedDate, "dd/MM/yyyy HH:mm");
}

//backend should give normal date this is temporary fix for websockets
export function formatWSDate(dateString?: string | null): string {
  if (!dateString) return "invalid date";

  const parts = dateString.split(" ");
  if (parts.length !== 6) return "invalid date";

  const day = parts[2];
  const time = parts[3].slice(0, 5); // "16:31"
  const year = parts[5];

  const monthMap: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const month = monthMap[parts[1]];
  if (!month) return "invalid date";

  return `${day.padStart(2, "0")}/${month}/${year} ${time}`;
}
