import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import TourImageCard from "../components/TourImageCard";
import axios from "axios";

const TourImage = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const tourId = window.location.href.split("/").pop();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tour/getAllImageOfTour/${tourId}`);
      setImages(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu ảnh:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post(`http://localhost:3000/api/tour/add-image/${tourId}`, formData);
      fetchImages();
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tour/TourImage/delete/${id}`);
      setImages(images.filter(image => image.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Danh sách ảnh slide của tour ID: {tourId}</h1>
      <Button className="mb-3" onClick={() => setShowModal(true)}>Thêm ảnh slide</Button>
      
      <Row>
        {images.map((image) => (
          <Col key={image.id} md={4}>
            <TourImageCard id={image.id} imageUrl={image.url} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>

      {/* Modal thêm ảnh */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Chọn ảnh</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button variant="primary" onClick={handleUpload}>Thêm mới</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TourImage;