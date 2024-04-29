import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { CarouselForm } from "./CarouselForm";
import { CardsForm } from "./CardsForm";
import { ColumnsForm } from "./ColumnsForm";
import { DropdownForm } from "./DropdownForm";
import { PageLinkForm } from "./PageLinkForm";
import { PostLinkForm } from "./PostLinkForm";

export const ConfigurationModal = ({
  show,
  handleClose,
  config,
  setConfig,
  saveConfig,
}) => {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    setColumnCount(config.quantity || 1);
  }, [config]);

  const renderForm = () => {
    switch (config.type) {
      case "dropdown":
        return (
          <DropdownForm
            config={config}
            setConfig={setConfig}
            columnCount={columnCount}
            setColumnCount={setColumnCount}
          />
        );
      case "pageLink":
        return (
          <PageLinkForm
            config={config}
            setConfig={setConfig}
            columnCount={columnCount}
            setColumnCount={setColumnCount}
          />
        );
      case "postLink":
        return (
          <PostLinkForm
            config={config}
            setConfig={setConfig}
            columnCount={columnCount}
            setColumnCount={setColumnCount}
          />
        );
      default:
        return <p>Nieobsługiwany typ elementu.</p>;
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Konfiguracja elementu</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm()}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Anuluj
        </Button>
        <Button variant="success" onClick={saveConfig}>
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
