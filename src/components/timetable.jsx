import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";

import Activity from "./activity";

const dateString = "January 6, 2020";
const schedule = {
  date: new Date(dateString),
  workingHours: [
    new Date(`${dateString} 8:00`),
    new Date(`${dateString} 9:00`),
    new Date(`${dateString} 10:00`),
    new Date(`${dateString} 11:00`),
    new Date(`${dateString} 12:00`),
    new Date(`${dateString} 13:00`),
    new Date(`${dateString} 14:00`),
    new Date(`${dateString} 15:00`),
    new Date(`${dateString} 16:00`),
    new Date(`${dateString} 17:00`),
    new Date(`${dateString} 18:00`),
    new Date(`${dateString} 19:00`),
    new Date(`${dateString} 20:00`),
    new Date(`${dateString} 21:00`)
  ],
  plannedActivities: [
    {
      id: 1,
      name: "Встреча",
      allocatedTimeslot: {
        begining: new Date(`${dateString} 08:00:00`),
        end: new Date(`${dateString} 09:00:00`)
      }
    },
    {
      id: 2,
      name: "Встреча",
      allocatedTimeslot: {
        begining: new Date(`${dateString} 09:00:00`),
        end: new Date(`${dateString} 09:30:00`)
      }
    },
    {
      id: 3,
      name: "Встреча",
      allocatedTimeslot: {
        begining: new Date(`${dateString} 09:30:00`),
        end: new Date(`${dateString} 09:45:00`)
      }
    },
    {
      id: 4,
      name: "Встреча с тестом",
      allocatedTimeslot: {
        begining: new Date(`${dateString} 10:45:00`),
        end: new Date(`${dateString} 11:30:00`)
      }
    }
  ]
};

const minutesInTimeslot = 15;

const style = {
  padding: "0",
  borderRight: "1px solid rgba(224, 224, 224, 1)"
};
const timeStyle = {
  width: "80px",
  borderRight: "1px solid rgba(224, 224, 224, 1)"
};

class Timeslot {
  constructor(begining, lengthInMintues) {
    this.begining = new Date(begining);
    this.end = new Date(begining);
    this.end.setMinutes(this.end.getMinutes() + lengthInMintues);
  }

  static checkIntersection(first, second) {
    return (
      (first.begining <= second.begining && second.begining < first.end) ||
      (first.begining < second.end && second.end <= first.end) ||
      (second.begining <= first.begining && first.begining < second.end) ||
      (second.begining < first.end && first.end <= second.end)
    );
  }
}

const getActivities = () => {
  return [...schedule.plannedActivities];
};

const mapTimeslots = (currentHour, activities) => {
  const timeslotsInHour = 60 / minutesInTimeslot;
  const mappedTimeslots = [];

  for (let i = 0; i < timeslotsInHour; i++) {
    let currentTimeslotStart = new Date(currentHour.begining);
    currentTimeslotStart.setMinutes(
      currentTimeslotStart.getMinutes() + minutesInTimeslot * i
    );

    const currentTimeslot = new Timeslot(
      currentTimeslotStart,
      minutesInTimeslot
    );

    const activityInTimeslot = filterActivities(activities, currentTimeslot)[0];

    if (!activityInTimeslot) {
      mappedTimeslots.push({ content: null, colspan: 1 });
    } else {
      let numberOfSlots =
        (activityInTimeslot.allocatedTimeslot.end - currentTimeslot.begining) /
        1000 /
        60 /
        minutesInTimeslot;
      if (numberOfSlots > timeslotsInHour - i) {
        numberOfSlots = timeslotsInHour - i;
      }

      mappedTimeslots.push({
        content: (
          <Activity
            name={activityInTimeslot.name}
            allocatedTimeslot={activityInTimeslot.allocatedTimeslot}
          />
        ),
        colspan: numberOfSlots
      });

      i += numberOfSlots - 1;
    }
  }

  return [
    {
      content: `${currentHour.begining.getHours()}:00`,
      colspan: 1
    },
    ...mappedTimeslots
  ];
};

const filterActivities = (activities, timeslot) => {
  return activities.filter(a => {
    return Timeslot.checkIntersection(a.allocatedTimeslot, timeslot);
  });
};

const createHourRows = hours => {
  const hourRows = hours.map(hour => {
    const currentHour = new Timeslot(hour, 60);
    const activitiesThisHour = filterActivities(getActivities(), currentHour);
    const hourRow = mapTimeslots(currentHour, activitiesThisHour);
    return hourRow;
  });

  return hourRows;
};

const Timetable = () => {
  const rows = createHourRows(schedule.workingHours);
  return (
    <Table style={{ tableLayout: "fixed", minWidth: "340px" }}>
      <TableHead />
      <TableBody>
        {rows.map(row => (
          <TableRow key={row[0].content}>
            {row.map((cell, index) => (
              <TableCell
                key={index}
                align="center"
                style={index === 0 ? timeStyle : style}
                colSpan={cell.colspan}
              >
                {cell.content || "Hey"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Timetable;
