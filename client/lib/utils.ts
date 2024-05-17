import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeSeter = (time: Date) => {
  const update = new Date(time).getTime();
  const current = new Date().getTime();
  return (current - update) / (1000 * 60) < 60
    ? `${Math.round((current - update) / (1000 * 60))} min ago`
    : (current - update) / (1000 * 60 * 60) < 24
    ? `${Math.round((current - update) / (1000 * 60 * 60))} hours ago`
    : (current - update) / (1000 * 60 * 60 * 24) < 7
    ? `${moment(time).format("dddd")}`
    : `${moment(time).format("l")}`;
};
