import { set } from "date-fns";

export function getSchedule(date) {
  const from = 8;
  const to = 21;
  const workingHours = [];
  for (let i = from; i <= to; i++) {
    workingHours.push(
      set(date, { hours: i, minutes: 0, seconds: 0, milliseconds: 0 })
    );
  }
  return {
    date: new Date(date),
    workingHours,
    plannedActivities: [
      {
        id: 1,
        name: "Встреча",
        allocatedTimeslot: {
          begining: set(date, {
            hours: 8,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
          }),
          end: set(date, { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 })
        }
      },
      {
        id: 2,
        name: "Встреча",
        allocatedTimeslot: {
          begining: set(date, {
            hours: 9,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
          }),
          end: set(date, { hours: 9, minutes: 30, seconds: 0, milliseconds: 0 })
        }
      },
      {
        id: 3,
        name: "Встреча",
        allocatedTimeslot: {
          begining: set(date, {
            hours: 9,
            minutes: 30,
            seconds: 0,
            milliseconds: 0
          }),
          end: set(date, { hours: 9, minutes: 45, seconds: 0, milliseconds: 0 })
        }
      },
      {
        id: 4,
        name: "Встреча с тестом",
        allocatedTimeslot: {
          begining: set(date, {
            hours: 10,
            minutes: 45,
            seconds: 0,
            milliseconds: 0
          }),
          end: set(date, {
            hours: 11,
            minutes: 30,
            seconds: 0,
            milliseconds: 0
          })
        }
      }
    ]
  };
}
