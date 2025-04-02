import { Input, message, Select, Upload, Form, Image, Radio, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import config from '~/config';
import WebServices from '~/services/WebServices';
import moment from 'moment';

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

export const AccountInformation = ({ data, switchTab }) => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(data?.avatarUrl || null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formChanged, setFormChanged] = useState(false);

    // State cho danh sách tỉnh, quận, phường
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    // Gọi API để lấy danh sách tỉnh/thành phố
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await WebServices.getProvinces();
                setProvinces(response);
            } catch (error) {
                message.error('Không thể tải danh sách tỉnh/thành phố!');
                console.error(error);
            }
        };
        fetchProvinces();
    }, []);

    // Điền dữ liệu ban đầu từ prop data
    useEffect(() => {
        form.setFieldsValue({
            username: data?.username || '',
            fullName: data?.firstName && data?.lastName ? `${data.firstName} ${data.lastName}` : '',
            gender: data?.gender === 'FEMALE' ? 'FEMALE' : 'MALE',
            birthday: data?.birthday ? moment(data.birthday) : null,
            email: data?.email || '',
            phone: data?.phone || '',
            city: data?.address ? data.address.split(', ')[4] : '',
            district: data?.address ? data.address.split(', ')[3] : '',
            ward: data?.address ? data.address.split(', ')[2] : '',
            address: data?.address ? data.address.split(', ').slice(0, 2).join(', ') : '',
        });
        if (data?.avatarUrl) {
            setAvatar(data.avatarUrl);
        }
    }, [data, form]);

    // Theo dõi thay đổi của form
    const handleValuesChange = () => {
        setFormChanged(true);
    };

    // Xử lý khi người dùng rời khỏi trang mà chưa lưu
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (formChanged) {
                e.preventDefault();
                e.returnValue = 'Bạn có thay đổi chưa lưu, bạn có chắc muốn rời khỏi trang?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [formChanged]);

    // Xử lý upload avatar
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
                    setUploadedImage(info.file.originFileObj);
                    setFormChanged(true);
                });
            } else {
                setLoading(false);
                message.error('Không thể lấy dữ liệu file.');
            }
        }
    };

    // Xử lý khi chọn tỉnh/thành phố
    const handleProvinceChange = (value) => {
        const selected = provinces.find((province) => province.name === value);
        setSelectedProvince(selected);
        setDistricts(selected?.districts || []);
        setWards([]); // Reset danh sách phường
        setSelectedDistrict(null);
        form.setFieldsValue({ district: null, ward: null }); // Reset giá trị quận và phường
    };

    // Xử lý khi chọn quận/huyện
    const handleDistrictChange = (value) => {
        const selected = districts.find((district) => district.name === value);
        setSelectedDistrict(selected);
        setWards(selected?.wards || []);
        form.setFieldsValue({ ward: null }); // Reset giá trị phường
    };

    // Xử lý lưu thay đổi
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            if (uploadedImage) {
                formData.append('avatar', uploadedImage);
            }
            formData.append('username', values.username);
            formData.append('fullName', values.fullName);
            formData.append('gender', values.gender);
            formData.append('birthday', values.birthday ? values.birthday.format('YYYY-MM-DD') : null);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('address', values.address, values.city && values.district && values.ward
                ? `${values.address}, ${values.ward}, ${values.district}, ${values.city}` : `${values.address}`);

            // Gọi API thực tế ở đây
            // await YourApiService.updateProfile(formData);
            // log address
            console.log('Address:', values.city, values.district, values.ward);
            message.success('Lưu thay đổi thành công!', 1.5);
            setFormChanged(false);
        } catch (error) {
            message.error('Lưu thay đổi thất bại!', 1.5);
        }
    };

    const uploadButton = (
        <div className="flex flex-col items-center justify-center text-gray-500">
            {loading ? <LoadingOutlined className="text-xl" /> : <PlusOutlined className="text-xl" />}
            <div className="mt-2 text-sm">Tải ảnh lên</div>
        </div>
    );

    return (
        <div className="p-4">
            <div className="bg-white max-w-3xl p-6">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Thông tin tài khoản</h2>

                <Form
                    form={form}
                    onValuesChange={handleValuesChange}
                    onFinish={handleSave}
                    layout="vertical"
                >
                    {/* Phần Avatar và Thông tin cơ bản */}
                    <div className="flex flex-wrap items-center gap-6 mb-6">
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
                                    src={config.imageConfig.getAvatar(data.avatarUrl)}
                                    alt="avatar"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-200"
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                        <div className="flex-1 space-y-4">
                            <div className={'flex flex-wrap gap-2'}>
                                <Form.Item
                                    name="username"
                                    label={<span className="text-sm font-medium text-gray-700">Tên người dùng</span>}
                                    rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                                >
                                    <Input
                                        placeholder="Nhập tên người dùng"
                                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="fullName"
                                    label={<span className="text-sm font-medium text-gray-700">Họ và tên</span>}
                                >
                                    <Input
                                        placeholder="Nhập họ và tên"
                                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                    />
                                </Form.Item>
                            </div>
                            <div className={'flex flex-wrap gap-2'}>
                                {/*<Form.Item*/}
                                {/*    name="birthday"*/}
                                {/*    label={<span className="text-sm font-medium text-gray-700">Ngày sinh</span>}*/}
                                {/*    rules={[*/}
                                {/*        { required: true, message: 'Vui lòng chọn ngày sinh!' },*/}
                                {/*        {*/}
                                {/*            validator: (_, value) =>*/}
                                {/*                value && value.isAfter(moment()) // Kiểm tra ngày sinh không được là ngày tương lai*/}
                                {/*                    ? Promise.reject(new Error('Ngày sinh không hợp lệ!'))*/}
                                {/*                    : Promise.resolve(),*/}
                                {/*        },*/}
                                {/*    ]}*/}
                                {/*>*/}
                                {/*    <DatePicker*/}
                                {/*        format="DD/MM/YYYY"*/}
                                {/*        value={form.getFieldValue('birthday')}*/}
                                {/*        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"*/}
                                {/*        placeholder="Chọn ngày sinh"*/}
                                {/*    />*/}
                                {/*</Form.Item>*/}
                                <Form.Item
                                    name="birthday"
                                    label={<span className="text-sm font-medium text-gray-700">Ngày sinh</span>}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn ngày sinh!' },
                                        {
                                            validator: (_, value) =>
                                                value && value.isAfter(moment())
                                                    ? Promise.reject(new Error('Ngày sinh không hợp lệ!'))
                                                    : Promise.resolve(),
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                        placeholder="Chọn ngày sinh"
                                        disabledDate={(current) => current && current > moment().endOf('day')}
                                        onChange={(date) => {
                                            form.setFieldsValue({ birthday: date });
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="gender"
                                    label={<span className="text-sm font-medium text-gray-700">Giới tính</span>}
                                >
                                    <Radio.Group>
                                        <Radio value="MALE">Nam</Radio>
                                        <Radio value="FEMALE">Nữ</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                    {uploadedImage && (
                        <p className="text-green-600 text-sm mb-4">
                            Ảnh đã tải lên: <Image className="font-medium">{uploadedImage.name}</Image>
                        </p>
                    )}

                    {/* Phần Email và Số điện thoại */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className={'flex flex-col'}>
                            <Form.Item
                                name="email"
                                label={<span className="text-sm font-medium text-gray-700">Tài khoản Email</span>}
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không hợp lệ!' },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập email"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                />
                            </Form.Item>
                            {data?.emailVerified && (
                                <div className="text-green-500 w-fit p-2 -mt-4 bg-green-50 rounded-lg text-sm">
                                    <p className={'font-medium text-green-600'}>Email đã được xác thực</p>
                                </div>
                            )}
                            {!data?.emailVerified && (
                                <button
                                    onClick={() => switchTab('3')}
                                    className={"w-fit p-2 -mt-4 bg-red-200 transition-all hover:bg-red-600 rounded-lg text-sm"}>
                                    <p className={'font-medium text-red-600 hover:text-white'}>Xác thực ngay!</p>
                                </button>
                            )}
                        </div>
                        <div className={'flex flex-col'}>
                            <Form.Item
                                name="phone"
                                label={<span className="text-sm font-medium text-gray-700">Số điện thoại</span>}
                                rules={[{ pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }]}>
                                <Input
                                    placeholder="Nhập số điện thoại"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                />
                            </Form.Item>
                            {data?.phoneVerified && (
                                <div className="text-green-500 w-fit p-2 -mt-4 bg-green-50 rounded-lg text-sm">
                                    <p className={'font-medium text-green-600'}>Số điện thoại đã được xác thực</p>
                                </div>
                            )}
                            {!data?.phoneVerified && (
                                <button
                                    onClick={() => switchTab('3')}
                                    className={"w-fit p-2 -mt-4 bg-red-200 transition-all hover:bg-red-600 rounded-lg text-sm"}>
                                    <p className={'font-medium text-red-600 hover:text-white'}>Xác thực ngay!</p>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Phần Vị trí */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item name="city">
                                <Select
                                    className="w-full"
                                    placeholder="Chọn tỉnh/thành phố"
                                    dropdownClassName="rounded-lg"
                                    onChange={handleProvinceChange}
                                    loading={!provinces || provinces.length === 0}
                                >
                                    {provinces && provinces.map((province) => (
                                        <Option key={province.code} value={province.name}>
                                            {province.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="district">
                                <Select
                                    className="w-full"
                                    placeholder="Chọn quận/huyện"
                                    dropdownClassName="rounded-lg"
                                    onChange={handleDistrictChange}
                                    disabled={!selectedProvince}
                                >
                                    {districts && districts.map((district) => (
                                        <Option key={district.code} value={district.name}>
                                            {district.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="ward">
                                <Select
                                    className="w-full"
                                    placeholder="Chọn phường/xã"
                                    dropdownClassName="rounded-lg"
                                    disabled={!selectedDistrict}
                                >
                                    {wards && wards.map((ward) => (
                                        <Option key={ward.code} value={ward.name}>
                                            {ward.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="address">
                                <Input
                                    placeholder="Nhập địa chỉ chi tiết"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                />
                            </Form.Item>
                        </div>
                    </div>

                    {/* Nút Lưu thay đổi */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};