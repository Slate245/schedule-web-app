import React, { useEffect, useState } from "react";
import { Interval } from "luxon";
import { toast } from "react-toastify";
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
  useTheme,
} from "@material-ui/core";
import { ArrowRight, ExpandMore } from "@material-ui/icons";
import { TimePicker } from "@material-ui/pickers";
import { ActivitiesListItem } from "./activitiesListItem";
import { PlanNewActivityForm } from "./planNewActivityForm";
import { AlertCard } from "./alertCard";
import { getActivities } from "../services/activitiesService";

const useStyles = makeStyles({
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    minWidth: "220px",
    paddingBottom: "1rem",
  },
  input: {
    "& input": {
      width: "2.5rem",
    },
  },
  arrow: {
    alignSelf: "center",
    margin: "0 1rem",
    color: "rgba(0,0,0,0.54)",
  },
  list: {
    width: "100%",
  },
  listItemText: {
    display: "flex",
    justifyContent: "space-between",
  },
  duration: {
    whiteSpace: "nowrap",
    marginLeft: "0.5rem",
  },
  expansion: {
    marginBottom: "1rem",
  },
  summary: {
    padding: "0 1rem",
  },
  deleteButton: {
    margin: "auto auto auto 0.5rem",
  },
  alertContainer: {
    marginBottom: "1rem",
    display: "flex",
  },
});

export const PlanActivityDialog = ({
  open,
  onClose,
  selectedInterval,
  selectedActivity,
  onIntervalChange,
  schedule,
  onScheduleChange,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(400));

  const [activities, setActivities] = useState([]);
  const [chosenActivity, setChosenActivity] = useState({});
  const [newActivityName, setNewActivityName] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getActivities();
      setActivities(result.data);
    };
    fetchData();
  }, []);

  function handleClose() {
    setChosenActivity({});
    setNewActivityName("");
    onClose();
  }

  function handleIntervalStartChange(selectedTime) {
    onIntervalChange({ ...selectedInterval, start: selectedTime });
  }

  function handleIntervalEndChange(selectedTime) {
    onIntervalChange({ ...selectedInterval, end: selectedTime });
  }

  function handleActivityChoice(activity) {
    setChosenActivity(activity);
  }

  function handleActivityPlanning() {
    const { start, end } = selectedInterval;
    const selectedIntervalDuration = Interval.fromDateTimes(start, end)
      .toDuration()
      .as("minutes");

    if (!chosenActivity.name && !newActivityName) {
      toast.error(
        "Выберите подходящее дело из списка или введите название другого дела"
      );
      return;
    }

    if (Number.isNaN(selectedIntervalDuration)) {
      toast.error("Начало интервала не может быть позже конца.");
      return;
    }
    if (selectedIntervalDuration === 0) {
      toast.error("Интервал не может быть меньше 15 минут");
      return;
    }

    const areIntervalsIntersecting = () => {
      let result = false;
      schedule.plannedActivities.forEach((a) => {
        const { start: s, end: e } = a.allocatedInterval;
        const allocatedIntervalToCheck = Interval.fromISO(`${s}/${e}`);
        const selectedIntervalToCheck = Interval.fromISO(`${start}/${end}`);
        if (
          allocatedIntervalToCheck.intersection(selectedIntervalToCheck) &&
          allocatedIntervalToCheck
            .intersection(selectedIntervalToCheck)
            .length() > 0 &&
          !allocatedIntervalToCheck.equals(selectedIntervalToCheck)
        ) {
          result = true;
        }
      });
      return result;
    };

    if (areIntervalsIntersecting()) {
      toast.error("Новое дело не может перекрывать уже запланированные дела");
      return;
    }

    const activityToPlan = createActivityObj(
      chosenActivity.name || newActivityName,
      start,
      end
    );
    const plannedActivities = [
      ...schedule.plannedActivities.filter(
        (a) =>
          a.allocatedInterval.start !==
            activityToPlan.allocatedInterval.start &&
          a.allocatedInterval.end !== activityToPlan.allocatedInterval.end
      ),
    ];

    plannedActivities.push(activityToPlan);
    onScheduleChange({
      ...schedule,
      plannedActivities,
    });

    handleClose();
  }

  function handleActivityDelete() {
    const start = selectedInterval.start.toISO();
    const end = selectedInterval.end.toISO();

    const plannedActivities = [
      ...schedule.plannedActivities.filter(
        (a) =>
          a.allocatedInterval.start !== start && a.allocatedInterval.end !== end
      ),
    ];
    onScheduleChange({
      ...schedule,
      plannedActivities,
    });

    handleClose();
  }

  function createActivityObj(name, start, end) {
    return {
      name,
      allocatedInterval: {
        start: start.toISO(),
        end: end.toISO(),
      },
    };
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setChosenActivity({});
    setNewActivityName(value);
  };

  function filterActivitiesByInterval() {
    if (!selectedInterval.start) {
      return [];
    }
    const { start, end } = selectedInterval;
    const ISODate = start.toISO().split("T")[0];
    const currentInterval = Interval.fromDateTimes(start, end);
    return activities.filter((a) => {
      const { start, end } = a.preferredInterval;
      const preferredInterval = Interval.fromISO(
        `${ISODate}T${start}/${ISODate}T${end}`,
        {
          setZone: true,
        }
      );
      return preferredInterval.engulfs(currentInterval);
    });
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onEnter={() => {
        setExpanded(filterActivitiesByInterval().length > 0);
      }}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Запланировать дело</DialogTitle>
      <DialogContent>
        {selectedActivity.name && (
          <div className={classes.alertContainer}>
            <AlertCard
              message={`В этом интервале уже запланировано дело: "${selectedActivity.name}"`}
            />
          </div>
        )}
        <div className={classes.inputContainer}>
          <TimePicker
            className={classes.input}
            label={"Начало"}
            ampm={false}
            minutesStep={15}
            inputVariant="outlined"
            size="small"
            onChange={handleIntervalStartChange}
            value={selectedInterval.start}
          />
          <ArrowRight className={classes.arrow} />
          <TimePicker
            className={classes.input}
            label={"Конец"}
            ampm={false}
            minutesStep={15}
            inputVariant="outlined"
            size="small"
            onChange={handleIntervalEndChange}
            value={selectedInterval.end}
          />
        </div>
        <ExpansionPanel
          className={classes.expansion}
          // expanded={filterActivitiesByInterval().length > 0}
          expanded={expanded}
          onChange={() => {
            setExpanded(!expanded);
          }}
          disabled={filterActivitiesByInterval().length === 0}
        >
          <ExpansionPanelSummary
            className={classes.summary}
            expandIcon={<ExpandMore />}
          >
            Подходящие дела
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List dense className={classes.list}>
              {filterActivitiesByInterval().map((a) => (
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
        <PlanNewActivityForm
          value={newActivityName}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        {selectedActivity.name && (
          <Button
            color="primary"
            className={classes.deleteButton}
            onClick={handleActivityDelete}
          >
            Удалить дело
          </Button>
        )}
        <Button color="primary" onClick={handleClose}>
          Отмена
        </Button>
        <Button
          color="primary"
          onClick={handleActivityPlanning}
          disabled={!chosenActivity.name && !newActivityName}
        >
          ОК
        </Button>
      </DialogActions>
    </Dialog>
  );
};
