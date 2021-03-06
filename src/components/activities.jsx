import React, { useEffect, useContext, useState } from "react";
import { makeStyles, List, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { UserContext } from "../utils/userContext";
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../services/activitiesService";
import { OnScreenMessage } from "./onScreenMessage";
import { ActivitiesListItem } from "./activitiesListItem";
import { EditActivityDialog } from "./editActivityDialog";

const useStyles = makeStyles({
  root: {
    padding: "0 1rem",
    minHeight: "calc(100vh - 56px)",
    minWidth: "340px",
    display: "flex",
  },
  message: {
    padding: "1rem 0",
    alignSelf: "center",
  },
  list: {
    width: "100%",
  },
  fab: {
    backgroundColor: "white",
    color: "#4CAF50",
    position: "fixed",
    bottom: "56px",
    right: "0",
    margin: "0 16px 16px 0",
    alignSelf: "flex-end",
  },
});

export default function Activities() {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const [activities, setActivities] = useState([]);
  const [activityToEdit, setActivityToEdit] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getActivities(user);

      setActivities(result.data);
    };

    fetchData();
  }, [user]);

  function handleActivityChoice(activity) {
    setActivityToEdit(activity);
    handleDialogOpen();
  }

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setActivityToEdit({});
    setIsDialogOpen(false);
  }

  function createActivityObject(
    { name, from, to, duration, description },
    _id
  ) {
    const preferredInterval = {
      start: from.toISOTime({ suppressMilliseconds: true }),
      end: to.toISOTime({ suppressMilliseconds: true }),
    };
    const expectedDuration = duration === "" ? 0 : duration;
    const activityObject = {
      name,
      preferredInterval,
      expectedDuration,
      description,
    };
    if (_id) {
      activityObject._id = _id;
    }
    if (description === "") {
      delete activityObject.description;
    }
    return activityObject;
  }

  async function handleActivityEdit(formikValues) {
    const originalActivities = [...activities];
    const updatedActivities = [...activities];
    //Запись нового дела
    if (Object.keys(activityToEdit).length === 0) {
      const newActivity = createActivityObject(formikValues);
      updatedActivities.push(newActivity);

      handleDialogClose();
      setActivities([...updatedActivities]);
      try {
        const { data } = await createActivity(newActivity);
        updatedActivities.splice(-1, 1, data);
        setActivities([...updatedActivities]);
        return;
      } catch (ex) {
        console.error(ex);
        setActivities(originalActivities);
        return;
      }
    }
    //Обновление существующего дела
    const updatedActivity = createActivityObject(
      formikValues,
      activityToEdit._id
    );
    const index = updatedActivities.findIndex(
      (a) => a._id === activityToEdit._id
    );
    updatedActivities[index] = updatedActivity;

    handleDialogClose();
    setActivities([...updatedActivities]);
    try {
      const { data } = await updateActivity(updatedActivity);
      updatedActivities[index] = data;
      setActivities([...updatedActivities]);
    } catch (ex) {
      console.error(ex);
      setActivities(originalActivities);
    }
  }

  async function handleActivityDelete(activity) {
    const originalActivities = [...activities];
    const updatedActivities = [...activities];

    const activityId = activityToEdit._id;

    const index = updatedActivities.findIndex((a) => a._id === activityId);
    updatedActivities.splice(index, 1);

    handleDialogClose();
    setActivities(updatedActivities);
    try {
      await deleteActivity(activityId);
    } catch (ex) {
      console.error(ex);
      setActivities(originalActivities);
    }
  }

  return (
    <section className={classes.root}>
      {activities.length > 0 ? (
        <List className={classes.list}>
          {activities.map((a) => (
            <ActivitiesListItem
              key={a._id || `${new Date().getTime()}-${a.name}`}
              activity={a}
              shortenName
              disabled={!a._id}
              onClick={handleActivityChoice}
            />
          ))}
        </List>
      ) : (
        <OnScreenMessage
          title="В Вашем списке дел пусто :("
          subtitle="Запишите сюда дела,чтобы получать подсказки при планировании расписания."
          containerClass={classes.message}
          maxWidth="xs"
        />
      )}
      <Fab className={classes.fab} onClick={handleDialogOpen}>
        <Add />
      </Fab>
      <EditActivityDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        activity={activityToEdit}
        onEdit={handleActivityEdit}
        onDelete={handleActivityDelete}
      />
    </section>
  );
}
