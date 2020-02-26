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

export function createEmptySchedule(date) {
  const emptySchedule = {
    date: DateTime.fromObject({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      zone: "utc"
    }).toISO(),
    workingHours: populateWorkingHours(),
    plannedActivities: []
  };
  return emptySchedule;
}

export function updateSchedule(schedule) {
  if (schedule._id) {
    const body = { ...schedule };
    delete body._id;
    return http.put(`${apiEndpoint}/${schedule._id}`, body);
  }

  return http.post(apiEndpoint, schedule);
}
