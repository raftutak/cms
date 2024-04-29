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
  carousel: "Kontener ze slajdami",
  columns: "Kontener z tekstem",
  cards: "Kontener z kartami",
};

export const DropdownForm = ({ loadedPage, pageType, editedPageId }) => {
  console.log(loadedPage);

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
      case "carousel":
        initialConfig.items = [{ imageUrl: "", header: "", paragraph: "" }];
        initialConfig.quantity = 1;
        break;
      case "columns":
        initialConfig.columns = [{ header: "", paragraph: "" }];
        initialConfig.quantity = 1;
        break;
      case "cards":
        initialConfig.cards = [{ imageUrl: "", header: "", paragraph: "" }];
        initialConfig.quantity = 1;
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
    title: Yup.string().required("Tytuł strony jest wymagany"),
    elements: Yup.array().min(1, "Przynajmniej jeden element jest wymagany"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    setSubmitError("");

    try {
      const payload = { title: values.title, type: "custom", elements };
      console.log(payload);

      if (pageType === "add") {
        const response = await axios.post(`${API_URL}/pages`, payload, {
          headers: AuthService.addHeader(),
        });

        console.log(response);

        if (response.data.code === "createPageCompleted") {
          setSubmitSuccess(`Strona została dodana`);
          setShowAlert(true);

          setElements([]);
          resetForm();

          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        }
      }

      if (pageType === "edit") {
        const response = await axios.patch(
          `${API_URL}/pages/${editedPageId}`,
          payload,
          { headers: AuthService.addHeader() }
        );

        if (response.data.code === "updatePageCompleted") {
          setSubmitSuccess(`Strona została zaktualizowana`);
          setShowAlert(true);

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
                onClick={() => addElement("carousel")}
              >
                Dodaj menu rozwijane
              </Button>
              <Button
                className="mb-2"
                variant="secondary"
                onClick={() => addElement("columns")}
              >
                Dodaj link do podstrony
              </Button>
              <Button
                className="mb-2"
                variant="secondary"
                onClick={() => addElement("cards")}
              >
                Dodaj link do wpisu na blogu
              </Button>
              <Button
                className="mb-2"
                variant="secondary"
                onClick={() => addElement("cards")}
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
                                {element.config.type === "columns"
                                  ? `Liczba kolumn: ${element.config.quantity}`
                                  : null}
                                {element.config.type === "cards"
                                  ? `Liczba kart: ${element.config.quantity}`
                                  : null}
                                {element.config.type === "carousel"
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
