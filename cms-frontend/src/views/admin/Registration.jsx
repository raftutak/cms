import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

import { AuthService } from "../../services/auth.service";
import { useState } from "react";

import { Link } from "react-router-dom";

import styles from "./Auth.module.css";

import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres email")
    .required("Adres email jest wymagany"),
  name: Yup.string()
    .min(2, "Pole musi zawierać co najmniej 2 znaki")
    .required("Pole jest wymagane"),
  password: Yup.string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same")
    .required("Potwierdzenie hasła jest wymagane"),
});

const successRegistration = (
  <>
    <p className="mt-4 text-center">
      Konto zarejestrowane pomyślnie. Możesz się teraz zalogować.
    </p>
    <Link to={"/login"} className="link-secondary">
      <p className="text-center">Powrót do ekranu logowania</p>
    </Link>
  </>
);

export const Registration = () => {
  const data = useLoaderData();
  const email = data?.email;
  const role = data?.role;

  const [registrationError, setRegistrationError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (values) => {
    setRegistrationError("");
    try {
      const response = await AuthService.register(
        values.name,
        email,
        values.password,
        data.token,
        role
      );

      if (response.data.code === "userRegistered") {
        setIsRegistered(true);
      }
    } catch (error) {
      console.log(error);
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
                <h3>Rejestracja</h3>
                {isRegistered ? (
                  successRegistration
                ) : email ? (
                  <Formik
                    initialValues={{
                      email,
                      name: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
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
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Adres email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Wprowadź email"
                            disabled
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && errors.email}
                          />
                          <Form.Text className="text-muted">
                            Adres email zaproszonego użytkownika.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Imię i nazwisko</Form.Label>
                          <Form.Control
                            type="input"
                            name="name"
                            placeholder="Wprowadź imię i nazwisko"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.name && errors.name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Imię i nazwisko będą wyświetlone przy postach na
                            blogu.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label>Hasło</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Wprowadź hasło"
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
                            placeholder="Wprowadź hasło"
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
                            Powtórz wprowadzone hasło.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupRegisterButton"
                        >
                          <Button
                            className="w-100"
                            type="submit"
                            variant="secondary"
                            disabled={isSubmitting}
                          >
                            Zarejestruj się
                          </Button>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupBackToLogin"
                        >
                          <Link to={"/login"} className="link-secondary">
                            <p className="text-center">
                              Powrót do ekranu logowania
                            </p>
                          </Link>
                        </Form.Group>
                        <Form.Group>
                          {registrationError && showAlert && (
                            <Alert
                              variant="danger"
                              className="mt-3 text-center"
                            >
                              {registrationError}
                            </Alert>
                          )}
                        </Form.Group>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <>
                    <p className="mt-4 text-center">
                      Link rejestracyjny jest nieprawidłowy lub wygasł.
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
