import { Formik } from "formik";
import * as Yup from "yup";
import { AuthService } from "../../../services/auth.service";
import { Alert, Button, Form } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same")
    .required("Potwierdzenie hasła jest wymagane"),
});

export const ResetPasswordForm = ({
  resetPasswordLoaderData,
  resetPasswordError,
  setResetPasswordError,
  setIsResetCompleted,
  showAlert,
  setShowAlert,
}) => {
  const handleResetPassword = async (values) => {
    console.log(values);

    setResetPasswordError("");
    try {
      const response = await AuthService.resetPassword(
        resetPasswordLoaderData.email,
        values.password,
        resetPasswordLoaderData.token
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
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Potwierdź hasło</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Wprowadź nowe hasło"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.confirmPassword && errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Powtórz wprowadzone nowe hasło.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupResetButton">
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
              <Alert variant="danger" className="mt-3 text-center">
                {resetPasswordError}
              </Alert>
            )}
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};
