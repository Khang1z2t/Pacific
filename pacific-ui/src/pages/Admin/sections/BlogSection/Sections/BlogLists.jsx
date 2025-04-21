import { Button, Input, Empty, Spin, message, Modal } from 'antd';
import { SearchOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BlogCard } from '~/pages/Admin/sections/BlogSection/Components/BlogCard';

export const BlogLists = ({ onView, onEdit, onCreateNew }) => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { confirm } = Modal;

    // Sample blog data - in a real app, this would come from an API
    const sampleBlogs = [
        {
            id: 1,
            title: 'Khám phá Nhật Bản: 10 địa điểm không thể bỏ qua',
            description: 'Hướng dẫn du lịch toàn diện cho chuyến đi Nhật Bản đầu tiên của bạn.',
            image: 'https://via.placeholder.com/800x600?text=Japan+Travel',
            author: 'Nguyễn Văn A',
            date: '2023-10-15'
        },
        {
            id: 2,
            title: 'Ẩm thực Việt Nam: Hành trình khám phá hương vị',
            description: 'Khám phá những món ăn đặc sắc và văn hóa ẩm thực phong phú của Việt Nam.',
            image: 'https://via.placeholder.com/800x600?text=Vietnamese+Cuisine',
            author: 'Trần Thị B',
            date: '2023-09-28'
        },
        {
            id: 3,
            title: 'Du lịch bụi Châu Âu: Kinh nghiệm và lời khuyên',
            description: 'Chia sẻ kinh nghiệm du lịch tiết kiệm và hiệu quả tại các quốc gia Châu Âu.',
            image: 'https://via.placeholder.com/800x600?text=Europe+Backpacking',
            author: 'Lê Văn C',
            date: '2023-08-12'
        },
        {
            id: 4,
            title: 'Những bãi biển đẹp nhất Đông Nam Á',
            description: 'Khám phá những bãi biển thiên đường tại các quốc gia Đông Nam Á.',
            image: 'https://via.placeholder.com/800x600?text=Southeast+Asia+Beaches',
            author: 'Phạm Thị D',
            date: '2023-07-05'
        }
    ];

    // Filter blogs based on search term
    const filteredBlogs = sampleBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle view blog
    const handleViewBlog = (blog) => {
        if (onView) {
            onView(blog);
        }
    };

    // Handle edit blog
    const handleEditBlog = (blog) => {
        if (onEdit) {
            onEdit(blog);
        }
    };

    // Handle delete blog with confirmation
    const handleDeleteBlog = (blog) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa bài viết này?',
            icon: <ExclamationCircleOutlined />,
            content: `Bài viết "${blog.title}" sẽ bị xóa vĩnh viễn.`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                // Simulate API call
                setLoading(true);
                setTimeout(() => {
                    // In a real app, you would call an API to delete the blog
                    message.success(`Đã xóa bài viết "${blog.title}"`);
                    setLoading(false);
                }, 1000);
            },
        });
    };

    // Handle create new blog
    const handleCreateBlog = () => {
        if (onCreateNew) {
            onCreateNew();
        }
    };

    return (
        <div className="p-6 container mx-auto">
            {/* Header with search and add button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-1/2">
                    <Input
                        placeholder="Tìm kiếm bài viết..."
                        prefix={<SearchOutlined className="text-gray-400" />}
                        className="rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={handleCreateBlog}
                >
                    Tạo bài viết mới
                </Button>
            </div>

            {/* Blog grid */}
            <Spin spinning={loading}>
                {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBlogs.map(blog => (
                            <BlogCard 
                                key={blog.id}
                                blog={blog}
                                onView={handleViewBlog}
                                onEdit={handleEditBlog}
                                onDelete={handleDeleteBlog}
                            />
                        ))}
                    </div>
                ) : (
                    <Empty 
                        description="Không tìm thấy bài viết nào" 
                        className="my-12"
                    />
                )}
            </Spin>
        </div>
    );
};
