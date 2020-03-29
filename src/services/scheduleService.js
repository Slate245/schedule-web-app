import { DateTime } from "luxon";
import { getJwt } from "./authService";
import http from "./httpService";

const apiEndpoint = "/schedules";

http.setJwt(getJwt());

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

export function createEmptySchedule(date, user) {
  const emptySchedule = {
    date: DateTime.fromObject({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      zone: "utc"
    }).toISO(),
    ownerId: user._id,
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
