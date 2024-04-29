import { Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormCheck,
} from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { API_URL } from "../../constants/api";
import axios from "axios";
import { AuthService } from "../../services/auth.service";
import { UserContext } from "../../contexts/UserContext";
import { Alert } from "../../components/admin/Alert/Alert";

export const Profile = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { id, email, name, role } = loaderData.data.user;

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Imię i nazwisko powinny mieć co najmniej 2 znaki")
      .required("Imię i nazwisko są wymagane"),
    password: showPasswordFields
      ? Yup.string()
          .min(8, "Hasło musi mieć co najmniej 8 znaków")
          .required("Hasło jest wymagane")
      : Yup.string(),
    confirmPassword: showPasswordFields
      ? Yup.string()
          .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same")
          .required("Potwierdzenie hasła jest wymagane")
      : Yup.string(),
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const payload = {
      name: values.name,
      ...(showPasswordFields && { password: values.password }),
    };
    console.log(payload);

    setSubmitError("");
    try {
      const response = await axios.patch(
        `${API_URL}/users/${id}/updateProfile`,
        payload,
        { headers: AuthService.addHeader() }
      );

      console.log(response);

      if (response.data.code === "profileUpdateCompleted") {
        const userData = AuthService.getUser();
        userData.name = values.name;
        localStorage.setItem("user", JSON.stringify(userData));
        setCurrentUser((previousCurrentUser) => {
          return { ...previousCurrentUser, name: values.name };
        });

        setSubmitSuccess("Twoje dane zostały zaktualizowane pomyślnie");
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Container>
        <h3 className="mb-4">Edytuj profil</h3>
        <p>Użyj poniższego formularza do zmiany swojego imienia i nazwiska.</p>
        <p>Opcjonalnie możesz również zmienić swoje hasło.</p>

        <Formik
          initialValues={{
            name,
            password: "",
            confirmPassword: "",
            changePassword: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setValues }) => {
            handleFormSubmit(values, { setSubmitting });

            setValues({
              name: values.name,
              password: "",
              confirmPassword: "",
              changePassword: false,
            });

            setShowPasswordFields(false);
          }}
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
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <FormGroup className="mb-3" controlId="email">
                <FormLabel>Imię i nazwisko</FormLabel>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Wprowadź imię i nazwisko"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && errors.name}
                />
                <FormControl.Feedback type="invalid">
                  {errors.name}
                </FormControl.Feedback>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormCheck
                  type="checkbox"
                  id="changePasswordCheckbox"
                  label="Chcę zmienić hasło"
                  name="changePassword"
                  checked={values.changePassword}
                  onChange={(event) => {
                    setFieldValue("changePassword", event.target.checked);
                    setShowPasswordFields(event.target.checked);
                  }}
                />
              </FormGroup>

              {showPasswordFields && (
                <>
                  <FormGroup className="mb-3" controlId="password">
                    <FormLabel>Hasło</FormLabel>
                    <FormControl
                      type="password"
                      name="password"
                      placeholder="Wprowadź hasło"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && errors.password}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.password}
                    </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel htmlFor="confirmPassword">
                      Potwierdź hasło
                    </FormLabel>
                    <FormControl
                      type="password"
                      name="confirmPassword"
                      placeholder="Potwierdź hasło"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.confirmPassword}
                    </FormControl.Feedback>
                  </FormGroup>
                </>
              )}

              <Button
                className="w-100"
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
              >
                Zapisz
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
