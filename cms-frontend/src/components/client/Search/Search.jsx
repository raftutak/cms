import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${query}`);
    setQuery("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Wpisz frazę..."
            className="mr-sm-2"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </Col>
        <Col xs="auto">
          <Button disabled={!query} variant="secondary" type="submit">
            Szukaj
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
