import React, {useState} from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {AdminSidebar} from "~/pages/Admin/components/AdminHome/AdminSidebar";
import {AdminHeader} from "~/pages/Admin/components/AdminHome/AdminHeader";
import {HomePage} from "~/pages/Admin/sections/HomePage/HomePage";
import {AdminFooter} from "~/pages/Admin/components/AdminHome/AdminFooter";

const {Content} = Layout;


const AdminHome = () => {
    const menuItems = [
        { label: 'Trang chủ', key: '1', icon: <PieChartOutlined />, content: <HomePage/> },
        { label: 'Option 2', key: '2', icon: <DesktopOutlined />, content: 'This is Option 2 content.' },
        {
            label: 'Quản lý Tour',
            key: 'sub1',
            icon: <UserOutlined />,
            children: [
                { label: 'Danh sách tour', key: '3', content: 'Tom is a developer.' },
                { label: 'Danh sách đánh giá tour', key: '4', content: 'Bill is a cat.' },
                { label: 'Quản lý combo tour', key: '5', content: 'Alex is a designer.' },
            ],
        },
        {
            label: 'Phê duyệt',
            key: 'sub2',
            icon: <TeamOutlined />,
            children: [
                { label: 'Hướng dẫn viên', key: '6', content: 'Team 1 works on React.' },
                { label: 'Thông tin người dùng', key: '8', content: 'Team 2 works on Java.' },
            ],
        },
        { label: 'Quản lý khuyến mãi', key: '9', icon: <FileOutlined />, content: 'File management system.' },
        { label: 'Danh sách thông tin liên hệ KH', key: '10', icon: <FileOutlined />, content: 'lorem asadadadadada' },

    ];
    const [selectedContent, setSelectedContent] = useState(menuItems[0].content);
    const [selectedLabel, setSelectedLabel] = useState(menuItems[0].label);

    const handleMenuSelect = (key) => {
        const selectedItem = menuItems.flatMap(item => item.children || item).find(item => item.key === key);
        setSelectedContent(selectedItem ? selectedItem.content : 'Content not found');
        setSelectedLabel(selectedItem ? selectedItem.label : 'Label not found');
    };
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout className={"min-h-screen bg-gray-100"}>
            <AdminSidebar onSelect={handleMenuSelect} menuItems={menuItems}/>
            <Layout className="site-layout">
                <AdminHeader children={"Admin dashboard"}/>
                <Content className="p-4">
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {selectedLabel}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className={`p-4 ${colorBgContainer} ${borderRadiusLG}`}>
                        {selectedContent}
                    </div>
                </Content>
                <AdminFooter children={"Pacific ©2025 Created by Pacific Team"}/>
            </Layout>
        </Layout>
    );
};
export default AdminHome;