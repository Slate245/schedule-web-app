import React from "react";
import { TextField, Typography, makeStyles } from "@material-ui/core";
import { TimePicker } from "@material-ui/pickers";
import { ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  arrow: {
    alignSelf: "center",
    color: "rgba(0,0,0,0.54)",
    gridArea: "a",
  },
  timePicker: {
    width: "4.5rem",
    flexShrink: "0",
  },
  input: {
    marginBottom: "1rem",
  },

  duration: {
    marginLeft: "1rem",
  },
  message: {
    marginBottom: "1rem",
  },
});

export const EditActivityForm = () => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        label="Название дела"
        size="small"
        type="text"
        variant="outlined"
        fullWidth
        className={classes.input}
      />
      <div className={classes.container}>
        <TimePicker
          className={classes.timePicker}
          label="С"
          ampm={false}
          minutesStep={15}
          inputVariant="outlined"
          size="small"
        />
        <ArrowRight className={classes.arrow} />
        <TimePicker
          className={classes.timePicker}
          label="До"
          ampm={false}
          minutesStep={15}
          inputVariant="outlined"
          size="small"
        />
        <TextField
          label="Длительность"
          defaultValue={15}
          size="small"
          type="number"
          variant="outlined"
          className={classes.duration}
          inputProps={{ step: 15 }}
        />
      </div>
      <Typography
        color="textSecondary"
        variant="caption"
        display="block"
        className={classes.message}
      >
        Подходящее время и планируемая длительность
      </Typography>
      <TextField
        label="Описание"
        size="small"
        type="text"
        variant="outlined"
        fullWidth
        multiline
      />
    </div>
  );
};
