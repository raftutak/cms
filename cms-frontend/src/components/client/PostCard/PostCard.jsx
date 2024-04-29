import { Card } from "react-bootstrap";
import CardMock from "../../../assets/card-mock.svg";

export const PostCard = () => {
  return (
    <Card>
      <Card.Img variant="top" src={CardMock} />
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
