import { Form } from "react-bootstrap";

export const CardsForm = ({
  config,
  setConfig,
  columnCount,
  setColumnCount,
}) => {
  console.log(config);

  const handleChange = (event, field, index = null) => {
    if (index !== null) {
      const updatedItems = [...config.cards];
      updatedItems[index] = {
        ...updatedItems[index],
        [event.target.name]: event.target.value,
      };
      setConfig({ ...config, cards: updatedItems });
    } else {
      setConfig({ ...config, [event.target.name]: event.target.value });
    }
  };

  const handleCardsCountChange = (event) => {
    const newCount = parseInt(event.target.value, 10);
    setColumnCount(newCount);
    const updatedColumns = Array.from({ length: newCount })
      .fill({})
      .map((_, i) => {
        return config.cards && config.cards[i]
          ? config.cards[i]
          : { imageUrl: "", header: "", paragraph: "" };
      });
    setConfig({ ...config, quantity: newCount, cards: updatedColumns });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Liczba kart</Form.Label>
        <Form.Select value={columnCount} onChange={handleCardsCountChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>
      </Form.Group>
      {Array.from({ length: columnCount }).map((_, index) => (
        <div key={index}>
          <Form.Group className="mb-3">
            <Form.Label>Obrazek karty {index + 1}</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder="Podaj adres obrazka"
              value={
                config.cards && config.cards[index]
                  ? config.cards[index].imageUrl
                  : ""
              }
              onChange={(e) => handleChange(e, "cards", index)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nagłówek karty {index + 1}</Form.Label>
            <Form.Control
              type="text"
              name="header"
              placeholder="Wpisz tekst nagłówka"
              value={
                config.cards && config.cards[index]
                  ? config.cards[index].header
                  : ""
              }
              onChange={(e) => handleChange(e, "cards", index)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tekst karty {index + 1}</Form.Label>
            <Form.Control
              as="textarea"
              name="paragraph"
              placeholder="Wpisz tekst"
              value={
                config.cards && config.cards[index]
                  ? config.cards[index].paragraph
                  : ""
              }
              onChange={(e) => handleChange(e, "cards", index)}
            />
          </Form.Group>
        </div>
      ))}
    </>
  );
};
