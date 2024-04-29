import { Form } from "react-bootstrap";

export const CarouselForm = ({
  config,
  setConfig,
  columnCount,
  setColumnCount,
}) => {
  const handleChange = (event, field, index = null) => {
    console.log(config);
    console.log(field);

    if (index !== null) {
      const updatedItems = [...config.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [event.target.name]: event.target.value,
      };
      setConfig({ ...config, items: updatedItems });
    } else {
      setConfig({ ...config, [event.target.name]: event.target.value });
    }
  };

  const handleCarouselCountChange = (event) => {
    const newCount = parseInt(event.target.value, 10);
    setColumnCount(newCount);
    const updatedColumns = Array.from({ length: newCount })
      .fill({})
      .map((_, i) => {
        return config.items && config.items[i]
          ? config.items[i]
          : { imageUrl: "", header: "", paragraph: "" };
      });
    setConfig({ ...config, quantity: newCount, items: updatedColumns });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Liczba slajdów</Form.Label>
        <Form.Select value={columnCount} onChange={handleCarouselCountChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>
      </Form.Group>
      {Array.from({ length: columnCount }).map((_, index) => (
        <div key={index}>
          <Form.Group className="mb-3">
            <Form.Label>Obrazek slajdu {index + 1}</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder="Podaj adres obrazka"
              value={
                config.items && config.items[index]
                  ? config.items[index].imageUrl
                  : ""
              }
              onChange={(e) => handleChange(e, "items", index)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nagłówek slajdu {index + 1}</Form.Label>
            <Form.Control
              type="text"
              name="header"
              placeholder="Wpisz tekst nagłówka"
              value={
                config.items && config.items[index]
                  ? config.items[index].header
                  : ""
              }
              onChange={(e) => handleChange(e, "items", index)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dodatkowy tekst slajdu {index + 1}</Form.Label>
            <Form.Control
              as="textarea"
              name="paragraph"
              placeholder="Wpisz dodatkowy tekst"
              value={
                config.items && config.items[index]
                  ? config.items[index].paragraph
                  : ""
              }
              onChange={(e) => handleChange(e, "items", index)}
            />
          </Form.Group>
        </div>
      ))}
    </>
  );
};
