import { Pagination, Tabs } from 'antd';
import { FileTextOutlined, EditOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BlogLists } from '~/pages/Admin/sections/BlogSection/Sections/BlogLists';
import { BlogForm } from '~/pages/Admin/sections/BlogSection/Sections/BlogForm';
import { BlogDetail } from '~/pages/Admin/sections/BlogSection/Sections/BlogDetail';

const { TabPane } = Tabs;

export const BlogSection = () => {
    const ITEM_PER_PAGE = 8; // Number of items per page
    const [activeKey, setActiveKey] = useState("1");
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Handle tab change
    const handleTabChange = (key) => {
        setActiveKey(key);
    };

    // Handle view blog
    const handleViewBlog = (blog) => {
        setSelectedBlog(blog);
        setActiveKey("3"); // Switch to detail tab
    };

    // Handle edit blog
    const handleEditBlog = (blog) => {
        setSelectedBlog(blog);
        setActiveKey("4"); // Switch to edit tab
    };

    // Handle back to list
    const handleBackToList = () => {
        setActiveKey("1"); // Switch back to list tab
    };

    // Handle create new blog
    const handleCreateBlog = () => {
        setSelectedBlog(null);
        setActiveKey("2"); // Switch to create tab
    };

    return (
        <>
            <div className="p-4 bg-white rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Quản lý Blog</h1>
                <Tabs 
                    activeKey={activeKey}
                    onChange={handleTabChange}
                    type="card"
                    className="blog-tabs"
                    animated
                >
                    <Tabs.TabPane 
                        key={"1"} 
                        tab={
                            <span className="flex items-center">
                                <FileTextOutlined className="mr-2" />
                                Danh sách bài viết
                            </span>
                        }
                    >
                        <BlogLists 
                            onView={handleViewBlog} 
                            onEdit={handleEditBlog}
                            onCreateNew={handleCreateBlog}
                        />
                        <Pagination
                            className="mt-4"
                            align="center"
                            defaultCurrent={1}
                            total={ITEM_PER_PAGE * 10} // Example total items
                            pageSize={ITEM_PER_PAGE}
                            showSizeChanger={false}
                            showTotal={(total) => `Tổng ${total} bài viết`}
                            onChange={(page, pageSize) => {
                                // Handle page change
                                console.log(`Page: ${page}, PageSize: ${pageSize}`);
                            }}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane 
                        key={"2"} 
                        tab={
                            <span className="flex items-center">
                                <FormOutlined className="mr-2" />
                                Tạo bài viết mới
                            </span>
                        }
                    >
                        <BlogForm onBack={handleBackToList} />
                    </Tabs.TabPane>

                    {/* Blog Detail Tab - Only visible when a blog is selected */}
                    <Tabs.TabPane 
                        key={"3"} 
                        tab={
                            <span className="flex items-center">
                                <EyeOutlined className="mr-2" />
                                Xem chi tiết
                            </span>
                        }
                        disabled={!selectedBlog}
                    >
                        {selectedBlog && (
                            <BlogDetail 
                                blog={selectedBlog} 
                                onBack={handleBackToList}
                                onEdit={() => handleEditBlog(selectedBlog)}
                            />
                        )}
                    </Tabs.TabPane>

                    {/* Blog Edit Tab - Only visible when a blog is selected for editing */}
                    <Tabs.TabPane 
                        key={"4"} 
                        tab={
                            <span className="flex items-center">
                                <EditOutlined className="mr-2" />
                                Chỉnh sửa
                            </span>
                        }
                        disabled={!selectedBlog}
                    >
                        {selectedBlog && (
                            <BlogForm 
                                blog={selectedBlog}
                                isEditing={true}
                                onBack={handleBackToList}
                            />
                        )}
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </>
    );
};
