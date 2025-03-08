import React, { useState } from 'react';
import {
    BellOutlined,
    BlockOutlined,
    BuildOutlined,
    DesktopOutlined,
    FileOutlined,
    LockOutlined,
    LogoutOutlined,
    MoneyCollectOutlined,
    PaperClipOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { AdminSidebar } from '~/pages/Admin/components/AdminHome/AdminSidebar';
import { AdminHeader } from '~/pages/Admin/components/AdminHome/AdminHeader';
import { HomePage } from '~/pages/Admin/sections/HomePage/HomePage';
import { AdminFooter } from '~/pages/Admin/components/AdminHome/AdminFooter';
import AdminUsers from './AdminUsers';
import InfoGuide from './InfoGuide';
import TourList from '~/pages/Admin/sections/TourList';
import Booking from '~/pages/Admin/sections/Booking';
import Promotion from '~/pages/Admin/sections/Promotion';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const AdminHome = () => {
    const menuItems = [
        { label: 'Trang chủ', key: '1', icon: <DesktopOutlined />, content: <HomePage /> },
        { label: 'Thống kê', key: '2', icon: <PieChartOutlined />, content: 'This is Option 2 content.' },
        {
            label: 'Quản lý Tài khoản',
            key: 'sub1',
            icon: <TeamOutlined />,
            children: [
                { label: 'Danh sách tài khoản', key: '3', content: <AdminUsers /> },
                { label: 'Hướng dẫn viên', key: '4', content: <InfoGuide /> },
            ],
        },
        {
            label: 'Quản lý Tour',
            key: 'sub2',
            icon: <FileOutlined />,
            children: [
                { label: 'Danh sách tour', key: '5', content: <TourList /> },
                { label: 'Đánh giá tour', key: '6', content: 'Bill is a cat.' },
                { label: 'Quản lý combo tour', key: '7', content: 'Alex is a designer.' },
            ],
        },
        {
            label: 'Quản lý Booking',
            key: 'sub3',
            icon: <PaperClipOutlined />,
            children: [{ label: 'Danh sách đặt tour', key: '8', content: <Booking /> }],
        },
        {
            label: 'Quản lý Khuyến mãi',
            key: 'sub4',
            icon: <MoneyCollectOutlined />,
            children: [
                { label: 'Danh sách khuyến mãi', key: '9', content: <Promotion /> },
                { label: 'Tạo khuyến mãi', key: '10', content: 'lorem asadadadadada' },
            ],
        },
        {
            label: 'Quản lý Blogs',
            key: 'sub5',
            icon: <BlockOutlined />,
            children: [
                { label: 'Danh sách Blogs', key: '11', content: 'Team 1 works on React.' },
                { label: 'Tạo Blogs', key: '12', content: 'lorem asadadadadada' },
            ],
        },
        { label: 'Logout', key: '13', icon: <LogoutOutlined />, content: 'File management system.' },
    ];
    const [selectedContent, setSelectedContent] = useState(menuItems[0].content);
    const [selectedLabel, setSelectedLabel] = useState(menuItems[0].label);

    const handleMenuSelect = (key) => {
        const selectedItem = menuItems.flatMap((item) => item.children || item).find((item) => item.key === key);
        setSelectedContent(selectedItem ? selectedItem.content : 'Content not found');
        setSelectedLabel(selectedItem ? selectedItem.label : 'Label not found');
    };
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const header = (
        <>
            <div className={'flex items-center justify-between gap-4'}>
                <h2 className={'text-lg font-semibold'}>Admin Dashboard</h2>
                <Link className={'text-blue-500'} to={'/'}>Go back to User HomePage</Link>
            </div>
        </>
    )
    return (
        <Layout className={'min-h-screen bg-gray-100'}>
            <AdminSidebar onSelect={handleMenuSelect} menuItems={menuItems} />
            <Layout className="site-layout">
                <AdminHeader children={header} />
                <Content className="p-4">
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>{selectedLabel}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={`p-4 ${colorBgContainer} ${borderRadiusLG}`}>{selectedContent}</div>
                </Content>
                <AdminFooter children={'Pacific ©2025 Created by Pacific Team'} />
            </Layout>
        </Layout>
    );
};
export default AdminHome;
