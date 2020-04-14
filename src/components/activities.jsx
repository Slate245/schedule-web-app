import React, { useEffect, useContext, useState } from "react";
import { makeStyles, List, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { UserContext } from "../utils/userContext";
import { getActivities } from "../services/activitiesService";
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

  const handleActivityDelete = (activity) => {
    console.log("Deleted:", activity);
  };

  return (
    <section className={classes.root}>
      {activities.length > 0 ? (
        <List className={classes.list}>
          {activities.map((a) => (
            <ActivitiesListItem
              key={a._id}
              activity={a}
              shortenName
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
        onEdit={setActivityToEdit}
        onDelete={handleActivityDelete}
      />
    </section>
  );
}
