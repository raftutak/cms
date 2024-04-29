import axios from "axios";
import { Button, Container, ListGroup, Modal } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { API_URL } from "../../../constants/api";
import { useState } from "react";
import { AuthService } from "../../../services/auth.service";
import { format, addHours } from "date-fns";

import { Alert } from "../../../components/admin/Alert/Alert";

export const Posts = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);

  const loadedPosts = loaderData.posts?.data?.posts;

  const sortedPosts = [...loadedPosts].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const [posts, setPosts] = useState(sortedPosts);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const createdDate = (post) => {
    return format(addHours(new Date(post.created_at), 0), "dd.MM.yyyy, HH:mm");
  };

  const updatedDate = (post) => {
    return format(addHours(new Date(post.updated_at), 0), "dd.MM.yyyy, HH:mm");
  };

  const handleDeleteConfirmation = (postId) => {
    setShowDeleteModal(true);
    setPostIdToDelete(postId);
  };

  const confirmDelete = async () => {
    if (postIdToDelete) {
      try {
        const response = await axios.delete(
          `${API_URL}/posts/${postIdToDelete}`,
          { headers: AuthService.addHeader() }
        );

        if (response.data.code === "deletePostCompleted") {
          const updatedPosts = posts.filter(
            (post) => post.id !== postIdToDelete
          );
          setPosts(updatedPosts);

          setSubmitSuccess(`Post został usunięty pomyślnie`);
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
    setPostIdToDelete(null);
  };

  return (
    <>
      <Container>
        <h3 className="mb-4">Wszystkie posty</h3>
        <div>
          <ListGroup>
            {posts.map((post) => (
              <ListGroup.Item
                key={post.id}
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="ms-2 me-auto">
                  <div>
                    Tytuł: <strong>{post.title}</strong>
                  </div>
                  <div>
                    Identyfikator: <strong>{post.id}</strong>
                  </div>
                  <div>
                    Autor: {post?.author?.name || "użytkownik usunięty"}
                  </div>
                  <div>Data dodania: {createdDate(post)}</div>
                  {createdDate(post) !== updatedDate(post) && (
                    <div>Data aktualizacji: {updatedDate(post)}</div>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <Link to={`/admin/posts/${post.id}`}>
                    <Button className="" variant="secondary">
                      Edytuj
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => handleDeleteConfirmation(post.id)}
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
        <Modal.Body>Czy na pewno chcesz usunąć tego posta?</Modal.Body>
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
