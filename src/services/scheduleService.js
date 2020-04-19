import { DateTime } from "luxon";
import { getJwt } from "./authService";
import http from "./httpService";

const apiEndpoint = "/schedules";

http.setJwt(getJwt());

export function populateWorkingHours(date) {
  let luxonDate;
  if (typeof date === "string") {
    luxonDate = DateTime.fromISO(date);
  }
  luxonDate = date;
  const from = 8;
  const to = 21;
  const workingHours = [];
  for (let i = from; i <= to; i++) {
    workingHours.push(
      luxonDate.set({ hour: i, minute: 0, second: 0, millisecond: 0 }).toISO()
    );
  }
  return workingHours;
}

export function getSchedule(date) {
  const scheduleUrl = `${apiEndpoint}/${date.toISODate()}`;
  return http.get(scheduleUrl);
}

export function createEmptySchedule(date, user) {
  const formattedDate = date
    .startOf("day")
    .setZone("utc", { keepLocalTime: true });
  const emptySchedule = {
    date: formattedDate.toISO(),
    ownerId: user._id,
    workingHours: populateWorkingHours(formattedDate),
    plannedActivities: [],
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
