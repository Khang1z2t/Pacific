import { AccountSecurity } from '~/pages/Account/ProfileUI/sections/ProfileInformation/components/AccountSecurity';
import { Divider } from 'antd';
import { VerifyInformation } from '~/pages/Account/ProfileUI/sections/ProfileInformation/components/VerifyInfomation';
import {
    AccountInformation
} from '~/pages/Account/ProfileUI/sections/ProfileInformation/components/AccountInformation';

export const ProfileInformation = () => {
    return (
        <>
            <AccountSecurity/>
            <Divider/>
            <VerifyInformation/>
            <Divider/>
            <AccountInformation/>
        </>
    );
};