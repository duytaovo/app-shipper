import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date: any, newFormat: any) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date: any, newFormat: any) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: any) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: any) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export const formatTimeChat = (time: any) => {
  const options: any = { hour: "2-digit", minute: "2-digit" };
  return new Date(Number(time)).toLocaleString("en-US", options);
};

