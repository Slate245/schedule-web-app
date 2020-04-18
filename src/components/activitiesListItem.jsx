import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: "100%",
  },
  listItem: {
    "&$selected": {
      backgroundColor: "rgba(76, 175, 80, 0.38)",
    },
    "&$selected:hover": {
      backgroundColor: "rgba(76, 175, 80, 0.38)",
    },
  },
  selected: {},
  listItemText: {
    display: "flex",
    justifyContent: "space-between",
  },
  duration: {
    whiteSpace: "nowrap",
    marginLeft: "0.5rem",
  },
});

export const ActivitiesListItem = ({
  activity,
  onClick,
  selected,
  shortenName,
  disabled,
}) => {
  const { name, expectedDuration } = activity;
  const classes = useStyles();
  return (
    <ListItem
      disabled={disabled}
      button
      divider
      classes={{ root: classes.listItem, selected: classes.selected }}
      selected={selected}
      onClick={() => onClick(activity)}
    >
      <ListItemText
        className={classes.listItemText}
        primaryTypographyProps={{
          variant: "subtitle2",
          component: "span",
          noWrap: shortenName,
        }}
        primary={name}
        secondaryTypographyProps={{
          variant: "caption",
          component: "span",
          className: classes.duration,
        }}
        secondary={`~ ${expectedDuration} мин.`}
      />
    </ListItem>
  );
};
