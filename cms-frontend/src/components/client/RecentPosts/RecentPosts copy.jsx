import { Col, Container, Form, Row } from "react-bootstrap";
import { Card } from "../Card/Card";

import styles from "./RecentPosts.module.css";
import { PostCardBlog } from "../PostCardBlog/PostCardBlog";

export const RecentPosts = ({ posts }) => {
  return (
    <div
      className={
        posts.length > 1 ? styles.columnsContainer : styles.columnContainer
      }
    >
      <Row xs={1} md={1} className="g-3">
        {posts.length > 0 ? (
          <>
            {posts.map((item, index) => (
              <Col
                className={posts.length > 1 ? styles.column : styles.one}
                key={index}
              >
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
