import React, { useEffect, useState } from 'react';
import { Card, Table, Typography } from 'antd';
import CategoryServices from '~/services/CategoryServices';

const { Text } = Typography;

export const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const res = await CategoryServices.getCategories();
                setCategories(res);
            } catch (err) {
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const columns = [
        {
            title: 'Mã danh mục',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id, // Numeric sorting for ID
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title), // A-Z sorting for title
            filters: [
                { text: 'Bắc', value: 'Bắc' },
                { text: 'Trung', value: 'Trung' },
                { text: 'Nam', value: 'Nam' },
            ],
            onFilter: (value, record) => record.title.includes(value), // Filter by title
            filterSearch: true, // Enable search in filter dropdown
        },
    ];

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg min-h-screen font-sans">
            <div className="mb-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Danh sách danh mục</h1>

                {/* Optimized Card Notification */}
                <Card
                    className="bg-indigo-50 border border-blue-700 shadow-md w-1/2 rounded-lg p-4"
                    bodyStyle={{ padding: 0 }}
                >
                    <Text strong className="text-blue-900">
                        Lưu ý:
                    </Text>
                    <Text className="text-gray-800">
                        {' '}
                        Danh mục ở đây là các miền như Bắc, Nam, Trung! Nếu thêm danh mục, hãy thống nhất trong
                        database.
                    </Text>
                </Card>

                {/* Enhanced Table */}
                <Table
                    columns={columns}
                    dataSource={categories}
                    loading={loading}
                    pagination={{ pageSize: 10 }} // Enable pagination with 10 items per page
                    rowKey="id"
                    className="w-full shadow-sm rounded-lg overflow-hidden"
                    scroll={{ x: 'max-content' }} // Responsive horizontal scroll
                />
            </div>
        </div>
    );
};