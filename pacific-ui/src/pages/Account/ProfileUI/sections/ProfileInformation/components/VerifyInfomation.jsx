import { Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaLock } from 'react-icons/fa';
import AuthServices from '~/services/AuthServices';

export const VerifyInformation = ({ data, onUserUpdate }) => {
    const [form] = Form.useForm();
    const [otpState, setOtpState] = useState({
        email: { isSent: false, otp: '', cooldown: 0, loading: false },
        phone: { isSent: false, otp: '', cooldown: 0, loading: false },
    });
    const [userData, setUserData] = useState(data);

    // Update userData and form when data prop changes
    useEffect(() => {
        setUserData(data);
        form.setFieldsValue({
            email: data?.email || '',
            phone: data?.phone || '',
        });
    }, [data, form]);

    // Handle cooldown timers for both email and phone
    useEffect(() => {
        const timer = setInterval(() => {
            setOtpState((prev) => ({
                email: {
                    ...prev.email,
                    cooldown: prev.email.cooldown > 0 ? prev.email.cooldown - 1 : 0,
                },
                phone: {
                    ...prev.phone,
                    cooldown: prev.phone.cooldown > 0 ? prev.phone.cooldown - 1 : 0,
                },
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Unified function to send OTP
    const sendOtp = async (type) => {
        try {
            setOtpState((prev) => ({ ...prev, [type]: { ...prev[type], loading: true } }));
            if (type === 'email') {
                await AuthServices.sendMailVerify(data.email);
            } else {
                // Implement phone OTP sending logic here
                message.info('Chức năng này chưa được triển khai.');
            }
            message.success(`Mã OTP đã được gửi đến ${type === 'email' ? 'email' : 'số điện thoại'} của bạn!`, 1.5);
            setOtpState((prev) => ({
                ...prev,
                [type]: { ...prev[type], isSent: true, cooldown: 60, loading: false },
            }));
        } catch (error) {
            message.error('Gửi mã OTP thất bại! Vui lòng thử lại.', 1.5);
            setOtpState((prev) => ({ ...prev, [type]: { ...prev[type], loading: false } }));
        }
    };

    // Unified function to verify OTP
    const verifyOtp = async (type, otp) => {
        if (!otp) {
            message.error('Vui lòng nhập mã OTP!', 1.5);
            return;
        }
        try {
            setOtpState((prev) => ({ ...prev, [type]: { ...prev[type], loading: true } }));
            let updatedUser;
            if (type === 'email') {
                await AuthServices.verifyEmail({ email: data.email, otp });
                updatedUser = { ...userData, emailVerified: true };
            } else {
                await AuthServices.verifyPhone({ phone: data.phone, otp });
                updatedUser = { ...userData, phoneVerified: true };
            }
            setUserData(updatedUser);
            onUserUpdate(updatedUser); // Notify parent component
            message.success(`${type === 'email' ? 'Email' : 'Số điện thoại'} đã được xác minh thành công!`, 1.5);
            setOtpState((prev) => ({
                ...prev,
                [type]: { ...prev[type], isSent: false, otp: '', loading: false },
            }));
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Xác minh OTP thất bại! Vui lòng kiểm tra mã OTP.';
            message.error(errorMsg, 1.5);
            setOtpState((prev) => ({ ...prev, [type]: { ...prev[type], loading: false } }));
        }
    };

    // Handle OTP input change
    const handleOtpChange = (type, value) => {
        setOtpState((prev) => ({ ...prev, [type]: { ...prev[type], otp: value } }));
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="bg-white max-w-3xl">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Xác thực thông tin</h2>

                <Form form={form} layout="vertical" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Email Field */}
                        <div>
                            <Form.Item
                                name="email"
                                label={<span className="text-sm font-medium text-gray-700">Tài khoản Email</span>}
                            >
                                <Input
                                    placeholder="Nhập email"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                    disabled
                                />
                            </Form.Item>
                            {userData?.emailVerified ? (
                                <div className="flex items-center gap-2 text-green-500 text-sm mt-1">
                                    <FaCheckCircle className="text-lg" />
                                    <span>Đã xác minh</span>
                                </div>
                            ) : (
                                <div className="mt-2 space-y-2">
                                    {otpState.email.isSent ? (
                                        <div className="flex flex-col sm:flex-row items-center gap-2">
                                            <Input
                                                prefix={<FaLock className="text-gray-400" />}
                                                placeholder="Nhập mã OTP"
                                                value={otpState.email.otp}
                                                onChange={(e) => handleOtpChange('email', e.target.value)}
                                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                aria-label="Nhập mã OTP cho email"
                                            />
                                            <button
                                                onClick={() => verifyOtp('email', otpState.email.otp)}
                                                disabled={otpState.email.loading}
                                                className={`w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 border-none rounded-lg px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                                                    otpState.email.loading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                                aria-label="Xác nhận mã OTP cho email"
                                            >
                                                {otpState.email.loading ? 'Đang xử lý...' : 'Xác nhận OTP'}
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => sendOtp('email')}
                                            disabled={otpState.email.cooldown > 0 || otpState.email.loading}
                                            className={`w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 border-none rounded-lg px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                                                otpState.email.cooldown > 0 || otpState.email.loading
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            }`}
                                            aria-label="Gửi mã OTP cho email"
                                        >
                                            {otpState.email.loading
                                                ? 'Đang gửi...'
                                                : otpState.email.cooldown > 0
                                                    ? `Gửi lại sau ${otpState.email.cooldown}s`
                                                    : 'Xác minh'}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <Form.Item
                                name="phone"
                                label={<span className="text-sm font-medium text-gray-700">Số điện thoại</span>}
                            >
                                <Input
                                    placeholder="Nhập số điện thoại"
                                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                    disabled
                                />
                            </Form.Item>
                            {userData?.phoneVerified ? (
                                <div className="flex items-center gap-2 text-green-500 text-sm mt-1">
                                    <FaCheckCircle className="text-lg" />
                                    <span>Đã xác minh</span>
                                </div>
                            ) : (
                                <div className="mt-2 space-y-2">
                                    {otpState.phone.isSent ? (
                                        <div className="flex flex-col sm:flex-row items-center gap-2">
                                            <Input
                                                prefix={<FaLock className="text-gray-400" />}
                                                placeholder="Nhập mã OTP"
                                                value={otpState.phone.otp}
                                                onChange={(e) => handleOtpChange('phone', e.target.value)}
                                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                                                aria-label="Nhập mã OTP cho số điện thoại"
                                            />
                                            <button
                                                onClick={() => verifyOtp('phone', otpState.phone.otp)}
                                                disabled={otpState.phone.loading}
                                                className={`w-full sm:w190-auto bg-orange-500 text-white hover:bg-orange-600 border-none rounded-lg px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                                                    otpState.phone.loading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                                aria-label="Xác nhận mã OTP cho số điện thoại"
                                            >
                                                {otpState.phone.loading ? 'Đang xử lý...' : 'Xác nhận OTP'}
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => sendOtp('phone')}
                                            disabled={otpState.phone.cooldown > 0 || otpState.phone.loading}
                                            className={`w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 border-none rounded-lg px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                                                otpState.phone.cooldown > 0 || otpState.phone.loading
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            }`}
                                            aria-label="Gửi mã OTP cho số điện thoại"
                                        >
                                            {otpState.phone.loading
                                                ? 'Đang gửi...'
                                                : otpState.phone.cooldown > 0
                                                    ? `Gửi lại sau ${otpState.phone.cooldown}s`
                                                    : 'Xác minh'}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};