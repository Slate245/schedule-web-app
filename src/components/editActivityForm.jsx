import React from "react";
import { Formik, Field, Form, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";
import { getCurrentIntervalStart } from "../utils/getCurrentIntervalStart";
import {
  Typography,
  TextField as MuiTextField,
  makeStyles,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { TimePicker } from "@material-ui/pickers";
import { ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  arrow: {
    marginTop: "0.5rem",
    color: "rgba(0,0,0,0.54)",
    gridArea: "a",
  },
  timePicker: {
    width: "4.5rem",
    flexShrink: "0",
  },
  input: {
    marginBottom: "1rem",
  },

  duration: {
    marginLeft: "1rem",
  },
  message: {
    margin: "0.25rem 0.875rem 1rem",
  },
});

//Taken from Formik-Material-UI source, but slightly modified
function fieldToTextField({
  disabled,
  field,
  form: { isSubmitting, touched, errors },
  ...props
}) {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    ...props,
    ...field,
    error: showError,
    disabled: disabled ?? isSubmitting,
    variant: props.variant,
  };
}

const DurationField = ({ children, ...props }) => {
  return <MuiTextField {...fieldToTextField(props)}>{children}</MuiTextField>;
};

const TimePickerField = ({ field, form, ...rest }) => {
  const currentError = form.errors[field.name];
  const value = DateTime.fromISO(field.value, { zone: "utc" });

  return (
    <TimePicker
      {...field}
      {...rest}
      name={field.name}
      value={value}
      ampm={false}
      minutesStep={15}
      inputVariant="outlined"
      size="small"
      error={Boolean(currentError)}
      onChange={(date) => {
        form.setFieldValue(field.name, date, true);
      }}
    />
  );
};

const Error = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography
      color="error"
      variant="caption"
      display="block"
      className={classes.message}
    >
      {children}
    </Typography>
  );
};

export const EditActivityForm = () => {
  const classes = useStyles();
  const currentTimeFormatted = getCurrentIntervalStart();
  return (
    <Formik
      initialValues={{
        name: "",
        from: currentTimeFormatted.toISO(),
        to: currentTimeFormatted.plus({ hours: 1 }).startOf("hour").toISO(),
        duration: 15,
        description: "",
      }}
      validationSchema={Yup.object({
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
      })}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Field
            name="name"
            component={TextField}
            label="Название дела"
            size="small"
            type="text"
            variant="outlined"
            fullWidth
            className={classes.input}
          />
          <div className={classes.container}>
            <Field
              name="from"
              component={TimePickerField}
              className={classes.timePicker}
              label="С"
            />
            <ArrowRight className={classes.arrow} />
            <Field
              name="to"
              component={TimePickerField}
              className={classes.timePicker}
              label="До"
            />
            <Field
              component={DurationField}
              name="duration"
              label="Длительность"
              size="small"
              type="number"
              variant="outlined"
              className={classes.duration}
              inputProps={{ step: 15, min: 0 }}
            />
          </div>
          {errors.to && touched.to ? (
            <ErrorMessage name="to" component={Error} />
          ) : errors.from && touched.from ? (
            <ErrorMessage name="from" component={Error} />
          ) : errors.duration && touched.duration ? (
            <ErrorMessage name="duration" component={Error} />
          ) : (
            <Typography
              color="textSecondary"
              variant="caption"
              display="block"
              className={classes.message}
            >
              Подходящее время и планируемая длительность
            </Typography>
          )}
          <Field
            component={TextField}
            name="description"
            label="Описание"
            size="small"
            type="text"
            variant="outlined"
            fullWidth
            multiline
          />
        </Form>
      )}
    </Formik>
  );
};
