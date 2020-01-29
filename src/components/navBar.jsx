import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EventNote, FormatListBulleted, Settings } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    minWidth: "340px",
    backgroundColor: "#4CAF50"
  },
  bna: {
    "&$selected": {
      color: "white"
    }
  },
  selected: {}
});

export default function NavBar() {
  const classes = useStyles();
  let location = useLocation();
  return (
    <BottomNavigation
      className={classes.root}
      value={location.pathname}
      showLabels
    >
      <BottomNavigationAction
        classes={{ root: classes.bna, selected: classes.selected }}
        label="Расписание"
        value="/schedule"
        component={Link}
        to="/"
        icon={<EventNote />}
      />
      <BottomNavigationAction
        classes={{ root: classes.bna, selected: classes.selected }}
        label="Список дел"
        value="/activities"
        component={Link}
        to="/activities"
        icon={<FormatListBulleted />}
      />
      <BottomNavigationAction
        classes={{ root: classes.bna, selected: classes.selected }}
        label="Настройки"
        value="/settings"
        component={Link}
        to="/settings"
        icon={<Settings />}
      />
    </BottomNavigation>
  );
}
