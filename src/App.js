import React from "react";
import { CssBaseline, Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Switch, Route, Redirect } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";

import Schedule from "./components/schedule";
import Activities from "./components/activities";
import Settings from "./components/settings";
import NavBar from "./components/navBar";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: green
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <CssBaseline />
        <Paper square component="main" elevation={0}>
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
