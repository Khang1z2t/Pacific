import React, { useState, useEffect } from 'react';
import { Drawer, Menu, Dropdown, Button, message, Tooltip, Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/config/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import config from '~/config';
import { FaBars } from 'react-icons/fa';

const NavbarMB = () => {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(i18n.language);
    const { handleLogout, currentUser, vouchers } = useAuth();
    const navigate = useNavigate();

    // Cập nhật ngôn ngữ khi thay đổi
    useEffect(() => {
        setSelectedLang(i18n.language);
    }, [i18n.language]);

    // Các mục điều hướng
    const navItems = [
        { title: t('menu.title1'), href: config.routes.home },
        { title: t('menu.title2'), href: config.routes.tourTrongNuoc },
        { title: t('menu.title3'), href: config.routes.tourNgoaiNuoc },
        { title: t('menu.title4'), href: '/news' },
        { title: t('menu.title5'), href: '/lien-he' },
        { title: t('menu.title6'), href: '/gioi-thieu' },
    ];

    // Các mục trong menu người dùng
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

    // Menu người dùng (giống Navbar chính)
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

    // Danh sách ngôn ngữ
    const languages = [
        { code: 'vi', label: 'Tiếng Việt' },
        { code: 'en', label: 'English' },
        { code: 'ja', label: '日本語' },
        { code: 'zh', label: '中文' },
        { code: 'ko', label: '한국어' },
    ];

    // Thay đổi ngôn ngữ
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelectedLang(lng);
    };

    // Lọc voucher còn hiệu lực
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeVouchers = vouchers.filter((voucher) => {
        const startDate = new Date(voucher.startDate);
        const endDate = new Date(voucher.endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return today.getTime() >= startDate.getTime() && today.getTime() <= endDate.getTime();
    });

    // Quản lý trạng thái voucher đã xem
    const [viewedVouchers, setViewedVouchers] = useState(() => {
        const saved = localStorage.getItem('viewedVouchers');
        return saved ? JSON.parse(saved) : [];
    });

    // Lọc voucher chưa xem
    const visibleVouchers = activeVouchers.filter((voucher) => !viewedVouchers.includes(voucher.id));

    // Đánh dấu voucher đã xem
    const handleMarkAsViewed = (voucherId) => {
        const updatedViewedVouchers = [...viewedVouchers, voucherId];
        setViewedVouchers(updatedViewedVouchers);
        localStorage.setItem('viewedVouchers', JSON.stringify(updatedViewedVouchers));
    };

    // Xóa tất cả thông báo
    const handleClearAll = () => {
        const allVoucherIds = activeVouchers.map((voucher) => voucher.id);
        const updatedViewedVouchers = [...new Set([...viewedVouchers, ...allVoucherIds])];
        setViewedVouchers(updatedViewedVouchers);
        localStorage.setItem('viewedVouchers', JSON.stringify(updatedViewedVouchers));
        message.success('Xóa tất cả thông báo thành công', 1);
    };

    // Menu voucher (giống Navbar chính)
    const voucherMenu = (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <div className="bg-white shadow-lg rounded-lg overflow-y-scroll">
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
                                            <p className="font-semibold text-blue-600 text-sm">{voucher.title}</p>
                                            <p className="text-gray-600 text-md">
                                                Mã voucher:{' '}
                                                <Tooltip placement="right" title="Nhấn để sao chép mã">
                                                    <span
                                                        className="font-medium text-red-600 cursor-pointer hover:underline"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(voucher.codeVoucher);
                                                            message.success('Bạn đã lưu mã voucher vào bộ nhớ tạm!', 1);
                                                        }}
                                                    >
                                                        {voucher.codeVoucher}
                                                    </span>
                                                </Tooltip>
                                            </p>
                                            <p className="text-gray-700 text-xs">
                                                Trạng thái: <span
                                                className={`font-medium ${voucher.isUsed ? 'text-green-600' : 'text-red-600'}`}>
                                                    {voucher.isUsed ? 'Đã sử dụng' : 'Chưa sử dụng'}
                                                </span>
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
                            <Menu.Item className="bg-gray-100 hover:text-red-600 transition-all hover:bg-gray-50"
                                       style={{ padding: '12px 16px' }}>
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

    // Menu ngôn ngữ
    const languageMenu = (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <Menu>
                {languages.map((lang) => (
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
    );

    // Mở/đóng Drawer
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                type="text"
                onClick={showDrawer}
                className="md:hidden  text-gray-700 hover:text-yellow-600"
                icon={<FaBars />}
            />
            <Drawer
                title={
                    <Link to={config.routes.home} className="flex items-center text-xl font-bold text-indigo-600">
                        <img
                            className="h-10 w-auto object-cover"
                            src={config.webConfig.defaultLogo}
                            alt="Pacific Travel"
                        />
                    </Link>
                }
                placement="right"
                onClose={onClose}
                open={open}
                width={180}
                bodyStyle={{ padding: 0 }}
            >
                <Menu mode="vertical" className="border-none">
                    {/* Các mục điều hướng */}
                    {navItems.map((item, index) => (
                        <Menu.Item key={index}>
                            <Link
                                to={item.href}
                                onClick={onClose}
                                className="text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold"
                            >
                                {item.title}
                            </Link>
                        </Menu.Item>
                    ))}

                    {/* Ngôn ngữ */}
                    <Menu.Item key="language" className="flex items-center">
                        <Dropdown overlay={languageMenu} trigger={['click']} placement="bottomRight">
                            <button className="flex items-center text-gray-700 hover:text-yellow-600">
                                <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                                {languages.find((lang) => lang.code === selectedLang)?.label || 'Ngôn ngữ'}
                            </button>
                        </Dropdown>
                    </Menu.Item>

                    {/* Voucher */}
                    <Menu.Item key="voucher" className="flex items-center">
                        <Dropdown overlay={voucherMenu} trigger={['click']} placement="bottomRight">
                            <button className="flex items-center text-gray-700 hover:text-yellow-600 relative">
                                <FontAwesomeIcon icon={faBell} className="mr-2" />
                                Voucher
                                {visibleVouchers.length > 0 && (
                                    <Badge
                                        count={visibleVouchers.length}
                                        overflowCount={99}
                                        style={{ backgroundColor: '#f5222d', color: '#fff' }}
                                        className="absolute -top-1 -right-2"
                                    />
                                )}
                            </button>
                        </Dropdown>
                    </Menu.Item>

                    {/* Người dùng hoặc đăng nhập/đăng ký */}
                    {currentUser ? (
                        <>
                            <Menu.SubMenu
                                key="user"
                                title={
                                    <span className="text-gray-700 hover:text-yellow-600 uppercase font-bold">
                                        {currentUser?.username || currentUser?.email}
                                    </span>
                                }
                            >
                                {menuItems.map((item) => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        <Link
                                            to={item.href}
                                            onClick={onClose}
                                            className="block w-full text-left text-gray-700 hover:bg-gray-100"
                                        >
                                            {item.title}
                                        </Link>
                                    </Menu.Item>
                                ))}
                                {currentUser?.role === 'ADMIN' && (
                                    <Menu.Item key="admin">
                                        <Link
                                            to={config.routes.adminHome}
                                            onClick={onClose}
                                            className="block w-full text-left text-gray-700 hover:bg-gray-100"
                                        >
                                            Admin
                                        </Link>
                                    </Menu.Item>
                                )}
                                <Menu.Item key="logout">
                                    <button
                                        onClick={() => {
                                            handleLogout(navigate);
                                            onClose();
                                        }}
                                        className="block w-full text-left text-gray-700 hover:bg-gray-100"
                                    >
                                        {t('menu.title13')}
                                    </button>
                                </Menu.Item>
                            </Menu.SubMenu>
                        </>
                    ) : (
                        <>
                            <Menu.Item key="login">
                                <Link
                                    to={config.routes.login}
                                    onClick={onClose}
                                    className="text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold"
                                >
                                    {t('menu.title14')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="register">
                                <Link
                                    to={config.routes.register}
                                    onClick={onClose}
                                    className="text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold"
                                >
                                    {t('menu.title15')}
                                </Link>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Drawer>
        </>
    );
};

export default NavbarMB;