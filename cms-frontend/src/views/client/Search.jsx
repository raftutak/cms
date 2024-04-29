import { Col, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { SearchResults } from "../../components/client/RecentPosts/SearchResults";
import { PageCard } from "../../components/client/PostCardBlog/PageCard";

export const Search = () => {
  const loaderData = useLoaderData();
  const pagesResults = loaderData.data.pages;
  const postsResults = loaderData.data.posts;

  console.log(postsResults);

  return (
    <Container className="p-4">
      <Row className="mb-4">
        <Col md={9} className="order-md-1">
          <h2 className="mb-4">Wyniki w podstronach</h2>
          <Row xs={1} md={1} className="g-3">
            {pagesResults.length > 0 ? (
              <>
                {pagesResults.map((item, index) => (
                  <Col key={index}>
                    <PageCard card={item} />
                  </Col>
                ))}
              </>
            ) : (
              <p>Brak wyników wyszukiwania w podstronach.</p>
            )}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={9} className="order-md-1">
          <h2 className="mb-4">Wyniki we wpisach</h2>
          {postsResults.length > 0 ? (
            <SearchResults posts={postsResults} />
          ) : (
            <p>Brak wyników wyszukiwania we wpisach.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};
