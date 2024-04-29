import { Col, Container, Row } from "react-bootstrap";
import { Card } from "../Card/Card";

import styles from "./CardsContainer.module.css";

export const CardsContainer = (props) => {
  console.log(props);

  const cards = props.cards;
  console.log(cards);

  return (
    <div
      className={
        cards?.length > 1 ? styles.columnsContainer : styles.columnContainer
      }
    >
      <Container className="my-5">
        <Row xs={1} md={cards?.length === 2 ? 2 : 3} className="g-5">
          {cards?.map((item, index) => (
            <Col
              className={cards.length > 1 ? styles.column : styles.one}
              key={index}
            >
              <Card card={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
