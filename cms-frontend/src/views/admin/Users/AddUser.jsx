import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../../constants/api";
import { AuthService } from "../../../services/auth.service";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres email")
    .required("Adres email jest wymagany"),
  role: Yup.string()
    .oneOf(["MODERATOR", "ADMINISTRATOR"], "Nieprawidłowa rola")
    .required("Rola jest wymagana"),
});

export const AddUser = () => {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);

    setSubmitError("");
    try {
      const response = await axios.post(
        `${API_URL}/invitation/send`,
        {
          email: values.email,
          role: values.role,
        },
        { headers: AuthService.addHeader() }
      );

      console.log(response);

      if (response.data.code === "inviteCompleted") {
        setSubmitSuccess(
          `Zaproszenie zostało wysłane na adres ${values.email}`
        );
        setShowAlert(true);

        resetForm();

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error === "userExists") {
        setSubmitError("Użytkownik o takim adresie email istnieje");
      } else {
        setSubmitError("Błąd wysyłania formularza");
      }
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <>
      <Container>
        <h3 className="mb-4">Dodaj użytkownika</h3>
        <p>
          Użyj poniższego formularza żeby wysłać link z zaproszeniem na adres
          email nowego użytkownika.
        </p>
        <p>Link będzie ważny przez 24 godziny.</p>

        <Formik
          initialValues={{ email: "", role: "MODERATOR" }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
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

              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Rola</Form.Label>
                <Form.Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.role && errors.role}
                >
                  <option value="MODERATOR">Moderator</option>
                  <option value="ADMINISTRATOR">Administrator</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.role}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className="w-100"
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
              >
                Wyślij
              </Button>
              <Form.Group>
                {submitError && showAlert && (
                  <Alert variant="danger" className="mt-3 text-center">
                    {submitError}
                  </Alert>
                )}
                {submitSuccess && showAlert && (
                  <Alert variant="success" className="mt-3 text-center">
                    {submitSuccess}
                  </Alert>
                )}
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};
