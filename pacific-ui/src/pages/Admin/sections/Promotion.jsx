import React, { useEffect, useState } from 'react';
import PromotionCard from '../components/PromotionCard';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Promotion = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/promotions?page=1&size=10")
            .then((response) => response.json())
            .then((data) => setPromotions(data.data))
            .catch((error) => console.error("Error fetching promotions:", error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) {
            fetch(`http://localhost:3000/api/promotions/${id}`, { method: "DELETE" })
                .then((response) => response.json())
                .then(() => {
                    setPromotions(promotions.filter((promo) => promo.id !== id));
                })
                .catch((error) => alert("Xóa không thành công: " + error));
        }
    };

    const handleEdit = (promotion) => {
        alert(`Chỉnh sửa khuyến mãi: ${promotion.name}`);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">DANH SÁCH KHUYẾN MÃI</h2>
            <div className="flex justify-between items-center mb-4">
                <button className="p-2 bg-gray-200 rounded"><ChevronLeft size={20} /></button>
                <span className="font-semibold text-lg">January 2025</span>
                <button className="p-2 bg-gray-200 rounded"><ChevronRight size={20} /></button>
            </div>

            <div className="flex justify-end mb-4">
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded">
                    <Plus size={20} className="mr-2" /> Thêm
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Hình ảnh</th>
                        <th className="p-3 border">Tên Loại</th>
                        <th className="p-3 border">Mã Khuyến Mãi</th>
                        <th className="p-3 border">Trạng Thái</th>
                        <th className="p-3 border">Thời Gian Bắt Đầu</th>
                        <th className="p-3 border">Thời Gian Kết Thúc</th>
                        <th className="p-3 border">Số Lượng</th>
                        <th className="p-3 border">Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {promotions.map((promotion) => (
                        <PromotionCard key={promotion.id} promotion={promotion} onDelete={handleDelete} onEdit={handleEdit} />
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                <button className="p-2 bg-gray-200 rounded"><ChevronLeft size={20} /></button>
                {[1, 2, 3, 4].map((page) => (
                    <button key={page} className="p-2 px-4 bg-gray-200 rounded">{page}</button>
                ))}
                <button className="p-2 bg-gray-200 rounded"><ChevronRight size={20} /></button>
            </div>
        </div>
    );
};

export default Promotion;
