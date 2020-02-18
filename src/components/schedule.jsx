import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { getSchedule, createEmptySchedule } from "../services/scheduleService";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import Timetable from "./timetable";
import { PlanActivityDialog } from "./planActivityDialog";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "16px"
  },
  fab: {
    backgroundColor: "white",
    color: "#4CAF50",
    position: "fixed",
    bottom: "56px",
    right: "0",
    margin: "0 16px 16px 0",
    alignSelf: "flex-end"
  }
});

export default function Schedule() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(DateTime.local());
  const [schedule, setSchedule] = useState(
    createEmptySchedule(DateTime.local())
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSchedule(selectedDate);
      if (!result.data) {
        setSchedule(createEmptySchedule(selectedDate));
      } else {
        setSchedule(result.data);
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedInterval({});
  };

  const handleIntervalSelect = selectedInterval => {
    let { start, end } = selectedInterval;
    if (typeof start === "string") {
      start = DateTime.fromISO(selectedInterval.start, { setZone: true });
      end = DateTime.fromISO(selectedInterval.end, { setZone: true });
    }

    setSelectedInterval({ start, end });
    setIsDialogOpen(true);
  };

  return (
    <section className={classes.root}>
      <DatePicker
        label="Сегодня"
        value={selectedDate}
        onChange={handleDateChange}
        inputVariant="outlined"
        format="EEE, d MMMM"
      />
      <Timetable schedule={schedule} onIntervalSelect={handleIntervalSelect} />
      <Fab className={classes.fab} onClick={handleDialogOpen}>
        <Add />
      </Fab>
      <PlanActivityDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
      />
    </section>
  );
}
