import { Badge, Card, Card as CardBootstrap } from "react-bootstrap";
import CardMock from "../../../assets/card-mock.svg";
import { format, addHours } from "date-fns";
import { LinkContainer } from "react-router-bootstrap";

import styles from "./PostCardBlog.module.css";

export const PageCard = ({ card }) => {
  return (
    <LinkContainer className={styles.card} to={`/pages/${card.id}`}>
      <CardBootstrap className="d-flex flex-row">
        <CardBootstrap.Body>
          <CardBootstrap.Title>
            <h4>{card.title}</h4>
          </CardBootstrap.Title>
          {/* 
          <div className="d-flex gap-2 mt-3">
            {card.categories?.length > 0 &&
              card.categories.map((category) => (
                <LinkContainer
                  key={category.id}
                  className={styles.card}
                  to={`/category/${category.id}`}
                >
                  <Badge
                    onClick={(event) => event.stopPropagation()}
                    className="p-2"
                    bg="secondary"
                  >
                    {category.name}
                  </Badge>
                </LinkContainer>
              ))}
          </div> */}
        </CardBootstrap.Body>
      </CardBootstrap>
    </LinkContainer>
  );
};
