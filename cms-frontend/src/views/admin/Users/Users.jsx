import axios from "axios";
import { Button, Container, ListGroup, Modal, Form } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { API_URL } from "../../../constants/api";
import { useContext, useState } from "react";
import { AuthService } from "../../../services/auth.service";
import { UserContext } from "../../../contexts/UserContext";

import styles from "./Users.module.css";

export const Users = () => {
  const loaderData = useLoaderData();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [users, setUsers] = useState(loaderData.data.users);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const { userId } = AuthService.getUser();

  const handleActiveToggleClick = async (id, activeStatus) => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${id}/active`,
        {
          active: activeStatus,
        },
        { headers: AuthService.addHeader() }
      );

      if (response.data.code === "activeUpdateCompleted") {
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            return { ...user, active: activeStatus };
          }
          return user;
        });
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirmation = (userId) => {
    setShowDeleteModal(true);
    setUserIdToDelete(userId);
  };

  const confirmDelete = async () => {
    if (userIdToDelete) {
      try {
        const response = await axios.delete(
          `${API_URL}/users/${userIdToDelete}`,
          { headers: AuthService.addHeader() }
        );

        if (response.data.code === "userDeleteCompleted") {
          const updatedUsers = users.filter(
            (user) => user.id !== userIdToDelete
          );
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState({
    id: null,
    name: "",
    role: "",
  });

  const handleEditClick = (user) => {
    setEditingUser({ id: user.id, name: user.name, role: user.role });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${editingUser.id}`,
        {
          name: editingUser.name,
          role: editingUser.role,
        },
        { headers: AuthService.addHeader() }
      );

      if (response.data.code === "userUpdateCompleted") {
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id ? { ...user, ...editingUser } : user
        );

        const lolcalStorageData = AuthService.getUser();
        if (editingUser.id === lolcalStorageData.userId) {
          lolcalStorageData.name = editingUser.name;
          localStorage.setItem("user", JSON.stringify(lolcalStorageData));
          setCurrentUser((previousCurrentUser) => {
            return { ...previousCurrentUser, name: editingUser.name };
          });
        }

        setUsers(updatedUsers);
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h3 className="mb-4">Wszyscy użytkownicy</h3>
        <p>
          Jako administrator możesz edytować, zablokować, odblokować oraz usuwać
          użytkowników.
        </p>
        <p>
          <strong>
            Nie ma możliwości zablokowania lub usunięcia własnego konta.
          </strong>
        </p>
        <p>
          <strong>
            Aby edytować własne konto, wejdź w edycję profilu w prawym górnym
            rogu ekranu.
          </strong>
        </p>
        <div>
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item
                key={user.id}
                as="li"
                className={`${
                  user.id === currentUser.userId
                    ? styles.activeUserBackground
                    : ""
                } d-flex justify-content-between align-items-center`}
              >
                <div className="ms-2 me-auto">
                  <div>
                    Imię i nazwisko: <strong>{user.name}</strong>
                  </div>
                  <div>
                    Identyfikator: <strong>{user.id}</strong>
                  </div>
                  <div>Email: {user.email}</div>
                  <div>Ranga: {user.role.toLowerCase()}</div>
                  <div>Status: {user.active ? "Aktywny" : "Zablokowany"}</div>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    disabled={user.id === userId}
                    variant="secondary"
                    onClick={() => handleEditClick(user)}
                  >
                    Edytuj
                  </Button>

                  {user.active ? (
                    <Button
                      disabled={user.id === userId}
                      variant="warning"
                      onClick={() => handleActiveToggleClick(user.id, false)}
                    >
                      Zablokuj
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handleActiveToggleClick(user.id, true)}
                    >
                      Odblokuj
                    </Button>
                  )}

                  <Button
                    disabled={user.id === userId}
                    variant="danger"
                    onClick={() => handleDeleteConfirmation(user.id)}
                  >
                    Usuń
                  </Button>
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
        <Modal.Body>Czy na pewno chcesz usunąć tego użytkownika?</Modal.Body>
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
          <Modal.Title>Edytuj użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nazwa użytkownika</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editingUser.name}
              onChange={handleEditChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ranga</Form.Label>
            <Form.Select
              as="select"
              name="role"
              value={editingUser.role}
              onChange={handleEditChange}
            >
              <option value="ADMINISTRATOR">Administrator</option>
              <option value="MODERATOR">Moderator</option>
            </Form.Select>
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
    </>
  );
};
