import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AuthService from '~/services/AuthServices';
import { message } from 'antd';
import WishlistServices from '~/services/WishlistServices';
import PaymentServices from '~/services/PaymentServices';
import BookingServices from '~/services/BookingServices';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState({});
    const [bookLists, setBookLists] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [role, setRole] = useState(null);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            getUser(token).then(() => {
                getWishlist();
                getPaymentHistory();
                getBooking();
            }).catch((err) => {
                console.error(err);
            });
        } else {
            setLoading(false);
        }
    }, [token]);

    const getUser = useCallback(async (token) => {
        await AuthService.authToken(token).then((res) => {
            setCurrentUser(res?.data);
            setRole(res?.data.role);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
        });
    },[]);

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

    const getBooking = useCallback(async () => {
        try {
            const res = await BookingServices.getBookingByUser(token);
            setBookLists(res?.data);
        } catch (err) {
            console.error(err);
        }
    },[token]);

    const handleAddToWishlist = async (id) => {
        if (!token) {
            message.error('Bạn cần đăng nhập để thực hiện thao tác này.');
            return;
        }

        if (Array.isArray(wishlist) && wishlist.some(item => item?.tourId === id)) {
            message.error('Tour đã có trong danh sách yêu thích');
            return;
        }
        try {
            const res = await WishlistServices.AddToWishlist(id, token);
            setWishlist(prevWishlist => [...prevWishlist, res.data]);
            message.success('Đã thêm vào danh sách yêu thích');
        } catch (err) {
            console.error('Error:', err);
            message.error('Đã xảy ra lỗi, vui lòng thử lại');
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
    const handleGoogleLogin = async (navigate) => {
        try {
            await AuthService.loginGoogle();
            getUser(localStorage.getItem('accessToken'));
            message.success('Đăng nhập thành công!', 1);
            navigate('/');
        } catch (error) {
            message.error(`Đăng nhập thất bại: ${error.message}`, 1);
        }
    };

    const handleLogout = async (navigate) => {
        try {
            localStorage.removeItem('accessToken');
            setCurrentUser(null);
            setRole(null);
            message.success('Đăng xuất thành công!', 1);
            navigate('/');
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
        getBooking,
        currentUser,
        setCurrentUser,
        getUser,
        handleLogout,
        loading,
        role,
        paymentHistory,
        booking,
        setBooking,
        setPaymentHistory,
        getPaymentHistory,
        wishlist,
        getWishlist,
        handleAddToWishlist,
        handleRemoveWishlist,
        setWishlist,
        handleGoogleLogin,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}