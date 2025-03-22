import '~/pages/j.css';
import React, { useState } from 'react';
import { Divider, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import UserServices from '~/services/UserServices';
import Iridescence from '~/component/Animation/AnimatedUI/Background/Iridescence';
import AuthService from '~/services/AuthServices';
import { useAuth } from '~/config/AuthContext';

export const Login = () => {
    //healing async
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setCurrentUser, getUser } = useAuth();
    const [password, setPassword] = useState('');
    const [identifier, setIdentifier] = useState('');

    const [isSignIn, setIsSignIn] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!identifier || !password) {
                message.error('Vui lòng điền đầy đủ thông tin', 1);
                return;
            }
            // if (identifier.includes('@')) {
            //     user = await loginWEmail(identifier, password);
            // } else {
            //     user = await loginWithUsername(identifier, password);
            // }
            const user = await AuthService.login(identifier, password);
            setCurrentUser(user.data);
            message.success('Đăng nhập thành công!', 1);
            navigate('/');
        } catch (er) {
            message.error(`Đăng nhập thất bại: ${er.message}`, 1);
        } finally {
            setLoading(false);
        }
    };


    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        if (!isSignIn) {
            setIsSignIn(true);
            await AuthService.loginGoogle(getUser).then(() => {
                navigate('/');
                message.success('Đăng nhập thành công', 2);
            }).catch(() => {
                message.error('Đăng nhập Google thất bại', 5);
            });
        }
    };

    const handleFacebookLogin = async (e) => {
        e.preventDefault();
        message.warning('Chức năng đang phát triển', 2);
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Iridescence
                color={[1, 1, 1]}
                mouseReact={false}
                amplitude={0.1}
                speed={1.0}
                className="absolute inset-0 z-0"
            />
            <div className="bg-white relative p-8 rounded-lg shadow-lg w-full uppercase max-w-md border">
                <h2 className="text-2xl font-bold mb-2 text-center text-orange-400">Đăng nhập</h2><Divider />
                <Form className="space-y-4">
                    <div className={'space-y-2'}>
                        <label className="block text-sm font-medium">Email/Tên tài khoản<span
                            className="text-red-500">*</span></label>
                        <Input placeholder="Nhập Email hoặc Tên tài khoản"
                               onChange={(e) => setIdentifier(e.target.value)} />
                    </div>
                    <div className={'space-y-2'}>
                        <div className={'flex justify-between'}>
                            <label className="block text-sm font-medium">Mật khẩu<span
                                className="text-red-500">*</span></label>
                            <Link to={config.routes.forgotPassword} className="text-sm text-blue-500">Quên mật
                                khẩu?</Link>
                        </div>
                        <Input.Password
                            placeholder="Mật khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="col-span-2 text-sm text-red-500"><span className={'text-red-500'}>(*)</span> là bắt
                        buộc
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            className="px-6 py-2 w-1/2 bg-black text-white rounded-md font-semibold hover:bg-gray-800"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Chưa có tài khoản?{' '}
                            <Link to={config.routes.register}
                                  className="text-orange-500 hover:text-orange-400 font-semibold">
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </Form>
                <Divider plain children={'Hoặc đăng nhập với'} />
                <div className="flex gap-4 justify-between">
                    <button
                        onClick={handleGoogleLogin}
                        className="p-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600"
                    >
                        Đăng nhập với Google
                    </button>
                    <button
                        onClick={handleFacebookLogin}
                        className="p-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
                    >
                        Đăng nhập với Facebook
                    </button>
                    {/*<Divider/>*/}
                    {/*<Oauth2LoginButtons/>*/}
                </div>
            </div>
        </div>
    );
};