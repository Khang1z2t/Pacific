import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '~/services/AuthServices';
import { message } from 'antd';
import WishlistServices from '~/services/WishlistServices';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        getUser(token).then(() => {
            getWishlist(token);
        }).catch((err) => {
            console.error(err);
        });
    }, [token]);

    const getWishlist = async (token) => {
        try {
            const res = await WishlistServices.getWishlist(token);
            setWishlist(res?.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getUser = async (token) => {
        try {
            const res = await AuthService.authToken(token);
            setCurrentUser(res?.data);
            setRole(res?.data.role);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddToWishlist = async (id) => {
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


    const logout = async () => {
        try {
            localStorage.removeItem('accessToken');
            setCurrentUser(null);
            setRole(null);
            return Promise.resolve();
        } catch (error) {
            console.error('Logout failed: ', error.message);
            throw error;
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
        getUser,
        logout,
        loading,
        role,
        wishlist,
        getWishlist,
        handleAddToWishlist,
        handleRemoveWishlist,
        setWishlist,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}