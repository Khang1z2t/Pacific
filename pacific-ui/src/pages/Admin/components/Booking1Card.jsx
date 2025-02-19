import { useState } from "react";
import BookingTable from "./BookingTable";

const Booking1Card = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (type, booking) => {
    setSelectedBooking(booking);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalType(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Quản lý Booking</h2>
      <BookingTable onView={(b) => openModal("view", b)} onEdit={(b) => openModal("edit", b)} onDelete={(b) => openModal("delete", b)} />
      {modalType === "view" && <DetailModal booking={selectedBooking} onClose={closeModal} />}
      {modalType === "edit" && <EditModal booking={selectedBooking} onClose={closeModal} />}
      {modalType === "delete" && <DeleteModal booking={selectedBooking} onClose={closeModal} />}
    </div>
  );
};

const DetailModal = ({ booking, onClose }) => (
  <Modal title="Chi tiết Booking" onClose={onClose}>
    <p><strong>Khách hàng:</strong> {booking.customer}</p>
    <p><strong>Số điện thoại:</strong> {booking.phone}</p>
    <p><strong>Trạng thái:</strong> {booking.status}</p>
  </Modal>
);

const EditModal = ({ booking, onClose }) => (
  <Modal title="Chỉnh sửa Booking" onClose={onClose}>
    <input type="text" defaultValue={booking.customer} className="border p-2 w-full mb-2" />
    <input type="text" defaultValue={booking.phone} className="border p-2 w-full mb-2" />
    <button className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</button>
  </Modal>
);

const DeleteModal = ({ booking, onClose }) => (
  <Modal title="Xóa Booking" onClose={onClose}>
    <p>Bạn có chắc chắn muốn xóa booking của {booking.customer}?</p>
    <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => alert("Đã xóa")}>Xóa</button>
  </Modal>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
      <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Đóng</button>
    </div>
  </div>
);

export default Booking1Card;