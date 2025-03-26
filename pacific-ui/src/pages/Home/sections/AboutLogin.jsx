import { Button, Typography } from 'antd';
import Particles from '~/component/Animation/AnimatedUI/Background/Particles';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
const { Title, Text } = Typography;

export const AboutLogin = () => {
    const navigate = useNavigate();
    return (
        <div className={"relative"}>
            <div className="flex items-center justify-center bg-white">
                <Particles
                    particleColors={['#d66e03', '#e8874c']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={false}
                    className={"-z-10 absolute top-0 left-0 w-full h-full object-cover"}/>
                <div
                    className="flex z-40 flex-col md:flex-row items-center max-w-4xl w-full mx-4 p-6 rounded-lg shadow-lg bg-white">
                    {/* Phần Text và Button */}
                    <div className="flex-1 text-left">
                        <Title level={2} className="text-blue-800 font-bold mb-2">
                            Đi nhiều hơn, chi ít hơn
                        </Title>
                        <Title level={4} className="text-blue-600 mb-4">
                            Đăng nhập để tiết kiệm
                        </Title>
                        <Text className="text-gray-700 mb-6 block">
                            Chỉ cần tìm kiếm Genius xanh lam để tiết kiệm 10% trở lên ở những chỗ nghỉ có tham gia
                        </Text>
                        <div className="flex space-x-4">
                            <Button
                                type="primary"
                                size="large"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => navigate(config.routes.login)}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                type="default"
                                size="large"
                                className="border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
                                onClick={() => navigate(config.routes.register)}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>

                    {/* Phần hình minh họa */}
                    <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
                        <div className="relative w-full h-64">
                            {/* Vòng tròn xanh lớn */}
                            <div
                                className="absolute inset-0 bg-blue-600 rounded-full transform translate-x-10 translate-y-10" />
                            {/* Vòng tròn vàng nhỏ */}
                            <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-400 rounded-full" />
                            {/* Hình minh họa ghế và bàn (mô phỏng) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 bg-yellow-500 rounded-lg transform rotate-12" />
                                {/* Ghế */}
                                <div className="w-12 h-12 bg-blue-800 rounded-full absolute bottom-10 right-20" />
                                {/* Bàn */}
                            </div>
                            {/* Text trong hình minh họa */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Text className="text-white font-bold text-lg text-center">
                                    Tìm kiếm <br /> chỗ ở yêu thích
                                </Text>
                            </div>
                            {/* Hình Genius và quà */}
                            <div className="absolute top-0 right-0 flex items-center space-x-2">
                                <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                                    <Text className="text-white font-bold">Genius</Text>
                                </div>
                                <div className="w-8 h-8 bg-yellow-400 rounded-full" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};