import { Container } from "react-bootstrap";

import { PageBuilder } from "../../../components/admin/PageBuilder/PageBuilder";

export const AddPage = () => {
  return (
    <Container>
      <h3 className="mb-4">Dodaj stronę</h3>
      <PageBuilder pageType="add" />
    </Container>
  );
};
