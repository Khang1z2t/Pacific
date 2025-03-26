import Iridescence from '~/component/Animation/AnimatedUI/Background/Iridescence';
import { Divider, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { useAuth } from '~/config/AuthContext';
import AuthServices from '~/services/AuthServices';


export const ChangePassword = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (password !== confirmPassword) {
            message.warning('Mật khẩu không khớp', 1);
            return;
        }
        if(password === '' || confirmPassword === ''){
            message.warning('Mật khẩu không được để trống', 1);
            return;
        }
        if (password.length < 6) {
            message.warning('Mật khẩu phải dài hơn 6 ký tự', 1);
            return;
        }
        console.log(currentUser.email, password, confirmPassword);
        await AuthServices.resetPassword(currentUser.email, password, confirmPassword);
        message.success('Đổi mật khẩu thành công', 1);
        navigate(config.routes.profile);
    }
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
                <h2 className="text-2xl font-bold mb-2 text-center text-orange-400">Đổi mật khẩu</h2><Divider />
                <Form className="space-y-4">
                    <div className={'space-y-2'}>
                        <label className="block text-sm font-medium">Tên tài khoản</label>
                        <Input value={currentUser.username} disabled/>
                    </div>
                    <div className={'space-y-2'}>
                        <div className={'flex justify-between'}>
                            <label className="block text-sm font-medium">Email đang sử dụng</label>
                            <a className={"text-sm text-blue-500 items-center"}>Email không đúng?</a>
                        </div>
                        <Input value={currentUser.email} disabled/>
                    </div>
                    <div className={'space-y-2'}>
                        <label className="block text-sm font-medium">Mật khẩu</label>
                        <Input.Password
                            placeholder="Mật khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={'space-y-2'}>
                        <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
                        <Input.Password
                            placeholder="Mật khẩu"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className={"justify-center flex items-center gap-2"}>
                        <p className={"text-sm font-medium"}>Không phải bạn? {' '}</p>
                        <Link to={"#"} className={"text-red-500"}>Báo cáo!</Link>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleChangePassword}
                            className="px-6 py-2 w-1/2 bg-black text-white rounded-md font-semibold hover:bg-gray-800"
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </Form>
            </div>
        </div>

    );
};