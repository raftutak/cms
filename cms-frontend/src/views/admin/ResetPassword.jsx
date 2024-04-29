import { Formik } from "formik";
import * as Yup from "yup";

import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";

import styles from "./Auth.module.css";
import { AuthService } from "../../services/auth.service";
import { useState } from "react";

const successResetPassword = (
  <>
    <p className="mt-4 text-center">
      Hasło zostało pomyślnie zresetowane. Możesz się teraz zalogować.
    </p>
    <Link to={"/login"} className="link-secondary">
      <p className="text-center">Powrót do ekranu logowania</p>
    </Link>
  </>
);

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same")
    .required("Potwierdzenie hasła jest wymagane"),
});

export const ResetPassword = () => {
  const data = useLoaderData();
  const email = data?.email;
  console.log(data);

  const [resetPasswordError, setResetPasswordError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [isResetCompleted, setIsResetCompleted] = useState(false);

  const handleResetPassword = async (values) => {
    console.log(values);

    setResetPasswordError("");
    try {
      const response = await AuthService.resetPassword(
        email,
        values.password,
        data.token
      );

      console.log(response);

      if (response.data.code === "resetPasswordCompleted") {
        setIsResetCompleted(true);
      }
    } catch (error) {
      console.log(error);
      setResetPasswordError("Błąd resetowania hasła");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <div className={styles.background}>
      <Container className={`${styles.container} vh-100 p-5`}>
        <Row className="mb-3">
          <h1 className="text-center">Projekt CMS</h1>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <Card>
              <Card.Body>
                <h3>Resetowanie hasła</h3>
                {isResetCompleted ? (
                  successResetPassword
                ) : email ? (
                  <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleResetPassword}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label>Nowe hasło</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Wprowadź nowe hasło"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Hasło musi mieć co najmniej 8 znaków.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="confirmPassword"
                        >
                          <Form.Label>Potwierdź hasło</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Wprowadź nowe hasło"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.confirmPassword && errors.confirmPassword
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Powtórz wprowadzone nowe hasło.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupResetButton"
                        >
                          <Button
                            className="w-100"
                            variant="secondary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Zresetuj hasło
                          </Button>
                        </Form.Group>
                        <Form.Group>
                          {resetPasswordError && showAlert && (
                            <Alert
                              variant="danger"
                              className="mt-3 text-center"
                            >
                              {resetPasswordError}
                            </Alert>
                          )}
                        </Form.Group>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <>
                    <p className="mt-4 text-center">
                      Link do resetowania hasła jest nieprawidłowy lub wygasł.
                    </p>
                    <Link to={"/login"} className="link-secondary">
                      <p className="text-center">Powrót do ekranu logowania</p>
                    </Link>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
