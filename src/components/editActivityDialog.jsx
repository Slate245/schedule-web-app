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
      ? DateTime.fromISO(activity.preferredInterval.start, { setZone: true })
      : getCurrentIntervalStart(),
    to: activity.preferredInterval
      ? DateTime.fromISO(activity.preferredInterval.end, { setZone: true })
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
    duration: Yup.number()
      .min(0, "Длительность должна быть больше 0 минут")
      .max(840, "Длительность должна быть меньше 840 минут"),
    description: Yup.string(),
  });

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
              <EditActivityForm formikProps={props} />
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
              <Button color="primary" onClick={onClose}>
                Закрыть
              </Button>
              <Button
                color="primary"
                onClick={() => onEdit(props.values)}
                disabled={!props.dirty || !props.isValid || props.isSubmitting}
              >
                Сохранить
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};
