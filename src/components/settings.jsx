import React, { useContext } from "react";
import { logout } from "../services/authService";
import { UserContext } from "../utils/userContext";
import { Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 56px)",
    padding: "1rem"
  },
  caption: {
    margin: "0 0 2rem"
  }
});

export default function Settings() {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  function handleLogout() {
    logout();
    window.location = "/";
  }
  return (
    <section className={classes.root}>
      <Typography className={classes.header} variant="h6">
        Настройки
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.caption}
      >
        Вы вошли в систему как {user.name}
      </Typography>
      <Button onClick={handleLogout} size="small" variant="outlined">
        Выйти из системы
      </Button>
    </section>
  );
}
