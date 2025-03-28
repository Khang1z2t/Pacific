import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

export function NotFound() {
    const { t } = useTranslation();
    return (
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
            <div className="space-y-4">
                <Typography.Title level={2} style={{ color: 'gray' }}>{t("notFound.ti1")}</Typography.Title>
                <Link to={config.routes.home} style={{ color: '#1890ff', fontSize: '16px' }}>{t("notFound.ti2")}</Link>
            </div>
        </div>
    );
}
export default NotFound;