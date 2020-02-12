import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: "100%"
  },
  listItemText: {
    display: "flex",
    justifyContent: "space-between"
  },
  duration: {
    whiteSpace: "nowrap",
    marginLeft: "0.5rem"
  }
});

export const ActivitiesListItem = ({
  activity: { name, preferredInterval, expectedDuration }
}) => {
  const { listItemText, duration } = useStyles();
  return (
    <ListItem button divider>
      <ListItemText
        className={listItemText}
        primaryTypographyProps={{ variant: "subtitle2", component: "span" }}
        primary={name}
        secondaryTypographyProps={{
          variant: "caption",
          component: "span",
          className: duration
        }}
        secondary={`~ ${expectedDuration} мин.`}
      />
    </ListItem>
  );
};
