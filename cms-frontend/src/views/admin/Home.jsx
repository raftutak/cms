import { Col, Container, Row } from "react-bootstrap";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getUser();

  console.log(currentUser);

  useEffect(() => {
    if (!currentUser?.userId) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [editorState, setEditorState] = useState("");

  if (!currentUser) return null;

  return (
    <>
      <Container>
        <h3 className="mb-4">Witaj, {currentUser.name}!</h3>
        <h5>
          Twoja ranga to: <strong>{currentUser.role}</strong>
        </h5>
      </Container>
    </>
  );
};
