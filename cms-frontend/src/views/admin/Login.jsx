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
import { Link, redirect, useNavigate } from "react-router-dom";

import styles from "./Auth.module.css";

import { AuthService } from "../../services/auth.service";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres email")
    .required("Adres email jest wymagany"),
  password: Yup.string().required("Hasło jest wymagane"),
});

export const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log(values);

    setLoginError("");
    try {
      const response = await AuthService.login(values.email, values.password);
      console.log(response);
      navigate("/admin");
    } catch (error) {
      console.log(error);

      if (error.response.data.code === "accountDisabled") {
        setLoginError("Konto zostało zablokowane");
      } else {
        setLoginError("Nieprawidłowy login lub hasło");
      }
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
                <h3>Logowanie</h3>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
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
                          name="email"
                          placeholder="Wprowadź email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
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
                      </Form.Group>

                      <Button
                        className="w-100"
                        type="submit"
                        variant="secondary"
                        disabled={isSubmitting}
                      >
                        Zaloguj się
                      </Button>
                      <Form.Group>
                        {loginError && showAlert && (
                          <Alert variant="danger" className="mt-3 text-center">
                            {loginError}
                          </Alert>
                        )}
                      </Form.Group>
                    </Form>
                  )}
                </Formik>

                <Link to={"/forgot-password"} className="link-secondary">
                  <p className="text-center mt-3">Zapomniałeś hasła?</p>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
