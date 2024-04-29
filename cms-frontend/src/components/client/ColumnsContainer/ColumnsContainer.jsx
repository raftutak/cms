import { Col, Container, Row } from "react-bootstrap";

import styles from "./ColumnsContainer.module.css";

export const ColumnsContainer = (props) => {
  const { columns } = props;

  return (
    <div
      className={
        columns.length > 1 ? styles.columnsContainer : styles.columnContainer
      }
    >
      <Container>
        <Row md={columns.length} className="py-5">
          {columns.map((item, index) => {
            return (
              <Col key={index}>
                <div
                  className={columns.length > 1 ? styles.column : styles.one}
                >
                  <h4>{item.header}</h4>
                  <p className="">{item.paragraph}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
