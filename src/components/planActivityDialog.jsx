import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  Button,
  makeStyles,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { ArrowRight, ExpandMore } from "@material-ui/icons";
import { TimePicker } from "@material-ui/pickers";
import { ActivitiesListItem } from "./activitiesListItem";
import { PlanNewActivityForm } from "./planNewActivityForm";
import { getActivities } from "../services/activitiesService";

const useStyles = makeStyles({
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    minWidth: "220px",
    paddingBottom: "1rem"
  },
  input: {
    "& input": {
      width: "2.5rem"
    }
  },
  arrow: {
    alignSelf: "center",
    margin: "0 1rem",
    color: "rgba(0,0,0,0.54)"
  },
  list: {
    width: "100%"
  },
  listItemText: {
    display: "flex",
    justifyContent: "space-between"
  },
  duration: {
    whiteSpace: "nowrap",
    marginLeft: "0.5rem"
  },
  expansion: {
    marginBottom: "1rem"
  },
  summary: {
    padding: "0 1rem"
  }
});

export const PlanActivityDialog = ({ open, onClose, selectedInterval }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(400));

  const [activities, setActivities] = useState([]);
  const [chosenActivity, setChosenActivity] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getActivities();
      setActivities(result.data);
    };
    fetchData();
  }, [activities]);

  function handleTimeslotChange(selectedTime) {
    //Нужно взять часы и минуты из selectedTime и записать их через setSelectedTimeslot
  }

  function handleActivityChoice(activity) {
    setChosenActivity(activity);
  }

  function getCurrentIntervalStart() {
    const currentTime = DateTime.local();
    const difference = currentTime.minute % 15;
    if (difference !== 0) {
      return currentTime.minus({ minutes: difference });
    }
    return currentTime;
  }

  function handleActivityPlanning() {}

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>Запланировать дело</DialogTitle>
      <DialogContent>
        <div className={classes.inputContainer}>
          <TimePicker
            className={classes.input}
            label={"Начало"}
            ampm={false}
            minutesStep={15}
            inputVariant="outlined"
            size="small"
            onChange={handleTimeslotChange}
            value={selectedInterval.start || getCurrentIntervalStart()}
          />
          <ArrowRight className={classes.arrow} />
          <TimePicker
            className={classes.input}
            label={"Конец"}
            ampm={false}
            minutesStep={15}
            inputVariant="outlined"
            size="small"
            onChange={handleTimeslotChange}
            value={selectedInterval.end || getCurrentIntervalStart()}
          />
        </div>
        <ExpansionPanel className={classes.expansion}>
          <ExpansionPanelSummary
            className={classes.summary}
            expandIcon={<ExpandMore />}
          >
            Подходящие дела
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List dense className={classes.list}>
              {activities.map(a => (
                <ActivitiesListItem
                  key={a._id}
                  activity={a}
                  selected={chosenActivity._id === a._id}
                  onClick={handleActivityChoice}
                />
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <PlanNewActivityForm />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Отмена
        </Button>
        <Button color="primary" onClick={handleActivityPlanning}>
          ОК
        </Button>
      </DialogActions>
    </Dialog>
  );
};
