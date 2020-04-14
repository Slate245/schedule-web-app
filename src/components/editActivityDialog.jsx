import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { DateTime } from "luxon";
import { Formik } from "formik";
import * as Yup from "yup";
import { getCurrentIntervalStart } from "../utils/getCurrentIntervalStart";
import { EditActivityForm } from "./editActivityForm";

const useStyles = makeStyles({
  message: {
    marginBottom: "1rem",
  },
  deleteButton: {
    margin: "auto auto auto 0.5rem",
  },
});

export const EditActivityDialog = ({
  open,
  onClose,
  activity,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(400));

  const initalValues = {
    name: activity.name || "",
    from: activity.preferredInterval
      ? DateTime.fromISO(activity.preferredInterval.start)
      : getCurrentIntervalStart(),
    to: activity.preferredInterval
      ? DateTime.fromISO(activity.preferredInterval.end)
      : getCurrentIntervalStart().plus({ hours: 1 }).startOf("hour"),
    duration: activity.expectedDuration || 15,
    description: activity.description || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Не может быть пустым"),
    from: Yup.date()
      .required()
      .min(
        DateTime.utc().set({ hour: 8 }).startOf("hour").toISO(),
        "Рабочие часы начинаются с 8:00"
      ),
    to: Yup.date()
      .required()
      .min(
        Yup.ref("from"),
        "Дело не может заканчиваться раньше, чем начинается"
      )
      .max(
        DateTime.utc().set({ hour: 22 }).startOf("hour").toISO(),
        "Рабочие часы заканчиваются в 22:00"
      ),
    duration: Yup.number().min(0, "Длительность должна быть больше 0"),
    description: Yup.string(),
  });

  function handleActivityEdit() {
    console.log("Activity edit!");
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Редактировать дело</DialogTitle>
      <Formik initialValues={initalValues} validationSchema={validationSchema}>
        {(props) => (
          <>
            <DialogContent>
              <Typography
                color="textSecondary"
                variant="caption"
                display="block"
                className={classes.message}
              >
                Введите или измените информацию о деле
              </Typography>
              <EditActivityForm
                formikProps={props}
                onChange={handleActivityEdit}
              />
            </DialogContent>
            <DialogActions>
              {activity.name && (
                <Button
                  color="primary"
                  className={classes.deleteButton}
                  onClick={() => onDelete(activity)}
                >
                  Удалить дело
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};
