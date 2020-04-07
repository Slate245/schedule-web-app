import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    minHeight: "calc(100vh - 56px)",
  },
});

export default function Activities() {
  const classes = useStyles();

  return <section className={classes.root}>Activities</section>;
}
