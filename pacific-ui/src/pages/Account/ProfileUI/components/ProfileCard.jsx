import { MdEmail } from 'react-icons/md';
import { Avatar, Card, Divider } from 'antd';
import { PhoneCall } from 'lucide-react';

export const ProfileCard = ({profile}) => {
    return (
        <Card className="shadow-md sticky top-20">
            <div className="flex flex-col items-center">
                <Avatar size={80} src="/img/logo.jpg"/>
                <h2 className="mt-2 text-lg font-semibold">{profile.name}</h2>
                <p className="text-gray-500">{profile.job}</p>
            </div>
            <Divider/>
            <div className={"mt-4"}>
                <h3 className="font-semibold">Giới thiệu</h3>
                <p className="text-gray-500">{profile.about}</p>
            </div>
            <div className={"mt-4"}>
                <h3 className="font-semibold">Vị trí</h3>
                <p className="text-gray-500">{profile.location}</p>
            </div>
            <div className="mt-4 space-y-1">
                <h3 className="font-semibold">Liên hệ</h3>
                <p className="font-semibold text-gray-500 text-sm flex items-center gap-4"><PhoneCall
                    size={20}/> {profile.phone}</p>
                <p className="font-semibold text-gray-500 text-sm flex items-center gap-4"><MdEmail
                    size={20}/>{profile.email}</p>
            </div>
            <div className={"mt-4"}>
                <h3 className={"font-semibold"}>Kinh nghiệm</h3>
                <p className="text-gray-500 flex items-center">NguoiDungDepTrai<span
                    className={"text-green-700"}>(4 năm)</span></p>
            </div>
        </Card>
    );
};