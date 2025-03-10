import { Avatar, Input, Upload, message, Select } from 'antd';
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export const AccountInformation = () => {
    const [avatar, setAvatar] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            if (info.file.originFileObj) {
                getBase64(info.file.originFileObj, (url) => {
                    setLoading(false);
                    setAvatar(url);
                    setUploadedImage(info.file.originFileObj); // Lưu trữ ảnh thực
                });
            } else {
                setLoading(false);
                message.error('Không thể lấy dữ liệu file.');
            }
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
        </button>
    );

    return (
        <div className="container mx-auto">
            <div className="section3 bg-yellow-100 p-4">
                <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
                <div className="flex flex-wrap mt-2 items-center gap-4">
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="avatar"
                                style={{ width: '100%' }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                    <div className="space-y-2">
                        <label className="font-semibold text-md">Tên người dùng</label>
                        <Input placeholder="Nhập tên người dùng" className="w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-semibold text-md">Họ và tên</label>
                        <Input placeholder="Họ và tên" className="w-full" />
                    </div>
                </div>
                {uploadedImage && (
                    <p className="mt-2 text-green-600 text-sm">
                        Ảnh đã tải lên: {uploadedImage.name}
                    </p>
                )}
                {/**/}
                <div className={'grid grid-cols-2 gap-4 mt-4 w-1/2'}>
                    <div>
                        <label className={'font-semibold text-md'}>Tài khoản Email</label>
                        <Input placeholder="Email" className={'w-full'} />
                    </div>
                    <div>
                        <label className={'font-semibold text-md'}>Số điện thoại</label>
                        <Input placeholder="Số điện thoại" className={'w-full'} />
                    </div>
                    <div className="flex flex-wrap">
                        <label className="font-semibold text-md">Vị trí</label>
                        <Select className="w-full mt-2" placeholder="Thành phố">
                            <Option value="Hanoi">Hà Nội</Option>
                            <Option value="HCM">Hồ Chí Minh</Option>
                            <Option value="Others">Khác</Option>
                        </Select>
                        <Select className="w-full mt-2" placeholder="Quận huyện">
                            <Option value="Hanoi">Hà Nội</Option>
                            <Option value="HCM">Hồ Chí Minh</Option>
                            <Option value="Others">Khác</Option>
                        </Select>
                        <Select className="w-full mt-2" placeholder="Phường">
                            <Option value="Hanoi">Hà Nội</Option>
                            <Option value="HCM">Hồ Chí Minh</Option>
                            <Option value="Others">Khác</Option>
                        </Select>
                        <Input placeholder="Địa chỉ" className="w-full mt-2" />
                    </div>
                </div>
                <div className="mt-2 flex justify-end">
                    <button
                        className="bg-green-500 transition-all hover:bg-green-700 hover:shadow-lg text-white px-4 py-2 rounded-md"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
};
