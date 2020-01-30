import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { DatePicker } from "@material-ui/pickers";
import Timetable from "./timetable";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "16px"
  }
});

export default function Schedule() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <section className={classes.root}>
      <DatePicker
        label="Сегодня"
        value={selectedDate}
        onChange={setSelectedDate}
        inputVariant="outlined"
        format="EEEEEE, d MMMM"
      />
      <Timetable />
    </section>
  );
}
