import React from "react";
import { CssBaseline, Paper } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Schedule from "./components/schedule";
import Activities from "./components/activities";
import Settings from "./components/settings";
import NavBar from "./components/navBar";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
