import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getSchedule } from "../services/scheduleService";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import Timetable from "./timetable";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSchedule(selectedDate);
      setSchedule(result.data);
    };

    fetchData();
  }, [selectedDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <section className={classes.root}>
      <DatePicker
        label="Сегодня"
        value={selectedDate}
        onChange={handleDateChange}
        inputVariant="outlined"
        format="EEEEEE, d MMMM"
      />
      <Timetable schedule={schedule} />
      <Fab className={classes.fab}>
        <Add />
      </Fab>
    </section>
  );
}
