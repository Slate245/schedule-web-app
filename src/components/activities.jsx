import React from "react";
import { makeStyles } from "@material-ui/core";
import { OnScreenMessage } from "./onScreenMessage";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    minHeight: "calc(100vh - 56px)",
    minWidth: "340px",
  },
});

export default function Activities() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <OnScreenMessage
        title="В Вашем списке дел пусто :("
        subtitle="Запишите сюда дела,чтобы получать подсказки при планировании расписания."
      />
    </section>
  );
}
