import { Form } from "react-bootstrap";

export const ColumnsForm = ({
  config,
  setConfig,
  columnCount,
  setColumnCount,
}) => {
  const handleChange = (event, field, index = null) => {
    if (index !== null) {
      const updatedItems = [...config[field]];
      updatedItems[index] = {
        ...updatedItems[index],
        [event.target.name]: event.target.value,
      };
      setConfig({ ...config, [field]: updatedItems });
    } else {
      setConfig({ ...config, [event.target.name]: event.target.value });
    }
  };

  const handleColumnCountChange = (event) => {
    const newCount = parseInt(event.target.value, 10);
    setColumnCount(newCount);
    const updatedColumns = Array.from({ length: newCount })
      .fill({})
      .map((_, i) => {
        return config.columns && config.columns[i]
          ? config.columns[i]
          : { header: "", paragraph: "" };
      });
    setConfig({ ...config, quantity: newCount, columns: updatedColumns });
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Liczba kolumn</Form.Label>
        <Form.Select value={columnCount} onChange={handleColumnCountChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>
      </Form.Group>
      {Array.from({ length: columnCount }).map((_, index) => (
        <div key={index}>
          <Form.Group>
            <Form.Label>Nagłówek kolumny {index + 1}</Form.Label>
            <Form.Control
              type="text"
              name="header"
              placeholder="Wpisz tekst nagłówka"
              value={
                config.columns && config.columns[index]
                  ? config.columns[index].header
                  : ""
              }
              onChange={(e) => handleChange(e, "columns", index)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tekst kolumny {index + 1}</Form.Label>
            <Form.Control
              as="textarea"
              name="paragraph"
              placeholder="Wpisz tekst"
              value={
                config.columns && config.columns[index]
                  ? config.columns[index].paragraph
                  : ""
              }
              onChange={(e) => handleChange(e, "columns", index)}
            />
          </Form.Group>
        </div>
      ))}
    </>
  );
};
