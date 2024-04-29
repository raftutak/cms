import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Alert, Button, Form, ListGroup } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { API_URL } from "../../../constants/api";
import { AuthService } from "../../../services/auth.service";
import { ConfigurationModal } from "./ConfigurationModal";

const typesMapping = {
  dropdown: "Menu rozwijane",
  pageLink: "Link do podstrony",
  postLink: "Link do wpisu na blogu",
  externalLink: "Link zewnętrzny",
};

export const MenuBuilder = ({ loadedPage, pageType, editedPageId }) => {
  const loadedContent = loadedPage?.content
    ? JSON.parse(loadedPage.content)
    : null;

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [elements, setElements] = useState(loadedContent ?? []);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [config, setConfig] = useState({});

  const addElement = (type) => {
    const initialConfig = {
      type: type,
      id: uuidv4(),
    };

    switch (type) {
      case "dropdown":
        initialConfig.items = [{ imageUrl: "", header: "", paragraph: "" }];
        initialConfig.quantity = 1;
        break;
      case "pageLink":
        initialConfig.content = { pageId: "", title: "", path: "" };
        break;
      case "postLink":
        initialConfig.content = { postId: "", title: "", path: "" };
        break;
      case "externalLink":
        initialConfig.content = { title: "", path: "" };
        break;
      default:
        break;
    }

    setConfig(initialConfig);
    setCurrentIndex(null);
    setModalShow(true);
  };

  const saveConfig = () => {
    if (currentIndex !== null) {
      const updatedElements = [...elements];
      updatedElements[currentIndex] = {
        ...updatedElements[currentIndex],
        config,
      };
      setElements(updatedElements);
    } else {
      setElements([...elements, { config, id: uuidv4() }]);
    }
    setModalShow(false);
    setCurrentIndex(null);
    setConfig({});
  };

  const handleDelete = (index) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
  };

  const editElement = (index) => {
    setCurrentIndex(index);
    setConfig(elements[index].config);
    setModalShow(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setElements(items);
  };

  const validationSchema = Yup.object().shape({
    elements: Yup.array().min(1, "Przynajmniej jeden element jest wymagany"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    setSubmitError("");

    try {
      const payload = { ...elements };
      console.log(payload);

      if (pageType === "add") {
        const response = await axios.post(`${API_URL}/pages`, payload, {
          headers: AuthService.addHeader(),
        });

        console.log(response);

        if (response.data.code === "updateMenuCompleted") {
          setSubmitSuccess(`Menu zostało zaktualizowane`);
          setShowAlert(true);

          setElements([]);
          resetForm();

          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        }
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
    <div>
      <Formik
        initialValues={{ title: loadedPage?.title || "" }}
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
            {/* <Form.Group className="mb-3" controlId="title">
              <Form.Label>Tytuł strony</Form.Label>
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
            </Form.Group> */}

            <p>
              Wybierz elementy, które chcesz umieścić w menu, a następnie je
              skonfiguruj.
            </p>

            <div className="d-flex flex-column">
              <Button
                className="mb-2"
                variant="secondary"
                onClick={() => addElement("dropdown")}
              >
                Dodaj menu rozwijane
              </Button>
              <Button
                className="mb-2"
                variant="secondary"
                onClick={() => addElement("pageLink")}
              >
                Dodaj link do podstrony
              </Button>
              <Button
                className="mb-2"
                variant="secondary"
                onClick={() => addElement("postLink")}
              >
                Dodaj link do wpisu na blogu
              </Button>
              <Button
                className="mb-2"
                variant="secondary"
                onClick={() => addElement("externalLink")}
              >
                Dodaj link zewnętrzny
              </Button>
            </div>

            {elements.length > 0 && (
              <div className="mt-3">
                <p>
                  Możesz zmienić kolejność zdefiniowanych elementów przeciągając
                  je na liście poniżej:
                </p>
              </div>
            )}

            <div className="mb-3">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-elements">
                  {(provided) => (
                    <ListGroup
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {elements.map((element, index) => (
                        <Draggable
                          key={element.config.id}
                          draggableId={element.config.id}
                          index={index}
                        >
                          {(provided) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="d-flex align-items-center justify-content-between"
                            >
                              <div onClick={() => editElement(index)}>
                                <h4>{typesMapping[element.config.type]}</h4>
                                {element.config.type === "dropdown"
                                  ? `Liczba kolumn: ${element.config.quantity}`
                                  : null}
                                {element.config.type === "pageLink"
                                  ? `Liczba kart: ${element.config.quantity}`
                                  : null}
                                {element.config.type === "postLink"
                                  ? `Liczba slajdów: ${element.config.quantity}`
                                  : null}
                                {element.config.type === "externalLink"
                                  ? `Liczba slajdów: ${element.config.quantity}`
                                  : null}
                              </div>
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(index)}
                              >
                                Usuń
                              </Button>
                            </ListGroup.Item>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ListGroup>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {elements.length > 0 && (
              <Button
                className="w-100"
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
              >
                {pageType === "add" ? "Utwórz stronę" : "Zapisz zmiany"}
              </Button>
            )}

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

      <ConfigurationModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        config={config}
        setConfig={setConfig}
        saveConfig={saveConfig}
      />
    </div>
  );
};
