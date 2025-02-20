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
            label: 'User',
            key: 'sub1',
            icon: <UserOutlined />,
            children: [
                { label: 'Tom', key: '3', content: 'Tom is a developer.' },
                { label: 'Bill', key: '4', content: 'Bill is a cat.' },
                { label: 'Alex', key: '5', content: 'Alex is a designer.' },
            ],
        },
        {
            label: 'Team',
            key: 'sub2',
            icon: <TeamOutlined />,
            children: [
                { label: 'Team 1', key: '6', content: 'Team 1 works on React.' },
                { label: 'Team 2', key: '8', content: 'Team 2 works on Java.' },
            ],
        },
        { label: 'Files', key: '9', icon: <FileOutlined />, content: 'File management system.' },
    ];
    const [selectedContent, setSelectedContent] = useState(menuItems[0].content);

    const handleMenuSelect = (key) => {
        const selectedItem = menuItems.flatMap(item => item.children || item).find(item => item.key === key);
        setSelectedContent(selectedItem ? selectedItem.content : 'Content not found');
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
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
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