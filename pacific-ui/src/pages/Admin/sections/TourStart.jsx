import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import TourStartCard from "../components/TourStartCard";
import axios from "axios";

const TourStart = () => {
  const [tourStarts, setTourStarts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ngayKhoiHanh, setNgayKhoiHanh] = useState("");

  useEffect(() => {
    fetchTourStarts();
  }, []);

  const fetchTourStarts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tour/StartDate");
      setTourStarts(response.data.data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    }
  };

  const handleAddTourStart = async () => {
    if (!ngayKhoiHanh) {
      alert("Vui lòng chọn ngày khởi hành.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/tour/add-date", { ngay_khoi_hanh: ngayKhoiHanh });
      fetchTourStarts();
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi thêm ngày khởi hành:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?") === false) return;
    try {
      await axios.delete(`http://localhost:3000/api/tour/StartDate/delete/${id}`);
      fetchTourStarts();
    } catch (error) {
      console.error("Lỗi khi xóa ngày khởi hành:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Danh sách ngày khởi hành</h1>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Thêm ngày khởi hành
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ngày khởi hành</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tourStarts.map((tour) => (
            <TourStartCard key={tour.id} {...tour} onDelete={handleDelete} />
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới ngày khởi hành</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Ngày khởi hành</Form.Label>
              <Form.Control
                type="date"
                value={ngayKhoiHanh}
                onChange={(e) => setNgayKhoiHanh(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddTourStart}>
            Thêm mới
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TourStart;