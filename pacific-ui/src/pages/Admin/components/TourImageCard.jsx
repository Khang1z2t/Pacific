import React from "react";
import { Card, Button } from "react-bootstrap";

const TourImageCard = ({ id, imageUrl, onDelete }) => {
  return (
    <Card className="mb-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`/public/img/${imageUrl}`} />
      <Card.Body>
        <Button variant="danger" onClick={() => onDelete(id)}>Xóa</Button>
      </Card.Body>
    </Card>
  );
};

export default TourImageCard;