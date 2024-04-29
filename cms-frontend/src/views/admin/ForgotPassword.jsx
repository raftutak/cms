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

import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../../services/auth.service";

const successSubmission = (
  <>
    <p className="mt-4 text-center">
      Link do resetowania hasła został wysłany, jeśli znaleziono Twój email w
      bazie danych. Link jest ważny przez 24 godziny.
    </p>
    <Link to={"/login"} className="link-secondary">
      <p className="text-center">Powrót do ekranu logowania</p>
    </Link>
  </>
);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres email")
    .required("Adres email jest wymagany"),
});

export const ForgotPassword = () => {
  const [isSent, setIsSent] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // const navigate = useNavigate();

  const handleSubmission = async (values) => {
    console.log(values);

    setSubmissionError("");
    try {
      const response = await AuthService.sendResetPassword(values.email);
      setIsSent(true);
      console.log(response);
    } catch (error) {
      console.log(error);
      setSubmissionError("Wystąpił błąd");
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
                <h3>Zapomniałem hasła</h3>
                {isSent ? (
                  successSubmission
                ) : (
                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmission}
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
                          <Form.Text className="text-muted">
                            Na wprowadzony adres email zostanie wysłana
                            wiadomość z linkiem przekierowującym do formularza
                            resetowania hasła (tylko w przypadku, gdy email
                            istnieje w systemie).
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="submitButton">
                          <Button
                            className="w-100"
                            type="submit"
                            variant="secondary"
                            disabled={isSubmitting}
                          >
                            Wyślij
                          </Button>
                        </Form.Group>
                        <Form.Group>
                          {submissionError && showAlert && (
                            <Alert
                              variant="danger"
                              className="mt-3 text-center"
                            >
                              {submissionError}
                            </Alert>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="backToLogin">
                          <Link to={"/login"} className="link-secondary">
                            <p className="text-center">
                              Powrót do ekranu logowania
                            </p>
                          </Link>
                        </Form.Group>
                      </Form>
                    )}
                  </Formik>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
