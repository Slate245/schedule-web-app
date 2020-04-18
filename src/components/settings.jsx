import React, { useContext } from "react";
import { logout } from "../services/authService";
import { UserContext } from "../utils/userContext";
import { Typography, Button, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 56px)",
    padding: "1rem",
    position: "relative",
  },
  caption: {
    margin: "0 0 2rem",
  },
  bugreport: {
    position: "absolute",
    bottom: "1rem",
  },
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
      <Typography
        className={classes.bugreport}
        variant="body2"
        color="textSecondary"
      >
        Нашли проблему?{" "}
        <Link
          href="https://forms.gle/cje3FQ6E7SoyibE68"
          target="_blank"
          rel="noopener"
        >
          Расскажите мне!
        </Link>
      </Typography>
    </section>
  );
}
