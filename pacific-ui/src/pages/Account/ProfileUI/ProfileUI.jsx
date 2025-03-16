import { Card, DatePicker, Input, Tabs } from 'antd';
import { useState } from 'react';
import { ProfileCard } from '~/pages/Account/ProfileUI/components/ProfileCard';
import { EmptyProfileCard } from '~/pages/Account/ProfileUI/components/EmptyProfileCard';
import { AccountSecurity } from '~/pages/Account/ProfileUI/sections/ProfileInformation/components/AccountSecurity';
import { ProfileInformation } from '~/pages/Account/ProfileUI/sections/ProfileInformation/ProfileInformation';
import { BookedTour } from '~/pages/Account/historyBooked/BookedTour';
import HistoryPayment from '~/pages/Account/HistoryPayment/HistoryPayment';
import { useAuth } from '~/config/AuthContext';

const { TabPane } = Tabs;
export const ProfileUI = () => {
    const { currentUser } = useAuth();

    const [active, setActive] = useState(true);
    return (
        <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <div className="w-1/4">
                {active ? (
                    <ProfileCard data={currentUser}/>
                ) : (
                    <EmptyProfileCard/>
                )}
            </div>
            {/* Main Content */}
            <div className="flex-1 ">
                <Tabs rootClassName={"bg-white p-4 rounded-lg shadow-md"} defaultActiveKey="1">
                    <TabPane tab="Chỉnh sửa thông tin" key="1">
                        <ProfileInformation/>
                    </TabPane>
                    <TabPane tab={"Lịch sử thanh toán"} key={"2"}>
                        <HistoryPayment/>
                    </TabPane>
                    <TabPane tab="Lịch sử đặt tour" key="3">
                        <BookedTour/>
                    </TabPane>
                    <TabPane tab="Bảo mật tài khoản" key="4">
                        <AccountSecurity/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};