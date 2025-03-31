import '~/pages/j.css';
import React, { useState } from 'react';
import { Divider, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import config from '~/config';
import Iridescence from '~/component/Animation/AnimatedUI/Background/Iridescence';
import AuthService from '~/services/AuthServices';
import { useAuth } from '~/config/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    //healing async
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { setCurrentUser, handleGoogleLogin } = useAuth();
    const [password, setPassword] = useState('');
    const [identifier, setIdentifier] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!identifier || !password) {
                message.error(t("login.ti1"), 1);
                return;
            }
            // if (identifier.includes('@')) {
            //     user = await loginWEmail(identifier, password);
            // } else {
            //     user = await loginWithUsername(identifier, password);
            // }
            const user = await AuthService.login(identifier, password);
            setCurrentUser(user.data);
            message.success(t("login.ti2"), 1);
            navigate('/');
            await AuthService.login(identifier, password).then(r => {
                setCurrentUser(r.data);
                message.success('Đăng nhập thành công!', 1);
                navigate('/');
            });

        } catch (er) {
            message.error(`${t("login.ti3")} ${er.message}`, 1);
        } finally {
            setLoading(false);
        }
    };


    // const handleGoogleLogin = async (e) => {
    //     e.preventDefault();
    //     if (!isSignIn) {
    //         setIsSignIn(true);
    //         await AuthService.loginGoogle(getUser).then(() => {
    //             navigate('/');
    //             message.success(t("login.ti2"), 2);
    //         }).catch(() => {
    //             message.error(t("login.ti4"), 5);
    //         });
    //     }
    // };


    const handleFacebookLogin = async (e) => {
        e.preventDefault();
        message.warning(t("login.ti5"), 2);
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
                <h2 className="text-2xl font-bold mb-2 text-center text-orange-400">{t("login.ti6")}</h2><Divider />
                <Form className="space-y-4">
                    <div className={'space-y-2'}>
                        <label className="block text-sm font-medium">{t("login.ti7")}<span
                            className="text-red-500">*</span></label>
                        <Input placeholder={t("login.ti8")}
                               onChange={(e) => setIdentifier(e.target.value)} />
                    </div>
                    <div className={'space-y-2'}>
                        <div className={'flex justify-between'}>
                            <label className="block text-sm font-medium">{t("login.ti9")}<span
                                className="text-red-500">*</span></label>
                            <Link to={config.routes.forgotPassword} className="text-sm text-blue-500">{t("login.ti10")}</Link>
                        </div>
                        <Input.Password
                            placeholder={t("login.ti9")}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="col-span-2 text-sm text-red-500"><span className={'text-red-500'}>(*)</span> {t("login.ti11")}
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            className="px-6 py-2 w-1/2 bg-black text-white rounded-md font-semibold hover:bg-gray-800"
                        >
                            {loading ? t("login.ti12") : t("login.ti6")}
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">{t("login.ti13")}{' '}
                            <Link to={config.routes.register}
                                  className="text-orange-500 hover:text-orange-400 font-semibold">
                                {t("login.ti14")}
                            </Link>
                        </p>
                    </div>
                </Form>
                <Divider plain children={t("login.ti15")} />
                <div className="flex gap-4 justify-between">
                    <button
                        onClick={() => handleGoogleLogin(navigate)}
                        className="p-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600"
                    >
                        {t("login.ti16")}
                    </button>
                    <button
                        onClick={handleFacebookLogin}
                        className="p-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
                    >
                        {t("login.ti17")}
                    </button>
                    {/*<Divider/>*/}
                    {/*<Oauth2LoginButtons/>*/}
                </div>
            </div>
        </div>
    );
};