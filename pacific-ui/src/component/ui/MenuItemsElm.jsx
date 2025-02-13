import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import config from '~/config';
import React from 'react';

export const MenuItemsElm = ({key,title,href}) => {
    return (
        <Menu.Item key={key}>
            <Link to={href} className="block">{title}</Link>
        </Menu.Item>
    );
};