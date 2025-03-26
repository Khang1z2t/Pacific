import React, { useEffect } from 'react';
import NavbarMB from '~/component/Layout/MenuMB/NavbarMB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/config/AuthContext';
import { Dropdown, Menu } from 'antd';
import { Button, Dropdown, Menu, message } from 'antd';
import config from '~/config';
import AuthService from '~/services/AuthServices';
import { useNavigate } from 'react-router-dom';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";

export const Navbar = () => {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language);
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        setSelectedLang(i18n.language);
    }, [i18n.language]);


    useEffect(() => {

    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await logout();
            message.success('Đăng xuất thành công!', 1);
            navigate('/')
        } catch (error) {
            message.error(`Đăng xuất thất bại: ${error.message}`, 1);
        }
    };

    const navItems = [
        {
            title: t("menu.title1"),
            href: config.routes.home,
        },
        {
            title: t("menu.title2"),
            href: config.routes.tourTrongNuoc,
        },
        {
            title: t("menu.title3"),
            href: config.routes.tourNgoaiNuoc,
        },
        {
            title: t("menu.title4"),
            href: '/news',
        },
        {
            title: t("menu.title5"),
            href: '/lien-he',
        },
        {
            title: t("menu.title6"),
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
            title: t("menu.title7"),
            icon: <FontAwesomeIcon icon="user" />,
            href: config.routes.profile,
        },
        {
            key: 'doi-mat-khau',
            title: t("menu.title8"),
            icon: <FontAwesomeIcon icon="key" />,
            href: config.routes.changePassword,
        },
    ];

    const menuItemsTour = [
        {
            key: 'thong-tin-tour',
            title: t("menu.title9"),
            icon: <FontAwesomeIcon icon="info" />,
            href: config.routes.tourInfo,
        },
    ];
    const menuGroup = (
        <Menu>
            <Menu.ItemGroup title={t("menu.title10")}>
                {menuItems.map((item) => (
                    <Menu.Item icon={item.icon} key={item.key}>
                        <Link to={item.href} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup title={t("menu.title11")}>
                {menuItemsTour.map((item) => (
                    <Menu.Item icon={item.icon} key={item.key}>
                        <Link to={item.href} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup title={t("menu.title12")}>
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
                        {t("menu.title13")}
                    </button>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );

    const languages = [
        { code: "vi", label: "Tiếng Việt" },
        { code: "en", label: "English" },
        { code: "ja", label: "日本語" },
        { code: "zh", label: "中文" },
        { code: "ko", label: "한국어" }
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelectedLang(lng);
    };

    const languageMenu = (
        <Menu>
            {languages.map(lang => (
                <Menu.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
                    {lang.label}
                </Menu.Item>
            ))}
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
                    {/*<div className={'hidden md:flex space-x-4'}>*/}
                    <div className={'hidden md:flex space-x-4 items-center ml-auto'}>
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
                                    {t("menu.title14")}
                                </Link>
                                <Link
                                    to={config.routes.register}
                                    className={
                                        'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'
                                    }
                                >
                                    {t("menu.title15")}
                                </Link>
                                <Dropdown overlay={languageMenu} trigger={['click']}>
                                    <Button className="text-gray-700 hover:text-yellow-600 uppercase font-bold px-2 py-1 text-sm">
                                        <FontAwesomeIcon icon={faGlobe} className="mr-1 text-sm" />
                                        {languages.find(l => l.code === selectedLang)?.label || "Language"}
                                    </Button>
                                </Dropdown>
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
