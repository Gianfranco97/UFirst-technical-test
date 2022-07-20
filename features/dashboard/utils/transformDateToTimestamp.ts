import { EpaDateTime } from "features/dashboard/types";

export const transformDateToTimestamp = (date: EpaDateTime) => {
  return new Date(
    0,
    0,
    Number(date.day),
    Number(date.hour),
    Number(date.minute),
    Number(date.second)
  ).getTime();
};
