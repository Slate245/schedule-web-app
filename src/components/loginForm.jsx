import React, { useContext } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Link as RouterLink, Redirect, useLocation } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import { login } from "../services/authService";

const useStyles = makeStyles({
  root: {
    width: "fit-content",
    padding: "2rem 2rem 0 2rem",
  },
  actions: {
    justifyContent: "flex-end",
    marginTop: "2rem",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "1.5rem",
  },
  link: {
    textDecoration: "none",
  },
});

const LoginForm = () => {
  const location = useLocation();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const { email, password } = values;
      await login(email, password);

      const { state } = location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      const { data: message } = ex.response;
      setErrors({ email: message, password: message });
    }
    setSubmitting(false);
  };

  const { user } = useContext(UserContext);
  const classes = useStyles();
  if (user) return <Redirect to="/" />;

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Неверный адрес email")
          .required("Введите email"),
        password: Yup.string()
          .required("Введите пароль")
          .min(5, "Пароль должен быть длиннее 4 символов"),
      })}
      onSubmit={handleLogin}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Войти в систему
              </Typography>
              <div className={classes.inputContainer}>
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
                Еще не зарегистрированы?{" "}
                <Link component={RouterLink} to="/register">
                  Создать учетную запись
                </Link>
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                disabled={isSubmitting || !isValid}
                type="submit"
                color="primary"
              >
                Войти
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
