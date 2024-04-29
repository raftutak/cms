import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../../constants/api";
import { AuthService } from "../../../services/auth.service";
import { Alert } from "../../../components/admin/Alert/Alert";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nazwa kategorii jest wymagana"),
});

export const AddCategory = () => {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    setSubmitError("");

    const payload = { name: values.name };
    if (values.description) payload.description = values.description;

    try {
      const response = await axios.post(`${API_URL}/categories`, payload, {
        headers: AuthService.addHeader(),
      });

      console.log(response);

      if (response.data.code === "createCategoryCompleted") {
        setSubmitSuccess("Kategoria dodana pomyślnie");
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
        <h3 className="mb-4">Dodaj kategorię</h3>
        <p>
          Użyj poniższego formularza aby dodać nową kategorię postów na blogu.
        </p>

        <Formik
          initialValues={{ name: "", description: "" }}
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
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nazwa</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Wprowadź nazwę kategorii"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Opis</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Wprowadź opis kategorii"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className="w-100"
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
              >
                Dodaj kategorię
              </Button>
            </Form>
          )}
        </Formik>
      </Container>

      {showAlert && submitError && (
        <Alert message={submitError} variant="danger" />
      )}
      {showAlert && submitSuccess && (
        <Alert message={submitSuccess} variant="success" />
      )}
    </>
  );
};
