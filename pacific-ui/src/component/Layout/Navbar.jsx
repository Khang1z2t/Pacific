import React from 'react';
import NavbarMB from '~/component/Layout/MenuMB/NavbarMB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuth } from '~/config/firebase/AuthContext';
import { Dropdown, Menu, message } from 'antd';
import {auth} from '~/config/firebase/firebase';
import { logout } from '~/config/firebase/auth';

export const Navbar = () => {
    const navItems = [
        {
            title: 'TRANG CHỦ',
            href: '/',
        },
        {
            title: 'TOUR TRONG NƯỚC',
            href: '/tour-trong-nuoc',
        },
        {
            title: 'TOUR NƯỚC NGOÀI',
            href: '#outsidetour',
        },
        {
            title: 'tin tức',
            href: '#news',
        },
        {
            title: 'giới thiệu',
            href: '#aboutus',
        },
    ];
    const NavItemsElm = ({ title, href }) => {
        return (
            <div className={''}>
                <Link to={href}
                      className={'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'}>{title}</Link>
            </div>);
    };

    const handleLogout = async () => {
        try {
            await logout();
            message.success('Đăng xuất thành công!', 1);
        } catch (error) {
            message.error(`Đăng xuất thất bại: ${error.message}`, 1);
        }
    }
    const menuItems = (
        <Menu>
            <Menu.Item key="account">
                <Link to="/account">Account</Link>
            </Menu.Item>
            <Menu.Item key="logout">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Logout
                </button>
            </Menu.Item>
        </Menu>
    );
    const { currentUser } = useAuth();

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to={"/"} className="text-xl font-bold text-indigo-600">
                            MyWebsite
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item, index) => (
                            <NavItemsElm key={index}
                                         title={item.title}
                                         href={item.href} />
                        ))}
                    </div>
                    <div className={'hidden md:flex space-x-4'}>
                        {currentUser ? (
                            <>
                                <Dropdown overlay={menuItems}>
                                    <a onClick={(e) => e.preventDefault()} className="text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold">
                                        Chào mừng {currentUser?.displayName || currentUser?.email}
                                    </a>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Link to={'/dang-nhap'}
                                      className={'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'}>Login</Link>
                                <Link to={'/dang-ky'}
                                      className={'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'}>Register</Link>
                            </>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <NavbarMB />
                    </div>
                </div>
            </nav>
        </header>
    );
};
