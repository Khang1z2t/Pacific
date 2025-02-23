import React, { useState } from 'react';
import './style.scss';
import { button } from '@material-tailwind/react';

const STATUS = {
    ACTIVE: {
        key: 'ACTIVE',
        label: 'Hoạt động',
        className: 'users_dropdown_item',
    },
    PENDING: {
        key: 'PENDING',
        label: 'Chờ duyệt',
        className: 'users_dropdown_item',
    },
    REJECT: {
        key: 'REJECT',
        label: 'Từ chối',
        className: 'users_dropdown_item',
    },
    INACTIVE: {
        key: 'INACTIVE',
        label: 'Không hoạt động',
        className: 'users_dropdown_item users_dropdown_item--danger',
    },
};

const AdminUsers = () => {
    const users = [
        {
            id: 1,
            username: 'LyAdmin',
            password: '123',
            fullname: 'Lý Nguyễn',
            deposit: 0,
            role: 'admin',
            status: 'active',
            created_at: '20/02/2025',
            update_at: '22/02/2025',
        },
        {
            id: 2,
            username: 'TuanAdmin',
            password: '123TuanXauquac',
            fullname: 'Tuấn Nguyễn',
            deposit: 0,
            role: 'admin',
            status: 'active',
            created_at: '19/02/2025',
            update_at: '20/02/2025',
        },
        {
            id: 3,
            username: 'RonGuide',
            password: '123',
            fullname: 'Rôn Phạm',
            deposit: 1000000,
            role: 'guide',
            status: 'active',
            created_at: '20/02/2025',
            update_at: '22/02/2025',
        },
        {
            id: 4,
            username: 'ChuongVo',
            password: '123',
            fullname: 'Chương Võ',
            deposit: 2000000,
            role: 'user',
            status: 'active',
            created_at: '18/02/2025',
            update_at: '22/02/2025',
        },
    ];

    const [activedDropdown, setActivedDropdown] = useState(null);

    return (
        <div className="container">
            <div className="users">
                <h2>Quản lý tài khoản</h2>

                <div className="users_content">
                    <table className="users_table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên tài khoản</th>
                                <th>Mật khẩu</th>
                                <th>Họ & Tên</th>
                                <th>Deposit</th>
                                <th>Vai trò</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>••••••</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.deposit.toLocaleString()}đ</td>
                                    <td>{item.role}</td>
                                    {/* <td>
                                        <span className={`status ${item.status}`}>
                                            {item.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                                        </span>
                                    </td> */}
                                    <td>
                                        <div className="users_dropdown">
                                            <button
                                                onClick={() =>
                                                    setActivedDropdown(activedDropdown === item.id ? null : item.id)
                                                }
                                            >
                                                <span className={`status ${item.status}`}>
                                                    ▼ {STATUS[item.status.toUpperCase()]?.label || 'Không xác định'}
                                                </span>
                                            </button>
                                            {activedDropdown === item.id && (
                                                <div className="users_dropdown_menu">
                                                    {Object.values(STATUS).map((status) => (
                                                        <button
                                                            key={status.key}
                                                            className={status.className}
                                                            onClick={() =>
                                                                console.log(`Chọn trạng thái: ${status.label}`)
                                                            }
                                                        >
                                                            {status.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td>{item.created_at}</td>
                                    <td>{item.update_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="users_footer">
                    <div className="users_pagination">
                        <div className="users_page-numbers">
                            <button className="users_page-btn">-</button>
                            <button className="users_page-btn orders_page-btn--active">1</button>
                            <button className="users_page-btn">2</button>
                            <button className="users_page-btn">3</button>
                            <button className="users_page-btn">-</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
