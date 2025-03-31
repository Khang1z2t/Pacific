import { useEffect, useState } from 'react';
import NavbarMB from '~/component/Layout/MenuMB/NavbarMB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/config/AuthContext';
import { Dropdown, Menu, message } from 'antd';
import { motion } from 'framer-motion';
import config from '~/config';
import { faBell, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language);
    const { handleLogout, currentUser, vouchers } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        setSelectedLang(i18n.language);
    }, [i18n.language]);

    useEffect(() => {
    }, [currentUser]);

    const navItems = [
        {
            title: t('menu.title1'),
            href: config.routes.home,
        },
        {
            title: t('menu.title2'),
            href: config.routes.tourTrongNuoc,
        },
        {
            title: t('menu.title3'),
            href: config.routes.tourNgoaiNuoc,
        },
        {
            title: t('menu.title4'),
            href: '/news',
        },
        {
            title: t('menu.title5'),
            href: '/lien-he',
        },
        {
            title: t('menu.title6'),
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

    const menuItems = [
        {
            key: 'thong-tin-ca-nhan',
            title: t('menu.title7'),
            icon: <FontAwesomeIcon icon="user" />,
            href: config.routes.profile,
        },
        {
            key: 'doi-mat-khau',
            title: t('menu.title8'),
            icon: <FontAwesomeIcon icon="key" />,
            href: config.routes.changePassword,
        },
    ];

    const menuItemsTour = [
        {
            key: 'thong-tin-tour',
            title: t('menu.title9'),
            icon: <FontAwesomeIcon icon="info" />,
            href: config.routes.tourInfo,
        },
    ];
    const menuGroup = (
        <Menu>
            <Menu.ItemGroup title={t('menu.title10')}>
                {menuItems.map((item) => (
                    <Menu.Item icon={item.icon} key={item.key}>
                        <Link to={item.href}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup title={t('menu.title11')}>
                {menuItemsTour.map((item) => (
                    <Menu.Item icon={item.icon} key={item.key}>
                        <Link to={item.href}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup title={t('menu.title12')}>
                {currentUser?.role === 'ADMIN' && (
                    <Menu.Item key="admin">
                        <Link to={config.routes.adminHome}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Admin
                        </Link>
                    </Menu.Item>
                )}
                <Menu.Item key="logout">
                    <button
                        onClick={() => handleLogout(navigate)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        {t('menu.title13')}
                    </button>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );

    const languages = [
        { code: 'vi', label: 'Tiếng Việt' },
        { code: 'en', label: 'English' },
        { code: 'ja', label: '日本語' },
        { code: 'zh', label: '中文' },
        { code: 'ko', label: '한국어' },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelectedLang(lng);
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeVouchers = vouchers.filter((voucher) => {
        const startDate = new Date(voucher.startDate);
        const endDate = new Date(voucher.endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return today.getTime() >= startDate.getTime() && today.getTime() <= endDate.getTime();
    });


    useEffect(() => {
        // Kiểm tra và hiển thị thông báo voucher chỉ một lần
        const checkAndShowVoucherNotification = () => {
            const todayKey = `voucher_notified_${new Date().toDateString()}`; // Tạo key duy nhất cho mỗi ngày
            const hasShownToday = localStorage.getItem(todayKey);

            if (!hasShownToday && activeVouchers.length > 0) {
                activeVouchers.forEach((voucher) => {
                    message.info('Pacific có quà tặng bạn, hãy kiểm tra thông báo nhé!',1);
                });
                localStorage.setItem(todayKey, 'true'); // Đánh dấu là đã hiển thị cho ngày hôm nay
            }
        };

        checkAndShowVoucherNotification();
    }, [vouchers]); // Chỉ chạy lại khi vouchers thay đổi

// Khởi tạo trạng thái viewedVouchers
    const [viewedVouchers, setViewedVouchers] = useState(() => {
        const saved = localStorage.getItem('viewedVouchers');
        return saved ? JSON.parse(saved) : [];
    });

// Lọc các voucher chưa được xem
    const visibleVouchers = activeVouchers.filter((voucher) => !viewedVouchers.includes(voucher.id));

// Hàm xử lý khi nhấn nút "Đã xem"
    const handleMarkAsViewed = (voucherId) => {
        const updatedViewedVouchers = [...viewedVouchers, voucherId];
        setViewedVouchers(updatedViewedVouchers);
        localStorage.setItem('viewedVouchers', JSON.stringify(updatedViewedVouchers));
    };

    const handleClearAll = () => {
        // Lấy tất cả ID của activeVouchers
        const allVoucherIds = activeVouchers.map((voucher) => voucher.id);
        // Thêm tất cả ID vào viewedVouchers (coi như đã xem hết)
        const updatedViewedVouchers = [...new Set([...viewedVouchers, ...allVoucherIds])]; // Sử dụng Set để tránh trùng lặp
        setViewedVouchers(updatedViewedVouchers);
        localStorage.setItem('viewedVouchers', JSON.stringify(updatedViewedVouchers));
        message.success('Xóa tất cả thông báo thành công',1);
    };

    const voucherMenu = (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <div className={"bg-white shadow-lg rounded-lg overflow-y-scroll"}>
                <Menu className="max-h-96">
                    {visibleVouchers.length > 0 ? (
                        <>
                            {visibleVouchers.map((voucher) => (
                                <Menu.Item
                                    key={voucher.id}
                                    className="hover:bg-gray-100 transition-colors duration-200"
                                    style={{ padding: '12px 16px' }}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-blue-600 text-sm">
                                                {voucher.title}
                                            </p>
                                            <p className="text-gray-700 text-xs">
                                                Giảm giá: <span
                                                className="font-medium text-green-600">{voucher.discountValue}%</span>
                                            </p>
                                            <p className="text-gray-600 text-xs">
                                                Ngày bắt đầu: {config.webConfig.convertDateNoTime(voucher.startDate)}
                                            </p>
                                            <p className="text-gray-600 text-xs">
                                                Ngày kết thúc: {config.webConfig.convertDateNoTime(voucher.endDate)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleMarkAsViewed(voucher.id)}
                                            className="text-xs text-white bg-red-500 hover:bg-red-600 rounded-full px-2 py-1 transition-colors duration-200"
                                        >
                                            Đã xem
                                        </button>
                                    </div>
                                </Menu.Item>
                            ))}
                            <Menu.Item style={{ padding: '12px 16px' }}>
                                <button
                                    onClick={handleClearAll}
                                    className="w-full text-center text-sm text-red-500 hover:text-red-600"
                                >
                                    Xóa tất cả thông báo
                                </button>
                            </Menu.Item>
                        </>
                    ) : (
                        <Menu.Item disabled style={{ padding: '12px 16px' }}>
                            <p className="text-red-500 text-sm font-medium">
                                Không có voucher nào khả dụng hôm nay
                            </p>
                        </Menu.Item>
                    )}
                </Menu>
            </div>
        </motion.div>
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
                                src={config.webConfig.defaultLogo}
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
                        <Dropdown
                            overlay={(
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu>
                                        {languages.map(lang => (
                                            <Menu.Item
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className="hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                {lang.label}
                                            </Menu.Item>
                                        ))}
                                    </Menu>
                                </motion.div>
                            )}
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <button
                                className="w-10 h-10 flex items-center justify-center text-blue-700 hover:text-yellow-600 hover:bg-gray-100 transition-all duration-300 rounded-full border-none shadow-lg"
                            >
                                <FontAwesomeIcon
                                    icon={faGlobe}
                                    className="text-lg"
                                />
                            </button>
                        </Dropdown>
                        {currentUser ? (
                            // Giữ nguyên phần code cho currentUser
                            <>
                                <Dropdown
                                    overlay={voucherMenu}
                                    trigger={['click']}
                                    placement="bottomRight"
                                >
                                    <button
                                        className="w-10 h-10 flex items-center justify-center text-blue-700 hover:text-yellow-600 hover:bg-gray-100 transition-all duration-300 rounded-full border-none shadow-lg relative"
                                    >
                                        <FontAwesomeIcon
                                            icon={faBell}
                                            className="text-lg"
                                        />
                                        {visibleVouchers.length > 0 && (
                                            <span
                                                className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                                                {visibleVouchers.length}
                                            </span>
                                        )}
                                    </button>
                                </Dropdown>
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
                            // Giữ nguyên phần code cho login/register
                            <>
                                <Link
                                    to={config.routes.login}
                                    className={'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'}
                                >
                                    {t('menu.title14')}
                                </Link>
                                <Link
                                    to={config.routes.register}
                                    className={'text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold'}
                                >
                                    {t('menu.title15')}
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
