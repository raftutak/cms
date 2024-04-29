import { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { AuthService } from "../../../services/auth.service";
import { API_URL } from "../../../constants/api";
import slugify from "slugify";
import Select from "react-select";
import { useLoaderData } from "react-router-dom";
import Dropzone from "react-dropzone";

import styles from "./Posts.module.css";
import { Alert } from "../../../components/admin/Alert/Alert";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export const AddPost = () => {
  const loaderData = useLoaderData();
  const { categories } = loaderData.data;

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const editorRef = useRef(null);
  const currentUser = AuthService.getUser();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("authorId", currentUser.userId);
      formData.append(
        "slug",
        slugify(values.title, {
          lower: true,
          strict: true,
        })
      );

      if (values.categories.length > 0) {
        formData.append("categories", values.categories);
      }

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          ...AuthService.addHeader(),
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      if (response.data.code === "createPostCompleted") {
        setSubmitSuccess(`Post został dodany pomyślnie`);
        setShowAlert(true);

        resetForm();
        removeSelectedImage();
        setSelectedCategories([]);

        if (editorRef.current) {
          editorRef.current.setContent("<p>Wpisz tutaj treść posta.</p>");
        }

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);

      if (error.message === "contentEmpty") {
        setSubmitError("Treść posta nie może być pusta");
      } else {
        setSubmitError("Błąd wysyłania formularza");
      }
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const removeSelectedImage = (event) => {
    if (event) event.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Tytuł strony jest wymagany"),
    content: Yup.string().required("Treść wpisu jest wymagana"),
  });

  return (
    <>
      <Container>
        <h3 className="mb-4">Dodaj wpis na bloga</h3>

        <Formik
          initialValues={{
            title: "",
            content: "<p>Wpisz tutaj treść posta.</p>",
            categories: [],
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
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Tytuł wpisu</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Wprowadź tytuł"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="categories">
                <Form.Label>Kategorie wpisu</Form.Label>
                <Select
                  isMulti
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  value={selectedCategories}
                  placeholder="Wybierz kategorie"
                  onChange={(selectedOptions) => {
                    console.log(selectedOptions);
                    setSelectedCategories(selectedOptions);
                    setFieldValue(
                      "categories",
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      zIndex: "1000",
                      position: "absolute",
                    }),
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Obrazek główny</Form.Label>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    setSelectedFile(acceptedFiles[0]);
                    const filePreviewUrl = URL.createObjectURL(
                      acceptedFiles[0]
                    );
                    setPreviewUrl(filePreviewUrl);
                  }}
                  accept={{
                    "image/jpeg": [".jpg", ".jpeg"],
                    "image/png": [".png"],
                  }}
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isFocused,
                    isDragAccept,
                    isDragReject,
                  }) => {
                    let stylesDragozone = { ...baseStyle };
                    if (isFocused)
                      stylesDragozone = { ...stylesDragozone, ...focusedStyle };
                    if (isDragAccept)
                      stylesDragozone = { ...stylesDragozone, ...acceptStyle };
                    if (isDragReject)
                      stylesDragozone = { ...stylesDragozone, ...rejectStyle };

                    return (
                      <div {...getRootProps({ style: stylesDragozone })}>
                        <input {...getInputProps()} />
                        {!previewUrl && (
                          <p className="my-2">
                            Przeciągnij plik tutaj lub kliknij aby wybrać plik
                          </p>
                        )}
                        {previewUrl && (
                          <div className={styles.imageContainer}>
                            <img src={previewUrl} alt="Podgląd obrazka" />
                            <button
                              className={styles.removeImageButton}
                              onClick={removeSelectedImage}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Dropzone>
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Treść wpisu</Form.Label>
                <Editor
                  apiKey="17ktkzd0yksajqrjrfdzufonxdo05800y58wtqqdpzm0obqg"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Wpisz tutaj treść posta.</p>"
                  init={{
                    language: "pl",
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onBlur={() => {
                    setFieldTouched("content", true, true);
                  }}
                  onEditorChange={(value) => {
                    setFieldValue("content", value);
                  }}
                />
                {touched.content && errors.content ? (
                  <div className="invalid-feedback d-block">
                    {errors.content}
                  </div>
                ) : null}
              </Form.Group>

              <Button
                className="mt-3"
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
              >
                Dodaj wpis
              </Button>

              {showAlert && submitError && (
                <Alert message={submitError} variant="danger" />
              )}
              {showAlert && submitSuccess && (
                <Alert message={submitSuccess} variant="success" />
              )}
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};
