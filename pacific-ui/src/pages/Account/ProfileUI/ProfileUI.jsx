import { Tabs } from 'antd';
import { useState } from 'react';
import { ProfileCard } from '~/pages/Account/ProfileUI/components/ProfileCard';
import { EmptyProfileCard } from '~/pages/Account/ProfileUI/components/EmptyProfileCard';
import { AccountSecurity } from '~/pages/Account/ProfileUI/sections/ProfileInformation/components/AccountSecurity';
import { BookedTour } from '~/pages/Account/historyBooked/BookedTour';
import { useAuth } from '~/config/AuthContext';
import { WishListIndex } from '~/pages/Account/ProfileUI/sections/WishList/WishListIndex';
import { VerifyInformation } from '~/pages/Account/ProfileUI/sections/ProfileInformation/components/VerifyInfomation';
import {
    AccountInformation,
} from '~/pages/Account/ProfileUI/sections/ProfileInformation/components/AccountInformation';

const { TabPane } = Tabs;
export const ProfileUI = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const token = localStorage.getItem('accessToken');
    const [activeTab, setActiveTab] = useState('1');

    const switchTab = (tabKey) => {
        setActiveTab(tabKey);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu tab
    };
    const handleUserUpdate = (updatedUser) => {
        setCurrentUser(updatedUser);
    };
    return (
        <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <div className="w-1/4">
                <ProfileCard data={currentUser} switchTab={switchTab} />
            </div>
            {/* Main Content */}
            <div className="flex-1 ">
                <Tabs
                    animated={{ inkBar: true, tabPane: true }}
                    onChange={switchTab}
                    rootClassName={'bg-white p-4 rounded-lg shadow-md'}
                    activeKey={activeTab}>
                    <TabPane tab="Chỉnh sửa thông tin" key="1">
                        <AccountInformation data={currentUser} switchTab={switchTab} />
                    </TabPane>
                    <TabPane tab="Xác thực thông tin" key="2">
                        <VerifyInformation data={currentUser} onUserUpdate={handleUserUpdate} />
                    </TabPane>
                    <TabPane tab="Bảo mật tài khoản" key="3">
                        <AccountSecurity data={currentUser} />
                    </TabPane>
                    <TabPane tab="Lịch sử đặt tour" key="4">
                        <BookedTour />
                    </TabPane>
                    <TabPane className={' max-h-full overflow-y-scroll'} tab={'Danh sách yêu thích'} key={'5'}>
                        <WishListIndex />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};