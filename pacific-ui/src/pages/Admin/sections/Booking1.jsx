import React, { useState } from 'react';

const Booking1 = () => {
    const [bookings, setBookings] = useState([
        { id: 1, name: "Nguyễn Văn A", tour: "Tour Đà Nẵng", date: "2024-07-30", status: "Đã xác nhận" },
        { id: 2, name: "Trần Thị B", tour: "Tour Nha Trang", date: "2024-08-10", status: "Chờ xác nhận" }
    ]);
    
    const [newBooking, setNewBooking] = useState({ name: "", tour: "", date: "", status: "Chờ xác nhận" });
    
    const handleChange = (e) => {
        setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
    };

    const handleAddBooking = () => {
        if (newBooking.name && newBooking.tour && newBooking.date) {
            setBookings([...bookings, { id: bookings.length + 1, ...newBooking }]);
            setNewBooking({ name: "", tour: "", date: "", status: "Chờ xác nhận" });
        }
    };
    
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Danh Sách Đặt Chỗ</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-3">Tên Khách Hàng</th>
                        <th className="border p-3">Tour</th>
                        <th className="border p-3">Ngày</th>
                        <th className="border p-3">Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="border">
                            <td className="border p-3">{booking.name}</td>
                            <td className="border p-3">{booking.tour}</td>
                            <td className="border p-3">{booking.date}</td>
                            <td className="border p-3 text-green-600 font-semibold">{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Thêm Đặt Chỗ Mới</h3>
                <input type="text" name="name" placeholder="Tên khách hàng" value={newBooking.name} onChange={handleChange} className="w-full p-3 border rounded mb-3" />
                <input type="text" name="tour" placeholder="Tên tour" value={newBooking.tour} onChange={handleChange} className="w-full p-3 border rounded mb-3" />
                <input type="date" name="date" value={newBooking.date} onChange={handleChange} className="w-full p-3 border rounded mb-3" />
                <button onClick={handleAddBooking} className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">Thêm Đặt Chỗ</button>
            </div>
        </div>
    );
};

export default Booking1;