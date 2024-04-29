import { Formik } from "formik";
import * as Yup from "yup";

import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import { API_URL } from "../../constants/api";
import { AuthService } from "../../services/auth.service";
import axios from "axios";

import Select from "react-select";
import { Alert } from "../../components/admin/Alert/Alert";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Tytuł strony jest wymagany"),
  footer: Yup.string().required("Treść stopki jest wymagana"),
  menus: Yup.array().of(
    Yup.object().shape({
      active: Yup.boolean(),
      menuName: Yup.string().required("Nazwa menu jest wymagana"),
      links: Yup.array().of(
        Yup.object().shape({
          id: Yup.number(),
          name: Yup.string(),
          path: Yup.string(),
        })
      ),
    })
  ),
});

export const Settings = () => {
  const loaderData = useLoaderData();
  const { title, footer } = loaderData.site.data.site;
  const pages = loaderData.pages.data.pages;
  const initialMenu = JSON.parse(loaderData.site.data.site.menu);

  console.log(initialMenu);
  console.log(loaderData);

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const pageOptions = pages.map((page) => ({
    value: page.id,
    label: `${page.title} (adres: pages/${page.id})`,
    name: page.title,
  }));

  console.log(pageOptions);

  const handleFormSubmit = async (values) => {
    console.log(values);

    const menuSchema = values.menus.map((item, index) => ({
      menuId: index + 1,
      menuName: item.menuName,
      active: item.active,
      links: item.links.map((link) => {
        return {
          id: link.value,
          name: link.name,
          path: `pages/${link.value}`,
        };
      }),
    }));

    console.log(menuSchema);

    const updatedValues = {
      ...values,
      menu: menuSchema,
    };

    console.log(updatedValues);

    try {
      const response = await axios.patch(`${API_URL}/site`, updatedValues, {
        headers: AuthService.addHeader(),
      });

      if (response.data.code === "updateSiteCompleted") {
        setSubmitSuccess(`Ustawienia strony zostały zaktualizowane`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    } catch (error) {
      setSubmitError("Błąd wysyłania formularza");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const initialValues = {
    title: title || "",
    footer: footer || "",
    menus: initialMenu.map((menu) => ({
      active: menu.active || false,
      menuName: menu.menuName,
      links: menu.links.map((link) =>
        pageOptions.find((option) => option.value === link.id)
      ),
    })),
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
          initialValues={initialValues}
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
            setFieldValue,
            getFieldProps,
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

              <h3 className="mb-4 mt-5">Edycja rozwijanych menu</h3>
              {values.menus.map((menu, index) => (
                <div key={index}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label={`Wyświetlaj menu #${index + 1}`}
                      {...getFieldProps(`menus[${index}].active`)}
                      checked={values.menus[index].active}
                      onChange={(e) =>
                        setFieldValue(
                          `menus[${index}].active`,
                          e.target.checked
                        )
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>{`Tytuł menu #${index + 1}`}</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={!values.menus[index].active}
                      {...getFieldProps(`menus[${index}].menuName`)}
                    />
                    {errors.menus &&
                      errors.menus[index] &&
                      errors.menus[index].menuName && (
                        <div className="invalid-feedback d-block">
                          {errors.menus[index].menuName}
                        </div>
                      )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>{`Linki dla menu #${index + 1}`}</Form.Label>
                    <Select
                      isMulti
                      placeholder="Wybierz podstrony"
                      noOptionsMessage={() => "Brak kolejnych opcji"}
                      isDisabled={!values.menus[index].active}
                      options={pageOptions}
                      value={values.menus[index].links}
                      onChange={(value) =>
                        setFieldValue(`menus[${index}].links`, value)
                      }
                    />
                  </Form.Group>

                  {values.menus.length - 1 > index && <hr className="my-5" />}
                </div>
              ))}

              <Button
                className="w-100 mt-5"
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
              >
                Zapisz konfigurację
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
