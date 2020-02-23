import React from "react";
import { populateWorkingHours } from "../services/scheduleService";
import { DateTime, Interval } from "luxon";
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

const minutesInInterval = 15;

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

const filterActivities = (activities, intervalToCheck) => {
  return activities.filter(a => {
    const startLocal = DateTime.fromISO(a.allocatedInterval.start);
    const endLocal = DateTime.fromISO(a.allocatedInterval.end);
    const activityIntervalLocal = Interval.fromDateTimes(startLocal, endLocal);
    return activityIntervalLocal.overlaps(intervalToCheck);
  });
};

const Timetable = ({ schedule, onIntervalSelect }) => {
  const classes = useStyles();

  const rows = createHourRows(
    schedule.workingHours || populateWorkingHours(),
    schedule.plannedActivities || []
  );

  function createHourRows(hours, activities) {
    const hourRows = hours.map(hour => {
      const hourStart = DateTime.fromISO(hour, { setZone: true });
      const currentHourInterval = Interval.after(hourStart, { hours: 1 });
      const activitiesThisHour = filterActivities(
        activities,
        currentHourInterval
      );
      const hourRow = mapIntervals(currentHourInterval, activitiesThisHour);
      return hourRow;
    });

    return hourRows;
  }

  function mapIntervals(hourInterval, activities) {
    const intervalsInHour = 60 / minutesInInterval;
    const mappedIntervals = [];

    for (let i = 0; i < intervalsInHour; i++) {
      const currentIntervalStart = hourInterval.start.plus({
        minutes: minutesInInterval * i
      });
      const currentInterval = Interval.after(currentIntervalStart, {
        minutes: minutesInInterval
      });

      const activityInInterval = filterActivities(
        activities,
        currentInterval
      )[0];

      if (!activityInInterval) {
        mappedIntervals.push({
          content: (
            <Card className={classes.emptySlot}>
              <CardActionArea
                className={classes.actionArea}
                onClick={() => {
                  onIntervalSelect(currentInterval);
                }}
              />
            </Card>
          ),
          colspan: 1
        });
      } else {
        let numberOfSlots =
          (new Date(activityInInterval.allocatedInterval.end) -
            new Date(currentInterval.start)) /
          1000 /
          60 /
          minutesInInterval;
        if (numberOfSlots > intervalsInHour - i) {
          numberOfSlots = intervalsInHour - i;
        }

        mappedIntervals.push({
          content: (
            <Activity
              name={activityInInterval.name}
              allocatedInterval={activityInInterval.allocatedInterval}
              onClick={() => {
                onIntervalSelect(
                  activityInInterval.allocatedInterval,
                  activityInInterval
                );
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
        content: hourInterval.start.toFormat("H:mm"),
        colspan: 1
      },
      ...mappedIntervals
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
                {cell.content}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Timetable;
