import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { CssBaseline, Paper } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";

import Schedule from "./components/schedule";
import Activities from "./components/activities";
import Settings from "./components/settings";
import NavBar from "./components/navBar";

const useStyles = makeStyles({
  root: {
    marginBottom: "56px"
  }
});

function App() {
  toast.configure();
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: green
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <CssBaseline />
        <Paper square component="main" elevation={0} className={classes.root}>
          <Switch>
            <Route path="/schedule" component={Schedule} />
            <Route path="/activities" component={Activities} />
            <Route path="/settings" component={Settings} />
            <Redirect from="/" exact to="/schedule" />
          </Switch>
        </Paper>
        <NavBar />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
