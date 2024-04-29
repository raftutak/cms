import axios from "axios";
import { Button, Container, ListGroup, Modal } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { API_URL } from "../../../constants/api";
import { useState } from "react";
import { AuthService } from "../../../services/auth.service";
import { Alert } from "../../../components/admin/Alert/Alert";

const nonRemovablePages = [1];
const pageTypeMapping = {
  homepage: "strona główna",
  custom: "stworzona",
};

export const Pages = () => {
  const loaderData = useLoaderData();

  const loadedPages = loaderData.data?.pages;

  const sortedPages = [...loadedPages].sort((a, b) => {
    return Number(b.id) - Number(a.id);
  });

  const [pages, setPages] = useState(sortedPages);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageIdToDelete, setPageIdToDelete] = useState(null);

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteConfirmation = (pageId) => {
    setShowDeleteModal(true);
    setPageIdToDelete(pageId);
  };

  const confirmDelete = async () => {
    if (pageIdToDelete) {
      try {
        const response = await axios.delete(
          `${API_URL}/pages/${pageIdToDelete}`,
          { headers: AuthService.addHeader() }
        );

        if (response.data.code === "deletePageCompleted") {
          const updatedPages = pages.filter(
            (page) => page.id !== pageIdToDelete
          );
          setPages(updatedPages);

          setSubmitSuccess(`Strona została usunięta pomyślnie`);
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
    }
    setShowDeleteModal(false);
    setPageIdToDelete(null);
  };

  return (
    <>
      <Container>
        <h3 className="mb-4">Wszystkie strony</h3>
        <div>
          <ListGroup>
            {pages.map((page) => (
              <ListGroup.Item
                key={page.id}
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="ms-2 me-auto">
                  <div>
                    Tytuł: <strong>{page.title}</strong>
                  </div>
                  <div>
                    Identyfikator: <strong>{page.id}</strong>
                  </div>
                  Typ strony: {pageTypeMapping[page.page_type]}
                </div>
                <div className="d-flex gap-2">
                  <Link to={`/admin/pages/${page.id}`}>
                    <Button className="" variant="secondary">
                      Edytuj
                    </Button>
                  </Link>
                  {nonRemovablePages.includes(page.id) ? null : (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteConfirmation(page.id)}
                    >
                      Usuń
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Container>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdź usunięcie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Czy na pewno chcesz usunąć tę stronę?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Anuluj
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>

      {showAlert && submitError && (
        <Alert message={submitError} variant="danger" />
      )}
      {showAlert && submitSuccess && (
        <Alert message={submitSuccess} variant="success" />
      )}
    </>
  );
};
