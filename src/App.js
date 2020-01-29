import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
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
      <main>
        <Switch>
          <Route path="/schedule" component={Schedule} />
          <Route path="/activities" component={Activities} />
          <Route path="/settings" component={Settings} />
          <Redirect from="/" exact to="/schedule" />
        </Switch>
      </main>
      <NavBar />
    </>
  );
}

export default App;
