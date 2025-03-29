import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AuthService from '~/services/AuthServices';
import { Button, message, Modal } from 'antd';
import WishlistServices from '~/services/WishlistServices';
import PaymentServices from '~/services/PaymentServices';
import BookingServices from '~/services/BookingServices';
import config from '~/config/index';
import { GoogleOutlined, LoginOutlined } from '@ant-design/icons';
import { BiRegistered } from 'react-icons/bi';
import { GoSignOut } from 'react-icons/go';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [role, setRole] = useState(null);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            getUser(token).then(() => {
                getWishlist();
                getPaymentHistory();
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [token]);

    const getUser = useCallback(async (token) => {
        try {
            const res = await AuthService.authToken(token);
            setCurrentUser(res?.data);
            setRole(res?.data.role);
            setLoading(false);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('accessToken');
            }
            setCurrentUser(null);
            setRole(null);
            setLoading(false);
            throw err;
        }
    }, []);

    const getPaymentHistory = useCallback(async () => {
        try {
            const res = await PaymentServices.getHistoryPayments(token);
            setPaymentHistory(res?.data);
        } catch (err) {
            console.error(err);
        }
    }, [token]);

    const getWishlist = useCallback(async () => {
        try {
            const res = await WishlistServices.getWishlist(token);
            setWishlist(res?.data);
        } catch (err) {
            console.error(err);
        }
    }, [token]);


    const handleAddToWishlist = async (id) => {
        if (!token) {
            // message.error('Bạn cần đăng nhập để thực hiện thao tác này.');
            setIsModalVisible(true);
            return;
        }

        const existingItem = wishlist.find((item) => item?.tourId === id);

        if (existingItem) {
            // Nếu tour đã có trong wishlist, xóa nó
            try {
                await WishlistServices.removeWishlist(existingItem.id, token);
                setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== existingItem.id));
                message.success('Đã xóa khỏi danh sách yêu thích');
            } catch (err) {
                console.error('Error removing from wishlist:', err);
                message.error('Đã xảy ra lỗi khi xóa, vui lòng thử lại');
            }
        } else {
            // Nếu tour chưa có trong wishlist, thêm nó
            try {
                const res = await WishlistServices.AddToWishlist(id, token);
                setWishlist((prevWishlist) => [...prevWishlist, res.data]);
                message.success('Đã thêm vào danh sách yêu thích');
            } catch (err) {
                console.error('Error adding to wishlist:', err);
                message.error('Đã xảy ra lỗi khi thêm, vui lòng thử lại');
            }
        }
    };

    const handleRemoveWishlist = async (wishlistId, onWishlistChange) => {
        if (!token) {
            message.error('Bạn cần đăng nhập để thực hiện thao tác này.');
            return;
        }

        try {
            const response = await WishlistServices.removeWishlist(wishlistId, token);
            if (response) {
                message.success('Đã xóa khỏi danh sách yêu thích');
                setWishlist(prev => prev.filter(item => item.id !== wishlistId));
                if (onWishlistChange) onWishlistChange();
            } else {
                message.error('Xóa thất bại');
            }
        } catch (err) {
            console.error('Error removing from wishlist:', err);
            message.error('Đã xảy ra lỗi, vui lòng thử lại');
        }
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        // Có thể thêm logic chuyển hướng đến trang đăng nhập nếu muốn
        window.location.href = config.routes.login;
    };

    const handleModalRegister = () => {
        setIsModalVisible(false);
        // Có thể thêm logic chuyển hướng đến trang đăng ký nếu muốn
        window.location.href = config.routes.register;
    }
    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    // const handleGoogleLogin = async (navigate) => {
    //     try {
    //         await AuthService.loginGoogle();
    //         await getUser(localStorage.getItem('accessToken'));
    //         message.success('Đăng nhập thành công!', 1);
    //         navigate('/');
    //     } catch (error) {
    //         message.error(`Đăng nhập thất bại: ${error.message}`, 1);
    //     }
    // };

    const handleLogout = async (navigate) => {
        try {
            localStorage.removeItem('accessToken');
            setCurrentUser(null);
            setRole(null);
            //reload
            message.success('Đăng xuất thành công!', 1);
            navigate('/');
            window.location.reload();
        } catch (error) {
            message.error(`Đăng xuất thất bại: ${error.message}`, 1);
        }
    };
    const getToken = async () => {
        try {
            return localStorage.getItem('accessToken');
        } catch (error) {
            console.error('Get token failed: ', error.message);
            throw error;
        }
    };

    const value = {
        getToken,
        currentUser,
        setCurrentUser,
        getUser,
        handleLogout,
        loading,
        role,
        paymentHistory,
        setPaymentHistory,
        getPaymentHistory,
        wishlist,
        token,
        getWishlist,
        handleAddToWishlist,
        handleRemoveWishlist,
        setWishlist,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            <Modal
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                footer={null}
                width={400}
                className="rounded-xl overflow-hidden shadow-2xl"
                closeIcon={<span className="text-white text-lg">×</span>}
            >

                {/* Body */}
                <div className="p-6 text-center bg-gray-50">
                    <p className="text-gray-600 text-base mb-6">
                        Để trải nghiệm tốt hơn! Hãy đăng nhập để sử dụng đầy đủ tính năng của chúng tôi.
                    </p>

                    <div className="space-y-4">
                        <Button
                            type="primary"
                            size="large"
                            icon={<LoginOutlined />}
                            onClick={handleModalOk}
                            className="w-full bg-blue-500 hover:bg-blue-600 border-none rounded-md h-11 text-base font-medium transition-all duration-200"
                        >
                            Đi đến trang đăng nhập
                        </Button>

                        <Button
                            size="large"
                            icon={<GoSignOut/>}
                            onClick={handleModalRegister}
                            className="w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 rounded-md h-11 text-base font-medium shadow-sm transition-all duration-200"
                        >
                            Chưa có tài khoản? Đi tới đăng ký!
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthContext.Provider>
    );
}