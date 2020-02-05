import { set, format } from "date-fns";
import http from "./httpService";

const apiEndpoint = "/schedules";

export function populateWorkingHours(date) {
  const from = 8;
  const to = 21;
  const workingHours = [];
  for (let i = from; i <= to; i++) {
    workingHours.push(
      set(date, { hours: i, minutes: 0, seconds: 0, milliseconds: 0 })
    );
  }
  return workingHours;
}

export function getSchedule(date) {
  const scheduleUrl = `${apiEndpoint}/${format(date, "yyyy-MM-dd")}`;
  return http.get(scheduleUrl);
}
