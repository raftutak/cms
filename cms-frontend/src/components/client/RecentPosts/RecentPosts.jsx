import { Col, Row } from "react-bootstrap";

import { PostCardBlog } from "../PostCardBlog/PostCardBlog";

export const RecentPosts = ({ posts }) => {
  return (
    <div>
      <Row xs={1} md={1} className="g-3">
        {posts.length > 0 ? (
          <>
            {posts.map((item, index) => (
              <Col key={index}>
                <PostCardBlog card={item} />
              </Col>
            ))}
          </>
        ) : (
          <p>Brak wpisów danego typu.</p>
        )}
      </Row>
    </div>
  );
};
