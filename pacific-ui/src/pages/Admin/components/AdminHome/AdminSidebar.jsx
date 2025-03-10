import React, { useState } from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

export const AdminSidebar = ({ onSelect, menuItems }) => {
    const [collapsed, setCollapsed] = useState(false);
    const siderStyle = {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
    };

    return (
        <Sider
            style={siderStyle}
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={250}
            collapsedWidth={80}
        >

            <div className="flex items-center justify-center py-4 bg-white">
                <img
                    className={collapsed ? "w-20 h-10" : "w-40 h-10"}
                    src="/img/logo.jpg"
                    alt="Pacific Travel"
                />
            </div>
            <br/>

            <Menu theme="dark" mode="inline" items={menuItems} onClick={(e) => onSelect(e.key)} />
        </Sider>
    );
};
