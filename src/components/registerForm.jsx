import React, { useContext } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Link
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { UserContext } from "../utils/userContext";

const useStyles = makeStyles({
  root: {
    width: "fit-content",
    padding: "2rem 2rem 0 2rem"
  },
  actions: {
    justifyContent: "flex-end",
    marginTop: "2rem"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    marginBottom: "1.5rem"
  },
  link: {
    textDecoration: "none"
  }
});

const handleSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

const RegistrationForm = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  if (user) return <Redirect to="/" />;

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Слишком короткое имя")
          .max(50, "Слишком длинное имя"),
        email: Yup.string()
          .email("Неверный адрес email")
          .required("Введите email"),
        password: Yup.string()
          .min(5, "Пароль должен быть длиннее 5 символов")
          .required("Введите пароль")
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Создать учетную запись
              </Typography>
              <div className={classes.inputContainer}>
                <Field
                  name="name"
                  label="Ваше имя"
                  component={TextField}
                  className={classes.input}
                />
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  component={TextField}
                  className={classes.input}
                />
                <Field
                  name="password"
                  type="password"
                  label="Пароль"
                  component={TextField}
                  className={classes.input}
                />
              </div>
              <Typography variant="body2" color="textSecondary">
                Уже зарегистрированы?{" "}
                <Link component={RouterLink} to="/login">
                  Войти в систему
                </Link>
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                disabled={isSubmitting || !isValid}
                type="submit"
                color="primary"
              >
                Зарегистрироваться
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
