import { Card as CardBootstrap } from "react-bootstrap";
import CardMock from "../../../assets/card-mock.svg";

export const Card = ({ card }) => {
  return (
    <CardBootstrap>
      <CardBootstrap.Img variant="top" src={card.imageUrl} />
      <CardBootstrap.Body>
        <CardBootstrap.Title>{card.header}</CardBootstrap.Title>
        <CardBootstrap.Text>{card.paragraph}</CardBootstrap.Text>
      </CardBootstrap.Body>
    </CardBootstrap>
  );
};
