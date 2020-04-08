import React, { useEffect, useContext, useState } from "react";
import { makeStyles, List } from "@material-ui/core";
import { UserContext } from "../utils/userContext";
import { getActivities } from "../services/activitiesService";
import { OnScreenMessage } from "./onScreenMessage";
import { ActivitiesListItem } from "./activitiesListItem";

const useStyles = makeStyles({
  root: {
    padding: "0 1rem 1rem",
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
});

export default function Activities() {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getActivities(user);

      setActivities(result.data);
    };

    fetchData();
  }, [user]);

  function handleActivityChoice() {
    console.log("Choice!");
  }

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
    </section>
  );
}
