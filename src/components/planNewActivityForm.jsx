import React from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    fontSize: "0.85rem"
  }
});

export const PlanNewActivityForm = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom className={classes.title}>
          Новое Дело
        </Typography>
        <TextField
          id="new-activity-name"
          label="Название"
          size="small"
          margin="dense"
          value={value}
          onChange={e => onChange(e)}
        />
      </CardContent>
    </Card>
  );
};
