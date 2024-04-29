import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

import { Button, Container, ListGroup, Modal, Form } from "react-bootstrap";

import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { API_URL } from "../../../constants/api";
import { AuthService } from "../../../services/auth.service";
import { Alert } from "../../../components/admin/Alert/Alert";

export const Categories = () => {
  const loaderData = useLoaderData();

  const loadedCategories = loaderData.data?.categories;

  const sortedCategories = [...loadedCategories].sort((a, b) => {
    return Number(b.id) - Number(a.id);
  });

  const [categories, setCategories] = useState(sortedCategories);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteConfirmation = (categoryId) => {
    setShowDeleteModal(true);
    setCategoryIdToDelete(categoryId);
  };

  const confirmDelete = async () => {
    if (categoryIdToDelete) {
      try {
        const response = await axios.delete(
          `${API_URL}/categories/${categoryIdToDelete}`,
          { headers: AuthService.addHeader() }
        );

        if (response.data.code === "deleteCategoryCompleted") {
          const updatedCategories = categories.filter(
            (category) => category.id !== categoryIdToDelete
          );
          setCategories(updatedCategories);

          setSubmitSuccess(`Kategoria została usunięta pomyślnie`);
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
    setCategoryIdToDelete(null);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState({
    id: null,
    name: "",
    description: "",
  });

  const handleEditClick = (category) => {
    setEditingCategory({
      id: category.id,
      name: category.name,
      description: category.description,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditingCategory({ ...editingCategory, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/categories/${editingCategory.id}`,
        {
          name: editingCategory.name,
          description: editingCategory.description,
        },
        { headers: AuthService.addHeader() }
      );

      if (response.data.code === "updateCategoryCompleted") {
        const updatedCategories = categories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...editingCategory }
            : category
        );

        setCategories(updatedCategories);
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h3 className="mb-4">Wszystkie kategorie</h3>
        <p>Jako administrator możesz edytować oraz usuwać kategorie.</p>
        <div>
          <ListGroup>
            {categories.length ? (
              categories.map((category) => (
                <ListGroup.Item
                  key={category.id}
                  as="li"
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="ms-2 me-auto">
                    <div>
                      Nazwa: <strong>{category.name}</strong>
                    </div>
                    <div>
                      Identyfikator: <strong>{category.id}</strong>
                    </div>
                    <div>Opis: {category.description}</div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEditClick(category)}
                    >
                      Edytuj
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDeleteConfirmation(category.id)}
                    >
                      Usuń
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p>Brak kategorii.</p>
            )}
          </ListGroup>
        </div>
      </Container>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdź usunięcie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Czy na pewno chcesz usunąć tę kategorię?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Anuluj
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj kategorię</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nazwa kategorii</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editingCategory.name}
              onChange={handleEditChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Opis kategorii</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={editingCategory.description}
              onChange={handleEditChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Zapisz zmiany
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
