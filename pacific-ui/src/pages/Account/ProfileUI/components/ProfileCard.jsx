import { MdEmail, MdEdit, MdAdminPanelSettings } from 'react-icons/md';
import { Avatar, Card, Divider, Tooltip } from 'antd';
import { PhoneCall } from 'lucide-react';
import config from '~/config';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export const ProfileCard = ({ data, switchTab }) => {
    // Hàm kiểm tra và hiển thị giá trị mặc định nếu dữ liệu là null
    const renderValue = (value, defaultText = 'Chưa cập nhật') => {
        return value ? value : <span className="text-gray-400 italic">{defaultText}</span>;
    };

    // Hàm chuyển đổi giới tính
    const renderGender = (gender) => {
        if (gender === null || gender === undefined) {
            return <span className="text-gray-400 italic">Chưa cập nhật</span>;
        }
        return gender ? 'Nữ' : 'Nam';
    };

    return (
        <Card
            className="shadow-lg sticky top-20 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl"
            bodyStyle={{ padding: '24px' }}
        >
            {/* Phần Avatar và Tên */}
            <div className="flex flex-col items-center text-center">
                <Avatar
                    size={100}
                    src={config.imageConfig.getAvatar(data.avatarUrl)}
                    className="border-4 border-orange-100 shadow-md"
                />
                <h2 className="mt-4 flex flex-wrap items-center gap-2 text-xl font-bold text-gray-800">
                    {renderValue(data.username, 'Bạn chưa cập nhật tên')}
                    {' '}
                    {data?.role === 'ADMIN' && (
                        <Tooltip title="Quản trị viên">
                            <MdAdminPanelSettings className={'text-yellow-500 text-2xl'} />
                        </Tooltip>
                    )}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                    {renderValue(
                        data.firstName || data.lastName
                            ? `${data.firstName || ''} ${data.lastName || ''}`.trim()
                            : null,
                        'Chưa cập nhật họ tên',
                    )}
                </p>
                <div className="mt-2">
                    <Tooltip title="Chỉnh sửa hồ sơ">
                        <button
                            onClick={() => switchTab('1')}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all duration-200"
                        >
                            <MdEdit size={16} /> Chỉnh sửa
                        </button>
                    </Tooltip>
                </div>
            </div>

            <Divider className="my-6" />

            {/* Phần Giới thiệu */}
            <div className="space-y-3">
                <h3 className="font-bold text-lg text-orange-500">Giới thiệu</h3>
                <div className="flex items-center gap-2">
                    <label className="font-semibold text-gray-700 w-24">Ngày sinh:</label>
                    <p className="text-gray-600">
                        {renderValue(
                            data.birthDay ? config.webConfig.convertDate(data.birthDay) : null,
                            'Chưa cập nhật',
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold text-gray-700 w-24">Giới tính:</label>
                    <p className="text-gray-600">{renderGender(data.gender)}</p>
                </div>
                <div className="flex items-start gap-2">
                    <label className="font-semibold text-gray-700 w-24">Địa chỉ:</label>
                    <p className="text-gray-600">{renderValue(data.address)}</p>
                </div>
            </div>
            <Divider className="my-6" />
            {/* Phần Liên hệ */}
            <div className="mt-6 space-y-3">
                <h3 className="font-bold text-lg text-orange-500">Liên hệ</h3>
                <div className="flex items-center gap-3">
                    <PhoneCall size={20} className="text-gray-500" />
                    <p className="text-gray-600">{renderValue(data.phone)}</p>
                    {data?.phoneVerified && (
                        <FaCheckCircle className={'text-green-500 text-xl font-semibold'} />
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <MdEmail size={20} className="text-gray-500" />
                    <p className="text-gray-600">{renderValue(data.email)}</p>
                    {data?.emailVerified && (
                        <FaCheckCircle className={'text-green-500 text-xl font-semibold'} />
                    )}
                </div>
            </div>
        </Card>
    );
};