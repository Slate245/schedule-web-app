import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  lowEmphasis: {
    color: "rgba(0, 0, 0, 0.38)",
  },
});

export const OnScreenMessage = ({ title, subtitle }) => {
  const classes = useStyles();
  return (
    <>
      <Typography
        className={classes.lowEmphasis}
        align="center"
        variant="h6"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        className={classes.lowEmphasis}
        align="center"
        variant="body2"
      >
        {subtitle}
      </Typography>
    </>
  );
};
