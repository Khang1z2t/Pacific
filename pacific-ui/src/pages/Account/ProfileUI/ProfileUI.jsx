import { Card, DatePicker, Input, Tabs } from 'antd';
import { useState } from 'react';
import { ProfileCard } from '~/pages/Account/ProfileUI/components/ProfileCard';
import { EmptyProfileCard } from '~/pages/Account/ProfileUI/components/EmptyProfileCard';

const { TabPane } = Tabs;

export const ProfileUI = () => {
    const [active, setActive] = useState(true);
    const profile = {
        name: "NguoiDungDepTrai",
        job: "Frontend Developer",
        about: "I'm a frontend developer",
        location: "Hanoi",
        phone: "123456789",
        email: "abc@fpt.edu.vn",
    }
    return (
        <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <div className="w-1/4">
                {active ? (
                    <ProfileCard profile={profile}/>
                ) : (
                    <EmptyProfileCard/>
                )}
            </div>
            {/* Main Content */}
            <div className="flex-1 ">
                <Tabs rootClassName={"bg-white p-4 rounded-lg shadow-md"} defaultActiveKey="1">
                    <TabPane tab="Bảo mật tài khoản" key="1">
                        HI
                    </TabPane>
                    <TabPane tab="Xác minh thông tin" key="2">
                        HELLO
                    </TabPane>
                    <TabPane tab="Chỉnh sửa thông tin" key="3">
                        KAKAKA
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};