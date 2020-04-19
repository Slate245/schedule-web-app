import React, { useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import {
  getSchedule,
  createEmptySchedule,
  updateSchedule,
} from "../services/scheduleService";
import { UserContext } from "../utils/userContext";
import { getCurrentIntervalStart } from "../utils/getCurrentIntervalStart";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
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
    padding: "1rem 1rem 0",
  },
  fab: {
    backgroundColor: "white",
    color: "#4CAF50",
    position: "fixed",
    bottom: "56px",
    right: "0",
    margin: "0 16px 16px 0",
    alignSelf: "flex-end",
  },
});

export default function Schedule() {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(DateTime.local());
  const [schedule, setSchedule] = useState(
    createEmptySchedule(DateTime.local(), user)
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState({});
  const [selectedActivity, setSelectedActivity] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSchedule(selectedDate);
      if (!result.data) {
        setSchedule(createEmptySchedule(selectedDate, user));
      } else {
        setSchedule(result.data);
      }
    };

    fetchData();
  }, [selectedDate, user]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDialogOpen = () => {
    const currentIntervalStart = getCurrentIntervalStart();
    setSelectedInterval({
      start: currentIntervalStart,
      end: currentIntervalStart,
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedInterval({});
    setSelectedActivity({});
  };

  const handleIntervalSelect = (selectedInterval, selectedActivity) => {
    let { start, end } = selectedInterval;
    if (typeof start === "string") {
      start = DateTime.fromISO(start, { setZone: true });
      end = DateTime.fromISO(end, { setZone: true });
    }

    setSelectedInterval({ start, end });
    if (selectedActivity) {
      setSelectedActivity(selectedActivity);
    }
    setIsDialogOpen(true);
  };

  const handleScheduleUpdate = async (updatedSchedule) => {
    const originalSchedule = schedule;
    setSchedule({ ...updatedSchedule });

    try {
      const { data } = await updateSchedule(updatedSchedule);
      setSchedule({ ...data });
    } catch (ex) {
      toast.error("Connection error. Please refresh the page");
      setSchedule({ ...originalSchedule });
    }
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
        selectedActivity={selectedActivity}
        onIntervalChange={setSelectedInterval}
        schedule={schedule}
        onScheduleChange={handleScheduleUpdate}
      />
    </section>
  );
}
