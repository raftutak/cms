import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button, ListGroup, Container } from "react-bootstrap";

// Przykładowe dane początkowe
const initialItems = [
  { id: "item-1", content: "Pierwszy element", parent: null },
  { id: "item-2", content: "Drugi element", parent: null },
  { id: "item-3", content: "Trzeci element", parent: "item-2" }, // Zagnieżdżony w "Drugi element"
];

// Funkcja pomocnicza do reorganizacji elementów
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const MenuBuilder = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  // Funkcja do renderowania elementów (uwzględnia zagnieżdżenie)
  const renderItems = (parentId = null) => {
    return items
      .filter((item) => item.parent === parentId)
      .map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ListGroup.Item>
                {item.content}
                {renderItems(item.id)}{" "}
                {/* Rekurencyjne renderowanie zagnieżdżonych elementów */}
              </ListGroup.Item>
            </div>
          )}
        </Draggable>
      ));
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
              {renderItems()}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};
