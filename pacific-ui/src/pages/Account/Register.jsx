import { Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { register } from '~/config/firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '~/config/firebase/firebase';


export const Register = () => {
    //healing async
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    //
    const [messageApi, contextHolder] = message.useMessage();
    //
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            messageApi.error('Mật khẩu không trùng khớp', 1);
            return;
        }
        if (!email || !username || !password || !confirmPassword) {
            messageApi.error('Vui lòng điền đầy đủ thông tin', 1);
            return;
        }

        setLoading(true);

        try {
            const user = await register(email, password,username);
            if (user.code) {
                // Nếu có lỗi từ Firebase (code: error từ Firebase)
                messageApi.error(`Lỗi: ${user.message}`, 1);
            } else {
                messageApi.success('Đăng ký thành công!', 1);
                navigate('/dang-nhap');
            }
            //disable auto login firebase
            await signOut(auth);

        } catch (error) {
            messageApi.error(`Đăng ký thất bại: ${error.message}`, 1);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative ">
            {contextHolder}
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
                    Đăng ký tài khoản
                </h2>
            </div>

            <div className="relative z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form className="space-y-6 bg-white p-6 rounded-lg shadow-xl bg-opacity-80">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Tài khoản Email
                        </label>
                        <div className="mt-2">
                            <Input placeholder="Nhập Email"
                                   rootClassName={'p-2 px-3 py-1.5'}
                                   onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                            Tên tài khoản
                        </label>
                        <div className="mt-2">
                            <Input placeholder="Username"
                                   rootClassName={'p-2 px-3 py-1.5'}
                                   onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Mật khẩu
                            </label>
                        </div>
                        <Input.Password
                            rootClassName={'p-2 px-3 py-1.5'}
                            placeholder="Nhập mât khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                                Xác nhận mật khẩu
                            </label>
                        </div>
                        <Input.Password
                            rootClassName={'p-2 px-3 py-1.5'}
                            placeholder="Nhập xác nhận mật khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            onClick={handleRegister}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
                        </button>
                    </div>
                    {/*<h2 className={'text-center text-indigo-500'}>Hoặc đăng nhập bằng</h2>*/}
                    {/*<div className={'flex justify-center'}>*/}
                    {/*    <button*/}
                    {/*        onClick={handleFacebookLogin}*/}
                    {/*        className={'p-2 bg-blue-600 text-white rounded-md mx-2'}>Facebook*/}
                    {/*    </button>*/}
                    {/*    <button*/}
                    {/*        onClick={handleGoogleLogin}*/}
                    {/*        className={'p-2 bg-red-600 text-white rounded-md mx-2'}>Google</button>*/}
                    {/*</div>*/}
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Đã là thành viên?{' '}
                        <Link to={'/dang-nhap'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Đăng nhập
                        </Link>
                    </p>
                </Form>

            </div>
        </div>

    );
};