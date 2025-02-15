import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import { Typography } from 'antd';

export function NotFound() {
    return (
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
            <div className="space-y-4">
                <Typography.Title level={2} style={{ color: 'gray' }}>404 - Trang không tồn tại</Typography.Title>
                <Link to={config.routes.home} style={{ color: '#1890ff', fontSize: '16px' }}>Quay lại</Link>
            </div>
        </div>
    );
}

export default NotFound;