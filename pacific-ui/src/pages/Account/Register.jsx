import {Divider, Form, Input, message} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { register } from '~/config/firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '~/config/firebase/firebase';
import config from "~/config";

export const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            message.error('Mật khẩu không trùng khớp', 1);
            return;
        }
        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            message.error('Vui lòng điền đầy đủ thông tin', 1);
            return;
        }
        setLoading(true);
        try {
            const username = `${firstName} ${lastName}`;
            const user = await register(email, password, username);
            if (user.code) {
                message.error(`Lỗi: ${user.message}`, 1);
            } else {
                message.success('Đăng ký thành công!', 1);
                navigate(config.routes.login);
            }
            await signOut(auth);
        } catch (error) {
            message.error(`Đăng ký thất bại: ${error.message}`, 1);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full uppercase max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-6 text-orange-400">Đăng ký</h2>
                <Divider />
                <Form className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Tên<span className={"text-red-500"}>*</span></label>
                        <Input placeholder="Tên" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Họ<span className={"text-red-500"}>*</span></label>
                        <Input placeholder="Họ" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium">Email<span className={"text-red-500"}>*</span></label>
                        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mật khẩu<span className={"text-red-500"}>*</span></label>
                        <Input.Password
                            placeholder="Mật khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Xác nhận mật khẩu *</label>
                        <Input.Password
                            placeholder="Xác nhận mật khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <p className="col-span-2 text-sm text-red-500"><span className={"text-red-500"}>(*)</span> là bắt buộc</p>
                    <div className="col-span-2 justify-center w-1/2 mx-auto">
                        <button
                            onClick={handleRegister}
                            className="w-full bg-orange-400 transition-all hover:bg-orange-700 hover:shadow-lg font-bold text-white py-2 rounded-md"
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </button>
                    </div>
                </Form>
                <div className={'text-center mt-4'}>
                    <p className="text-gray-600">Đã có tài khoản?{' '}
                        <Link to={config.routes.login} className="text-indigo-600 hover:text-indigo-500 font-semibold">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
