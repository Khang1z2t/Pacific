import '~/pages/j.css';
import React, { useState } from 'react';
import { Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { doSignInWithFacebook, doSignInWithGoogle } from '~/config/firebase/auth';
import { login } from '~/config/firebase/auth';

export const Login = () => {
    //healing async
    const [loading, setLoading] = useState(false);
    //
    const navigate = useNavigate();
    //
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSignIn, setIsSignIn] = useState(false);

    //
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            if (!username || !password) {
                message.error('Vui lòng điền đầy đủ thông tin', 1);
                return;
            }
            setLoading(true);
            const user = await login(username, password);
            if (user.code) {
                // Nếu có lỗi từ Firebase (code: error từ Firebase)
                message.error(`Lỗi: ${user.message}`, 1);
            } else {
                message.success('Đăng nhập thành công!', 1);
                navigate('/');
            }
        }catch (error){
            message.error(`Đăng nhập thất bại: ${error.message}`, 1);
        }finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        if (!isSignIn) {
            setIsSignIn(true);
            doSignInWithGoogle().then(() => {
                navigate('/');
            }).catch(() => {
                message.error('Đăng nhập thất bại', 1);
            });
            // document.location.href = '/';
        }
    };

    const handleFacebookLogin = async (e) => {
        e.preventDefault();
        if (!isSignIn) {
            setIsSignIn(true);
            doSignInWithFacebook().then(() => {
                window.location.href = '/';
            }).catch(() => {
                message.error('Đăng nhập thất bại', 1);
            });
            // document.location.href = '/';
        }
    };

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative ">

            {/* Animated Background with Blur */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-unique-gradient blur-lg opacity-75" />

            {/* Content */}
            <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Đăng nhập
                </h2>
            </div>

            <div className="relative z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6 bg-white p-6 rounded-lg shadow-xl bg-opacity-80">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <Input placeholder="Email"
                                   rootClassName={'p-2 px-3 py-1.5'}
                                   onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <Input.Password
                            rootClassName={'p-2 px-3 py-1.5'}
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            onClick={handleLogin}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </div>
                    <h2 className={'text-center text-indigo-500'}>Hoặc đăng nhập bằng</h2>
                    <div className={'flex justify-center'}>
                        <button
                            onClick={handleFacebookLogin}
                            className={'p-2 bg-blue-600 text-white rounded-md mx-2'}>Facebook
                        </button>
                        <button
                            onClick={handleGoogleLogin}
                            className={'p-2 bg-red-600 text-white rounded-md mx-2'}>Google
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Chưa có tài khoản?{' '}
                    <Link to={'/dang-ky'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Tạo tài khoản
                    </Link>
                </p>

            </div>
        </div>
    );
};
