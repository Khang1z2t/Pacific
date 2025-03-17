import React, { useState } from 'react';
import { BlockOutlined, CommentOutlined, DesktopOutlined, DollarCircleOutlined, FileOutlined, HistoryOutlined,
    LogoutOutlined, PaperClipOutlined, PieChartOutlined, TeamOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, theme } from 'antd';
import { AdminSidebar } from '~/pages/Admin/components/AdminHome/AdminSidebar';
import { AdminHeader } from '~/pages/Admin/components/AdminHome/AdminHeader';
import { HomePage } from '~/pages/Admin/sections/HomePage/HomePage';
import { AdminFooter } from '~/pages/Admin/components/AdminHome/AdminFooter';
import Users from './Users';
import Guide from './Guide';
import Booking from '~/pages/Admin/sections/Booking';
import Promotion from '~/pages/Admin/sections/Promotion';
import { Link } from 'react-router-dom';
import UsedPromotion from '~/pages/Admin/UsedPromotion';
import BookingCancel from '~/pages/Admin/sections/BookingCancel';
import BookingDone from '~/pages/Admin/sections/BookingDone';
import Rating from '~/pages/Admin/Rating';
import ConfirmRating from '~/pages/Admin/ConfirmRating';
import InfoBlog from '~/pages/Admin/InfoBlog';
import Blog from '~/pages/Admin/Blog';
import Support from '~/pages/Admin/Support';
import Tour from '~/pages/Admin/Tour';
import TourDetails from '~/pages/Admin/TourDetails';


const { Content } = Layout;

const AdminHome = () => {
    const menuItems = [
        { label: 'Trang chủ', key: '1', icon: <DesktopOutlined />, content: <HomePage /> },
        {
            label: 'Thống kê',
            key: 'sub1',
            icon: <PieChartOutlined />,
            children: [
                { label: 'Booking', key: '2', content: 'Bill is a cat.' },
                { label: 'Tour', key: '3', content: 'Bill is a cat.' },
                { label: 'Doanh thu', key: '4', content: 'Bill is a cat.' },
            ],
        },
        {
            label: 'Tài khoản',
            key: 'sub2',
            icon: <TeamOutlined />,
            children: [
                { label: 'Danh sách tài khoản', key: '5', content: <Users /> },
                { label: 'Hướng dẫn viên', key: '6', content: <Guide /> },
            ],
        },
        {
            label: 'Tour',
            key: 'sub3',
            icon: <FileOutlined />,
            children: [
                { label: 'Danh sách tour', key: '7', content: <Tour /> },
                { label: 'Danh sách chi tiết tour', key: '8', content: <TourDetails />},
                // { label: 'Thông tin lịch trình tour', key: '9', content: <Itinerary />  },
            ],
        },
        {
            label: 'Booking',
            key: 'sub4',
            icon: <PaperClipOutlined />,
            children: [{ label: 'Đang chờ xác nhận', key: '10', content: <Booking /> },
            { label: 'Đã hoàn thành', key: '11', content: <BookingDone /> },
            { label: 'Đã hủy', key: '12', content: <BookingCancel /> }],
        },
        {
            label: 'Khuyến mãi',
            key: 'sub5',
            icon: <DollarCircleOutlined />,
            children: [
                { label: 'Danh sách khuyến mãi', key: '13', content: <Promotion /> },
                { label: 'Danh sách khách hàng sử dụng khuyến mãi', key: '14', content: <UsedPromotion /> },
            ],
        },
        {
            label: 'Đánh giá',
            key: 'sub6',
            icon: <HistoryOutlined />,
            children: [
                { label: 'Đang chờ duyệt', key: '15', content: <Rating />  },
                { label: 'Đã duyệt', key: '16', content: <ConfirmRating /> },
            ],
        },
        {
            label: 'Blogs',
            key: 'sub7',
            icon: <BlockOutlined />,
            children: [

                { label: 'Danh sách Blogs', key: '17', content: <Blog />},
                { label: 'Tông tin chi tiết Blogs', key: '18', content: <InfoBlog /> },
            ],
        },
        { label: 'Hỗ trợ', key: '19', icon: <CommentOutlined />, content: <Support /> },
        { label: 'Logout', key: '20', icon: <LogoutOutlined />, content: 'File management system.' },
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
                <Link className={'text-blue-500'} to={'/'}>HomePage</Link>
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
