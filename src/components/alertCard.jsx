import React from "react";
import { Card, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    backgroundColor: "#FFF3E0",
    padding: "0.5rem"
  },
  content: {
    color: "#E65100"
  }
});

export const AlertCard = ({ message }) => {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.card}>
      <Typography className={classes.content} variant="body2">
        {message}
      </Typography>
    </Card>
  );
};
