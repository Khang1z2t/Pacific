import { Form, Typography, Button, message, Spin, Tooltip, Switch, Space } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect, useRef } from 'react';
import {
    FileTextOutlined,
    SaveOutlined,
    SendOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import '../BlogStyle.css';
import { BlogPreview } from '~/pages/Admin/sections/BlogSection/Sections/BlogPreview';
import { debounce } from 'lodash';

const { Text } = Typography;

export const BlogForm = ({ blog, isEditing = false, onBack }) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState(blog?.content || localStorage.getItem('blogContent') || '');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [lastSaved, setLastSaved] = useState(localStorage.getItem('lastSaved') || null);
    const quillRef = useRef(null);

    // Initialize form with blog data when in editing mode
    useEffect(() => {
        if (isEditing && blog) {
            form.setFieldsValue({
                title: blog.title,
                author: blog.author,
            });
            if (blog.content) {
                setContent(blog.content);
                const setEditorContent = () => {
                    if (quillRef.current) {
                        quillRef.current.getEditor().setContents(
                            quillRef.current.getEditor().clipboard.convert(blog.content),
                        );
                    }
                };
                setTimeout(setEditorContent, 0);
            }
        }
    }, [isEditing, blog, form]);

    // Auto-save to localStorage with debounce
    const saveToLocalStorage = debounce(() => {
        if (content) {
            localStorage.setItem('blogContent', content);
            const now = new Date().toLocaleString();
            localStorage.setItem('lastSaved', now);
            setLastSaved(now);
        }
    }, 1000);

    useEffect(() => {
        saveToLocalStorage();
    }, [content]);

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            const { title, author } = values;
            const blogData = {
                id: blog?.id,
                title,
                author,
                content,
                date: blog?.date || new Date().toISOString().split('T')[0],
            };

            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success(isEditing ? 'Bài viết đã được cập nhật!' : 'Bài viết đã được tạo thành công!');
            console.log('Blog Data:', blogData);

            if (onBack) {
                onBack();
            }
        } catch (error) {
            message.error('Không thể lưu bài viết. Vui lòng thử lại.');
            console.error('Error submitting blog:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Manual save function
    const saveContentToLocalStorage = () => {
        try {
            setLoading(true);
            localStorage.setItem('blogContent', content);
            const now = new Date().toLocaleString();
            localStorage.setItem('lastSaved', now);
            setLastSaved(now);
            message.success('Draft saved successfully!');
        } catch (error) {
            message.error('Failed to save draft. Please try again.');
            console.error('Error saving draft:', error);
        } finally {
            setLoading(false);
        }
    };

    // Restore draft from localStorage
    const restoreDraft = () => {
        try {
            setLoading(true);
            const savedContent = localStorage.getItem('blogContent');
            if (savedContent) {
                setContent(savedContent);
                if (quillRef.current) {
                    quillRef.current.getEditor().setContents(
                        quillRef.current.getEditor().clipboard.convert(savedContent),
                    );
                }
                message.success('Draft restored successfully!');
            } else {
                message.info('No saved draft found.');
            }
        } catch (error) {
            message.error('Failed to restore draft. Please try again.');
            console.error('Error restoring draft:', error);
        } finally {
            setLoading(false);
        }
    };

    // Quill modules and formats (simplified for testing)
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image', 'video'],
                [{ align: [] }],
                ['blockquote', 'code-block'],
                ['clean'],
            ],
        },
    };

    const formats = [
        'header', 'font',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align',
        'blockquote', 'code-block',
    ];

    return (
        <div className="p-6 container mx-auto justify-center items-center">
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                    {onBack && (
                        <Button icon={<ArrowLeftOutlined />} type="text" onClick={onBack} className="mr-3" />
                    )}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
                        </h2>
                        {lastSaved && (
                            <p className="text-sm text-gray-500">Lần lưu cuối: {lastSaved}</p>
                        )}
                    </div>
                </div>
                <Space>
                    <Tooltip title="Hiển thị/Ẩn xem trước">
                        <Button
                            type="default"
                            icon={showPreview ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            onClick={() => setShowPreview(!showPreview)}
                        />
                    </Tooltip>
                    <Tooltip title="Lưu bản nháp">
                        <Button
                            type="default"
                            icon={<SaveOutlined />}
                            onClick={saveContentToLocalStorage}
                            loading={loading}
                        >
                            Lưu bản nháp
                        </Button>
                    </Tooltip>
                </Space>
            </div>

            <Spin spinning={loading} tip="Đang xử lý...">
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Form.Item
                            name="title"
                            label={<Text strong>Tiêu đề</Text>}
                            rules={[{ required: true, message: 'Hãy nhập tiêu đề!' }]}
                            className="md:col-span-2"
                        >
                            <input
                                className="border rounded p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Nhập tiêu đề (VD: Những địa điểm cực kỳ bạn nên đi 1 lần ở Nhật Bản)"
                            />
                        </Form.Item>
                        <Form.Item
                            name="author"
                            label={<Text strong>Tác giả</Text>}
                            rules={[{ required: true, message: 'Hãy nhập tên tác giả!' }]}
                        >
                            <input
                                className="border rounded p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Nhập tên tác giả, nguồn"
                            />
                        </Form.Item>
                        <Form.Item label="Tự động lưu" className="mb-0 flex items-center">
                            <Switch defaultChecked />
                            <span className="ml-2 text-sm text-gray-500">Tự động lưu mỗi 30 giây</span>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="content"
                        label={<Text strong>Nội dung</Text>}
                        rules={[{ required: true, message: 'Hãy nhập nội dung!' }]}
                        className="mt-4"
                    >
                        <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            className="h-96 pb-12"
                            placeholder="Viết nội dung blog của bạn tại đây..."
                            value={content}
                            onChange={(value) => {
                                console.log('ReactQuill value:', value); // Gỡ lỗi
                                setContent(value);
                            }}
                        />
                    </Form.Item>

                    <div className="flex justify-between mt-6">
                        <Button
                            type="default"
                            icon={<FileTextOutlined />}
                            onClick={restoreDraft}
                            className="mr-2"
                            disabled={loading}
                        >
                            Khôi phục bản nháp
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500 hover:bg-blue-600"
                            icon={<SendOutlined />}
                            loading={submitting}
                        >
                            Đăng bài
                        </Button>
                    </div>
                </Form>
            </Spin>

            {content && showPreview && (
                <div className="mt-8 transition-all duration-300">
                    <BlogPreview content={content} form={form} />
                </div>
            )}
        </div>
    );
};