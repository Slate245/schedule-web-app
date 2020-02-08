import React from "react";
import { DateTime } from "luxon";

import { Card, CardActionArea, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "8px",
    whiteSpace: "nowrap",
    backgroundColor: "#43A047"
  },
  caption: {
    lineHeight: "1",
    color: "rgba(255,255,255, 0.6)"
  },
  name: {
    lineHeight: "1",
    color: "rgba(255,255,255, 1)"
  },
  actionArea: {
    padding: "5px"
  }
});

const Activity = ({ name, allocatedInterval: { start, end }, onClick }) => {
  const classes = useStyles();
  const startTime = DateTime.fromISO(start, { setZone: true });
  const endTime = DateTime.fromISO(end, { setZone: true });
  const duration = `${startTime.toFormat("HH:mm")}>${endTime.toFormat(
    "HH:mm"
  )}`;
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea} onClick={onClick}>
        <Typography
          variant="caption"
          display="block"
          noWrap
          align="left"
          gutterBottom
          className={classes.caption}
        >
          {duration}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          noWrap
          align="left"
          className={classes.name}
        >
          {name}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default Activity;
