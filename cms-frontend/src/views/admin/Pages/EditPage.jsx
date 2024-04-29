import { useLoaderData, useParams } from "react-router-dom";

import { Container } from "react-bootstrap";

import { PageBuilder } from "../../../components/admin/PageBuilder/PageBuilder";

export const EditPage = () => {
  const params = useParams();
  const loaderData = useLoaderData();
  const currentPage = loaderData.data.page;

  return (
    <Container>
      <h3 className="mb-4">Edycja strony "{currentPage.title}"</h3>
      <PageBuilder
        pageType="edit"
        editedPageId={params.id}
        loadedPage={currentPage}
      />
    </Container>
  );
};
