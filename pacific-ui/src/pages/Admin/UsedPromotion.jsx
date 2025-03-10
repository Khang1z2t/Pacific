import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import PromotionCard from '~/pages/Admin/components/PromotionCard';
import { Space, Input } from "antd";

const UsedPromotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/promotions?page=1&size=10")
            .then((response) => response.json())
            .then((data) => setPromotions(data.data))
            .catch((error) => console.error("Error fetching promotions:", error));
    }, []);

    const handleEdit = (promotion) => {
        alert(`Chỉnh sửa khuyến mãi: ${promotion.name}`);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">DANH SÁCH KHÁCH HÀNG SỬ DỤNG KHUYẾN MÃI</h2>
            <div className="flex justify-between items-center mb-4">
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Tìm kiếm"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Space>
                <button className="p-2 bg-gray-200 rounded"><ChevronLeft size={20} /></button>
                <span className="font-semibold text-lg">January 2025</span>
                <button className="p-2 bg-gray-200 rounded"><ChevronRight size={20} /></button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">Họ & Tên</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Tên Khuyến Mãi</th>
                        <th className="p-3 border">Mã Khuyến Mãi</th>
                        <th className="p-3 border">Discount</th>
                        <th className="p-3 border">Hóa Đơn</th>
                        <th className="p-3 border">Ngày sử dụng</th>
                        <th className="p-3 border">Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {promotions.map((promotion) => (
                        <PromotionCard key={promotion.id} promotion={promotion} onEdit={handleEdit} />
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

export default UsedPromotion;
