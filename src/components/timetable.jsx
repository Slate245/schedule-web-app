import React from "react";
import { populateWorkingHours } from "../services/scheduleService";
import { parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Card,
  CardActionArea
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Activity from "./activity";

const minutesInTimeslot = 15;

const useStyles = makeStyles({
  cell: {
    padding: "0",
    borderRight: "1px solid rgba(224, 224, 224, 1)"
  },
  time: {
    width: "56px",
    lineHeight: "1",
    borderRight: "1px solid rgba(224, 224, 224, 1)"
  },
  table: {
    tableLayout: "fixed",
    minWidth: "340px"
  },
  emptySlot: {
    height: "2.5rem",
    margin: "0 8px",
    boxShadow: "none"
  },
  actionArea: {
    height: "100%"
  }
});

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

const filterActivities = (activities, timeslot) => {
  return activities.filter(a => {
    const { begining, end } = a.allocatedTimeslot;
    const allocatedTimeslot = {
      begining: parseISO(begining),
      end: parseISO(end)
    };
    return Timeslot.checkIntersection(allocatedTimeslot, timeslot);
  });
};

const Timetable = ({ schedule, onTimeslotSelect }) => {
  const classes = useStyles();

  const rows = createHourRows(
    schedule.workingHours || populateWorkingHours(new Date()),
    schedule.plannedActivities || []
  );

  function createHourRows(hours, activities) {
    const hourRows = hours.map(hour => {
      const currentHour = new Timeslot(hour, 60);
      const activitiesThisHour = filterActivities(activities, currentHour);
      const hourRow = mapTimeslots(currentHour, activitiesThisHour);
      return hourRow;
    });

    return hourRows;
  }

  function mapTimeslots(currentHour, activities) {
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

      const activityInTimeslot = filterActivities(
        activities,
        currentTimeslot
      )[0];

      if (!activityInTimeslot) {
        mappedTimeslots.push({
          content: (
            <Card className={classes.emptySlot}>
              <CardActionArea
                className={classes.actionArea}
                onClick={() => {
                  onTimeslotSelect(currentTimeslot);
                }}
              />
            </Card>
          ),
          colspan: 1
        });
      } else {
        let numberOfSlots =
          (new Date(activityInTimeslot.allocatedTimeslot.end) -
            new Date(currentTimeslot.begining)) /
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
              onClick={() => {
                onTimeslotSelect(activityInTimeslot.allocatedTimeslot);
              }}
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
  }
  return (
    <Table className={classes.table}>
      <TableHead />
      <TableBody>
        {rows.map(row => (
          <TableRow key={row[0].content}>
            {row.map((cell, index) => (
              <TableCell
                key={index}
                align="center"
                className={index === 0 ? classes.time : classes.cell}
                colSpan={cell.colspan}
              >
                {cell.content || (
                  <Card className={classes.emptySlot}>
                    <CardActionArea
                      className={classes.actionArea}
                      onClick={onTimeslotSelect}
                    />
                  </Card>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Timetable;
