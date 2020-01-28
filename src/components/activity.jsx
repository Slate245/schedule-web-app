import React from "react";
import { format } from "date-fns";

import { Card, Typography } from "@material-ui/core";

const Activity = ({ name, allocatedTimeslot: { begining, end } }) => {
  const duration = `${format(begining, "hh:mm")}>${format(end, "hh:mm")}`;
  return (
    <Card
      style={{
        margin: "8px",
        padding: "5px",
        whiteSpace: "nowrap",
        backgroundColor: "#43A047"
      }}
    >
      <Typography
        variant="caption"
        display="block"
        noWrap
        align="left"
        style={{ color: "rgba(255,255,255, 0.6)" }}
      >
        {duration}
      </Typography>
      <Typography
        variant="caption"
        display="block"
        noWrap
        align="left"
        style={{ color: "rgba(255,255,255, 1)" }}
      >
        {name}
      </Typography>
    </Card>
  );
};

export default Activity;
