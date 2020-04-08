import React from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  lowEmphasis: {
    color: "rgba(0, 0, 0, 0.38)",
  },
});

export const OnScreenMessage = ({
  title,
  subtitle,
  containerClass,
  maxWidth,
}) => {
  const classes = useStyles();
  return (
    <Container maxWidth={maxWidth} className={containerClass}>
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
    </Container>
  );
};
