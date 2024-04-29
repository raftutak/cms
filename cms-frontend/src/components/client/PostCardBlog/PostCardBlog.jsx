import { Badge, Card, Card as CardBootstrap } from "react-bootstrap";
import CardMock from "../../../assets/card-mock.svg";
import { format, addHours } from "date-fns";
import { LinkContainer } from "react-router-bootstrap";

import styles from "./PostCardBlog.module.css";
import { API_HOST_URL } from "../../../constants/api";

export const PostCardBlog = ({ card }) => {
  const createdDate = format(
    addHours(new Date(card.created_at), 0),
    "dd.MM.yyyy, HH:mm"
  );

  const updatedDate = format(
    addHours(new Date(card.updated_at), 0),
    "dd.MM.yyyy, HH:mm"
  );

  return (
    <LinkContainer className={styles.card} to={`/blog/${card.slug}`}>
      <CardBootstrap className="d-flex flex-row">
        {card.image?.filepath ? (
          <CardBootstrap.Img
            variant="top"
            src={`${API_HOST_URL}/${card.image.filepath}`}
            style={{ maxWidth: "300px", height: "auto", objectFit: "cover" }}
          />
        ) : (
          <CardBootstrap.Img
            variant="top"
            src={CardMock}
            style={{ maxWidth: "300px", height: "auto", objectFit: "cover" }}
          />
        )}

        <CardBootstrap.Body>
          <CardBootstrap.Title>
            <h2>{card.title}</h2>
          </CardBootstrap.Title>
          <CardBootstrap.Text className="mb-0">
            Autor: {card?.author?.name || "użytkownik usunięty"}
          </CardBootstrap.Text>

          <div>Data dodania: {createdDate}</div>
          {createdDate !== updatedDate && (
            <div>Data aktualizacji: {updatedDate}</div>
          )}

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
          </div>
        </CardBootstrap.Body>
      </CardBootstrap>
    </LinkContainer>
  );
};
