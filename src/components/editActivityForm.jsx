import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";
import { Typography, makeStyles } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { TimePicker } from "@material-ui/pickers";
import { ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  arrow: {
    alignSelf: "center",
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
    marginBottom: "1rem",
  },
});

const timePickerField = ({ field, form, ...rest }) => {
  const currentError = form.errors[field.name];

  return (
    <TimePicker
      {...field}
      {...rest}
      ampm={false}
      minutesStep={15}
      inputVariant="outlined"
      size="small"
      error={Boolean(currentError)}
      onChange={(date) => form.setFieldValue(field.name, date)}
      onError={(error) => {
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
    />
  );
};

export const EditActivityForm = () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        name: "",
        from: DateTime.local(),
        to: DateTime.local(),
        duration: 15,
        description: "",
      }}
    >
      {({ isSubmitting }) => (
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
              component={timePickerField}
              className={classes.timePicker}
              label="С"
            />
            <ArrowRight className={classes.arrow} />
            <TimePicker
              className={classes.timePicker}
              label="До"
              ampm={false}
              minutesStep={15}
              inputVariant="outlined"
              size="small"
            />
            <Field
              component={TextField}
              name="duration"
              label="Длительность"
              size="small"
              type="number"
              variant="outlined"
              className={classes.duration}
              inputProps={{ step: 15 }}
            />
          </div>
          <Typography
            color="textSecondary"
            variant="caption"
            display="block"
            className={classes.message}
          >
            Подходящее время и планируемая длительность
          </Typography>
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
