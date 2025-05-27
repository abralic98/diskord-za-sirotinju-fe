import { parse, format, isValid } from "date-fns";

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "invalid date";

  let parsedDate = parse(dateString, "yyyy-MM-dd HH:mm:ss.SSS", new Date());

  if (!isValid(parsedDate)) {
    parsedDate = new Date(dateString);

    if (!isValid(parsedDate)) {
      return "invalid date";
    }
  }

  return format(parsedDate, "dd/MM/yyyy HH:mm");
}
