import { Formik } from "formik";
import * as Yup from "yup";

import { Alert, Button, Container, Form, ListGroup } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import { API_URL } from "../../constants/api";
import { AuthService } from "../../services/auth.service";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Tytuł strony jest wymagany"),
  footer: Yup.string().required("Treść stopki jest wymagana"),
  menu: Yup.array().max(4, "Można wybrać maksymalnie 4 elementy menu"),
});

export const Settings = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);
  const { title, footer } = loaderData.data.site;
  const pages = loaderData.data.pages;
  const menu = JSON.parse(loaderData.data.site.menu);

  console.log(menu);

  console.log(pages);
  console.log(loaderData);

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = async (values) => {
    const menuSchema = [
      {
        id: values.menu1,
        name: pages.find((page) => page.id === Number(values.menu1)).title,
        path: `pages/${values.menu1}`,
      },
      {
        id: values.menu2,
        name: pages.find((page) => page.id === Number(values.menu2)).title,
        path: `pages/${values.menu2}`,
      },
      {
        id: values.menu3,
        name: pages.find((page) => page.id === Number(values.menu3)).title,
        path: `pages/${values.menu3}`,
      },
      {
        id: values.menu4,
        name: pages.find((page) => page.id === Number(values.menu4)).title,
        path: `pages/${values.menu4}`,
      },
    ];

    values.menu = menuSchema;

    try {
      const response = await axios.patch(`${API_URL}/site`, values, {
        headers: AuthService.addHeader(),
      });

      console.log(response);

      if (response.data.code === "updateSiteCompleted") {
        setSubmitSuccess(`Ustawienia strony zostały zaktualizowane`);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);

      setSubmitError("Błąd wysyłania formularza");

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <>
      <Container>
        <h3 className="mb-4">Ustawienia strony</h3>
        <p>
          Użyj poniższego formularza aby zmodyfikować tytuł strony, elementy
          menu oraz stopkę.
        </p>

        <Formik
          initialValues={{
            title: title || "",
            footer: footer || "",
            menu1: menu?.[0]?.id || "1",
            menu2: menu?.[1]?.id || "2",
            menu3: menu?.[2]?.id || "3",
            menu4: menu?.[3]?.id || "4",
          }}
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
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Wprowadź tytuł strony"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="footer">
                <Form.Label>Stopka</Form.Label>
                <Form.Control
                  type="text"
                  name="footer"
                  placeholder="Wprowadź tekst stopki"
                  value={values.footer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.footer && errors.footer}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.footer}
                </Form.Control.Feedback>
              </Form.Group>

              <h3 className="mb-4 mt-5">Ustawienia menu głównego</h3>

              <Form.Group className="mb-3" controlId="menu1">
                <Form.Label>Element #1</Form.Label>
                <Form.Select
                  name="menu1"
                  value={values.menu1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.menu1 && errors.menu1}
                >
                  {pages.map((page) => {
                    return (
                      <option key={page.id} value={page.id}>
                        {page.id} - {page.title} - adres: pages/{page.id}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.menu1}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="menu2">
                <Form.Label>Element #2</Form.Label>
                <Form.Select
                  name="menu2"
                  value={values.menu2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.menu2 && errors.menu2}
                >
                  {pages.map((page) => {
                    return (
                      <option key={page.id} value={page.id}>
                        {page.id} - {page.title} - adres: pages/{page.id}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.menu2}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="menu3">
                <Form.Label>Element #3</Form.Label>
                <Form.Select
                  name="menu3"
                  value={values.menu3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.menu3 && errors.menu3}
                >
                  {pages.map((page) => {
                    return (
                      <option key={page.id} value={page.id}>
                        {page.id} - {page.title} - adres: pages/{page.id}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.menu3}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="menu4">
                <Form.Label>Element #4</Form.Label>
                <Form.Select
                  name="menu4"
                  value={values.menu4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.menu4 && errors.menu4}
                >
                  {pages.map((page) => {
                    return (
                      <option key={page.id} value={page.id}>
                        {page.id} - {page.title} - adres: pages/{page.id}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.menu4}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className="w-100"
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
              >
                Zapisz konfigurację
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
