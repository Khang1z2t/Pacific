import {createContext, useContext, useEffect, useState} from 'react';
import AuthService from '~/services/AuthServices';
import {message} from 'antd';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {
        AuthService.authToken(localStorage.getItem('accessToken')).then((res) => {
            setCurrentUser(res?.data);
            setRole(res?.data.role);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setCurrentUser(null);
            localStorage.removeItem('accessToken');
        })
    }, []);

    const logout = async () => {
        try {
            localStorage.removeItem('accessToken');
            setCurrentUser(null);
            setRole(null);
            message.success('Đăng xuất thành công', 1);
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
    }

    const value = {
        getToken,
        currentUser,
        logout,
        loading,
        role,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}