import { format, parse } from "date-fns";

export function formatDate(dateString?: string): string {
  if (!dateString) return "invalid date";
  const parsedDate = parse(dateString, "yyyy-MM-dd HH:mm:ss.SSS", new Date());
  return format(parsedDate, "dd/MM/yyyy HH:mm");
}
