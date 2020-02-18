import { DateTime } from "luxon";
import http from "./httpService";

const apiEndpoint = "/schedules";

export function populateWorkingHours() {
  const from = 8;
  const to = 21;
  const workingHours = [];
  for (let i = from; i <= to; i++) {
    workingHours.push(
      DateTime.utc()
        .set({ hour: i, minute: 0, second: 0, millisecond: 0 })
        .toISO()
    );
  }
  return workingHours;
}

export function getSchedule(date) {
  const scheduleUrl = `${apiEndpoint}/${date.toISODate()}`;
  return http.get(scheduleUrl);
}
