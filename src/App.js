import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

import Timetable from "./components/timetable";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      {<Timetable />}
    </React.Fragment>
  );
}

export default App;
