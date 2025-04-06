import { useEffect, useState } from 'react';
import {
    BlockOutlined, BulbOutlined,
    CommentOutlined,
    DesktopOutlined,
    DollarCircleOutlined,
    FileOutlined,
    PaperClipOutlined,
    PieChartOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Breadcrumb, ConfigProvider, Layout, Switch, theme, Tooltip } from 'antd';
import { AdminSidebar } from '~/pages/Admin/components/AdminHome/AdminSidebar';
import { AdminHeader } from '~/pages/Admin/components/AdminHome/AdminHeader';
import { HomePage } from '~/pages/Admin/sections/HomePage/HomePage';
import { AdminFooter } from '~/pages/Admin/components/AdminHome/AdminFooter';
import Users from './Users';
import Guide from './Guide';
import TourList from '~/pages/Admin/sections/ToursPage/TourList';
import Booking from '~/pages/Admin/sections/Booking';
import { Link } from 'react-router-dom';
import BookingCancel from '~/pages/Admin/sections/BookingCancel';
import BookingDone from '~/pages/Admin/sections/BookingDone';
import InfoBlog from '~/pages/Admin/InfoBlog';
import Blog from '~/pages/Admin/Blog';
import Support from '~/pages/Admin/Support';
import { useAuth } from '~/config/AuthContext';
import { BookingStatistic } from '~/pages/Admin/sections/StatisticGeneral/Sections/BookingStatistic';
import { BiCategory, BiSolidCategory } from 'react-icons/bi';
import { VoucherPage } from '~/pages/Admin/sections/VoucherPage/VoucherPage';
import { FaMoneyCheckAlt, FaMoon } from 'react-icons/fa';
import { CiLight } from 'react-icons/ci';
import { CategoryPage } from '~/pages/Admin/sections/CategoryPage/CategoryPage';
import { HotelPage } from '~/pages/Admin/sections/HotelPage/HotelPage';
import { TransportationPage } from '~/pages/Admin/sections/TransportationPage/TransportationPage';
import { ReviewPage } from '~/pages/Admin/sections/ReviewPage/ReviewPage';
import { IoIosStar } from 'react-icons/io';
import { DestinationPage } from '~/pages/Admin/sections/DestinationPage/DestinationPage';
import { MdTour } from 'react-icons/md';
import { TbMessage2Dollar } from 'react-icons/tb';
import { GuidePage } from '~/pages/Admin/sections/GuidePage/GuidePage';

const { Content } = Layout;

const AdminHome = () => {
    const { currentUser } = useAuth();

// State để quản lý theme (dark/light)
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        // Lấy trạng thái theme từ localStorage, mặc định là light (false)
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    // Lưu theme vào localStorage mỗi khi thay đổi
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    // Hàm chuyển đổi theme
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };
    const menuItems = [
        { label: 'Trang chủ', key: '1', icon: <DesktopOutlined />, content: <HomePage /> },
        {
            label: 'Thống kê booking',
            key: 'sub1',
            icon: <PieChartOutlined />,
            content: <BookingStatistic />,
        },
        {
            label: 'Tài khoản',
            key: 'sub2',
            icon: <TeamOutlined />,
            children: [
                { label: <Tooltip placement={'right'} title={"Danh sách tài khoản"}>Danh sách tài khoản</Tooltip>, key: '5', content: <Users /> },
                { label: 'Hướng dẫn viên', key: '6', content: <GuidePage/> },
            ],
        },
        {
            label: 'Tour',
            key: 'sub3',
            icon: <MdTour color={'orange'} />,
            children: [
                { label: <Tooltip placement={'right'} title={"Danh sách danh mục con"}>Danh sách danh mục con</Tooltip>, key: '7', content: <CategoryPage /> },
                { label: 'Danh sách tour', key: '8', content: <TourList /> },
                { label: <Tooltip placement={'right'} title={"Giao diện Lịch trình"}>Giao diện Lịch trình</Tooltip>, key: '9', content: 'Bill is a cat.' },
            ],
        },
        {
            label: 'Booking',
            key: 'sub4',
            icon: <FaMoneyCheckAlt color={'green'} />,
            children: [{ label: 'Đang chờ xác nhận', key: '10', content: <Booking /> },
                { label: 'Đã hoàn thành', key: '11', content: <BookingDone /> },
                { label: 'Đã hủy', key: '12', content: <BookingCancel /> }],
        },
        {
            label: 'Khuyến mãi',
            key: 'sub5',
            icon: <TbMessage2Dollar color={'yellow'} />,
            children: [
                { label: 'Danh sách', key: '13', content: <VoucherPage /> },
            ],
        },
        {
            label: 'Danh mục',
            key: 'sub6',
            icon: <BiSolidCategory color={'yellow'} />,
            children: [
                { label: 'Khách sạn', key: '14', content: <HotelPage /> },
                { label: 'Phương tiện', key: '15', content: <TransportationPage/> },
                { label: 'Điểm đến', key: '16', content: <DestinationPage /> },
            ],
        },
        {
            label: 'Đánh giá',
            key: 'sub7',
            icon: <IoIosStar color={'yellow'} />,
            content: <ReviewPage/>

        },
        {
            label: 'Blogs',
            key: 'sub8',
            icon: <BlockOutlined />,
            children: [

                { label: 'Danh sách Blogs', key: '18', content: <Blog /> },
                { label: 'Tông tin chi tiết Blogs', key: '19', content: <InfoBlog /> },
            ],
        },
        { label: 'Hỗ trợ', key: '20', icon: <CommentOutlined />, content: <Support /> },

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
                <h2 className={isDarkTheme ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-black'}>Admin
                    Dashboard</h2>
                <Link className={isDarkTheme ? 'text-blue-300' : 'text-blue-500'} to={'/'}>HomePage</Link>
                <div className={'flex items-center justify-end mx-auto gap-4'}>
                    <span
                        className={isDarkTheme ? 'text-white' : 'text-gray-500'}>Chào mừng, {currentUser.username}</span>
                    <Tooltip title={isDarkTheme ? 'Chuyển sang Light Theme' : 'Chuyển sang Dark Theme'}>
                        <Switch
                            checked={isDarkTheme}
                            onChange={toggleTheme}
                            checkedChildren={<FaMoon size={16} className={'text-black items-center mt-0.5'} />}
                            unCheckedChildren={<CiLight size={18} className={'text-white items-center mt-0.5'} />}
                        />
                    </Tooltip>
                </div>
            </div>

        </>
    );

    const footer = (
        <Tooltip title={'ĐƯỢC TẠO VÀ THIẾT KẾ BỞI TUNZ - TN1608'}>
            Pacific ©2025 Created by Pacific Team
        </Tooltip>
    );

    const lightTheme = {
        algorithm: theme.defaultAlgorithm,
        token: {
            colorPrimary: '#1890ff',
            colorBgContainer: '#fff',
        },
        components: {
            Table: {
                colorBgContainer: '#fff', // Màu nền của body table
                headerBg: '#fff', // Màu nền của header table
            },
        },
    };

    const darkTheme = {
        algorithm: theme.darkAlgorithm,
        token: {
            colorText: '#fff',
            colorTextLabel: '#fff',
            colorBgContainer: '#838383',
        },
        components: {
            Table: {
                colorBgContainer: '#838383', // Màu nền của body table
                headerBg: '#838383', // Màu nền của header table
                colorText: '#fff', // Màu chữ trong table (để dễ đọc trên nền trắng)
            },
        },
    };

    return (
        <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <Layout className={isDarkTheme ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-white'}>
                <AdminSidebar onSelect={handleMenuSelect} menuItems={menuItems} />
                <Layout className="site-layout">
                    <AdminHeader theme={isDarkTheme ? 'gray' : 'white'} children={header} />
                    <Content className="p-4">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>{selectedLabel}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            className={`p-4 ${colorBgContainer} ${borderRadiusLG}`}
                            style={{
                                background: isDarkTheme ? '#1f1f1f' : '#fff',
                                color: isDarkTheme ? '#fff' : '#000',
                            }}
                        >
                            {selectedContent}
                        </div>
                    </Content>
                    <AdminFooter children={footer} />
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
export default AdminHome;
