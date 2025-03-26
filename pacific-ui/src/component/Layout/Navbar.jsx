import React, { useEffect } from 'react';
import NavbarMB from '~/component/Layout/MenuMB/NavbarMB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/config/AuthContext';
import { Dropdown, Menu } from 'antd';
import config from '~/config';

export const Navbar = () => {

    const navItems = [
        {
            title: 'TRANG CHỦ',
            href: config.routes.home,
        },
        {
            title: 'TOUR TRONG NƯỚC',
            href: config.routes.tourTrongNuoc,
        },
        {
            title: 'TOUR NƯỚC NGOÀI',
            href: config.routes.tourNgoaiNuoc,
        },
        {
            title: 'tin tức',
            href: '/news',
        },
        {
            title: 'liên hệ',
            href: '/lien-he',
        },
        {
            title: 'giới thiệu',
            href: '/gioi-thieu',
        },
    ];
    const NavItemsElm = ({ title, href }) => {
        return (
            <div className={''}>
                <Link
                    to={href}
                    className={'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'}
                >
                    {title}
                </Link>
            </div>
        );
    };
    const { handleLogout, currentUser,getUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

    }, [currentUser]);


    const menuItems = [
        {
            key: 'thong-tin-ca-nhan',
            title: 'Thông tin cá nhân',
            icon: <FontAwesomeIcon icon="user" />,
            href: config.routes.profile,
        },
        {
            key: 'doi-mat-khau',
            title: 'Đổi mật khẩu',
            icon: <FontAwesomeIcon icon="key" />,
            href: config.routes.changePassword,
        },
    ];

    const menuItemsTour = [
        {
            key: 'thong-tin-tour',
            title: 'Thông tin tour',
            icon: <FontAwesomeIcon icon="info" />,
            href: config.routes.tourInfo,
        },
    ];
    const menuGroup = (
        <Menu>
            <Menu.ItemGroup title="Tài khoản">
                {menuItems.map((item) => (
                    <Menu.Item icon={item.icon} key={item.key}>
                        <Link to={item.href} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Booking">
                {menuItemsTour.map((item) => (
                    <Menu.Item icon={item.icon} key={item.key}>
                        <Link to={item.href} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Khác">
                {currentUser?.role === 'ADMIN' && (
                    <Menu.Item key="admin">
                        <Link to={config.routes.adminHome} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Admin
                        </Link>
                    </Menu.Item>
                    )}
                <Menu.Item key="logout">
                    <button
                        onClick={() => handleLogout(navigate)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Đăng xuất
                    </button>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to={config.routes.home} className="flex items-center text-xl font-bold text-indigo-600">
                            <img
                                className={'h-12 w-full hidden object-cover lg:block'}
                                src="/img/logo.jpg"
                                alt="Pacific Travel"
                            />
                            {/*<span className={'text-black font-light'}>Pacific</span>*/}
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="hidden md:flex space-x-8 ">
                        {navItems.map((item, index) => (
                            <NavItemsElm key={index} title={item.title} href={item.href} />
                        ))}
                    </div>
                    <div className={'hidden md:flex space-x-4'}>
                        {currentUser ? (
                            <>
                                <Dropdown overlay={menuGroup}>
                                    <a
                                        onClick={(e) => e.preventDefault()}
                                        className="text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold"
                                    >
                                        {currentUser?.username || currentUser?.email}
                                    </a>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={config.routes.login}
                                    className={
                                        'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'
                                    }
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    to={config.routes.register}
                                    className={
                                        'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'
                                    }
                                >
                                    Đăng ký
                                </Link>
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
