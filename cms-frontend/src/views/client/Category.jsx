import { useLoaderData, useParams } from "react-router-dom";
import { RecentPosts } from "../../components/client/RecentPosts/RecentPosts";
import { Badge, Col, Container, Form, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";

export const Category = () => {
  const loaderData = useLoaderData();
  const { categoryId } = useParams();
  console.log(loaderData);
  const { posts: loadedPosts } = loaderData.posts.data;
  const { categories } = loaderData.categories.data;

  const blogSort = localStorage.getItem("BLOG_SORT") || "DESC";
  const [sort, setSort] = useState(blogSort);
  const [posts, setPosts] = useState([...loadedPosts]);

  useEffect(() => {
    localStorage.setItem("BLOG_SORT", sort);
    const sortedPosts = [...loadedPosts].sort((a, b) => {
      return sort === "DESC"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at);
    });
    setPosts(sortedPosts);
  }, [sort, loadedPosts]);

  const changeSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <Container className="p-4">
      <Row>
        <Col md={3} className="order-md-2 mb-4">
          <h2 className="mb-4">Kategorie</h2>
          <div className="d-flex gap-2 flex-wrap">
            {categories.length > 0 &&
              categories.map((category) => (
                <LinkContainer
                  key={category.id}
                  to={`/category/${category.id}`}
                  style={{ cursor: "pointer" }}
                >
                  <Badge
                    className="py-2 flex-grow-1"
                    bg="secondary"
                    title={category.description}
                  >
                    {category.name}
                  </Badge>
                </LinkContainer>
              ))}
          </div>
        </Col>

        <Col md={9} className="order-md-1">
          <div className="d-flex justify-content-between">
            <h2 className="mb-4">
              Kategoria:{" "}
              {
                categories.find(
                  (category) => category.id === Number(categoryId)
                ).name
              }
            </h2>
            <div className="w-auto">
              <Form.Select name="sort" value={sort} onChange={changeSort}>
                <option value="DESC">Od najnowszego</option>
                <option value="ASC">Od najstarszego</option>
              </Form.Select>
            </div>
          </div>
          <RecentPosts posts={posts} />
        </Col>
      </Row>
    </Container>
  );
};
