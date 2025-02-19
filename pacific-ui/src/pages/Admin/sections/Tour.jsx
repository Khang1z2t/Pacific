import React, { useState } from "react";
import TourCard from "../components/TourCard"; 

const Tour = () => {
  const [tours, setTours] = useState([
    { id: 1, name: "Hạ Long Bay", price: "5,000,000 VND", duration: "3 ngày 2 đêm" },
    { id: 2, name: "Đà Nẵng", price: "4,000,000 VND", duration: "4 ngày 3 đêm" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState({ id: "", name: "", price: "", duration: "" });

  const handleEdit = (tour) => {
    setCurrentTour(tour);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const handleSave = () => {
    if (currentTour.id) {
      setTours(tours.map((t) => (t.id === currentTour.id ? currentTour : t)));
    } else {
      setTours([...tours, { ...currentTour, id: Date.now() }]);
    }
    setModalOpen(false);
    setCurrentTour({ id: "", name: "", price: "", duration: "" });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách Tour</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setModalOpen(true)}>
        Thêm Tour
      </button>
      <div className="grid gap-4 mt-4">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold">{currentTour.id ? "Chỉnh sửa Tour" : "Thêm Tour"}</h3>
            <input
              className="border p-2 w-full my-2"
              value={currentTour.name}
              onChange={(e) => setCurrentTour({ ...currentTour, name: e.target.value })}
              placeholder="Tên Tour"
            />
            <input
              className="border p-2 w-full my-2"
              value={currentTour.price}
              onChange={(e) => setCurrentTour({ ...currentTour, price: e.target.value })}
              placeholder="Giá Tour"
            />
            <input
              className="border p-2 w-full my-2"
              value={currentTour.duration}
              onChange={(e) => setCurrentTour({ ...currentTour, duration: e.target.value })}
              placeholder="Thời gian"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>
              Lưu
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setModalOpen(false)}>
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tour;
