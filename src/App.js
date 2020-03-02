import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline, Paper } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import { UserProvider } from "./utils/userContext";
import { getCurrentUser } from "./services/authService";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Schedule from "./components/schedule";
import Activities from "./components/activities";
import Settings from "./components/settings";
import NavBar from "./components/navBar";
import ProtectedRoute from "./components/common/protectedRoute";

const useStyles = makeStyles({
  rootWithNav: {
    marginBottom: "56px"
  },
  rootWithoutNav: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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

  const [user, setUser] = useState(getCurrentUser());

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={LuxonUtils} locale="ru">
        <CssBaseline />
        <UserProvider value={{ user, setUser }}>
          <Switch>
            <Route path="/login">
              <Paper
                square
                elevation={0}
                component="main"
                className={classes.rootWithoutNav}
              >
                <LoginForm />
              </Paper>
            </Route>
            <Route path="/register">
              <Paper
                square
                elevation={0}
                component="main"
                className={classes.rootWithoutNav}
              >
                <RegisterForm />
              </Paper>
            </Route>
            <Route path="/">
              <Paper
                square
                component="main"
                elevation={0}
                className={classes.rootWithNav}
              >
                <Switch>
                  <ProtectedRoute path="/schedule" component={Schedule} />
                  <ProtectedRoute path="/activities" component={Activities} />
                  <ProtectedRoute path="/settings" component={Settings} />
                  <Redirect from="/" exact to="/schedule" />
                </Switch>
                <NavBar />
              </Paper>
            </Route>
          </Switch>
        </UserProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
