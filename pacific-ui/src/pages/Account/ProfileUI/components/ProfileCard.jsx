import { MdEmail } from 'react-icons/md';
import { Avatar, Card, Divider } from 'antd';
import { PhoneCall } from 'lucide-react';
import config from '~/config';

export const ProfileCard = ({data}) => {
    return (
        <Card className="shadow-md sticky top-20">
            <div className="flex flex-col items-center">
                <Avatar size={80} src={config.imageConfig.getAvatar(data.avatarUrl)}/>
                <h2 className="mt-2 text-lg font-semibold">{data.username}</h2>
                <p className="text-gray-500">{data.firstName} {data.lastName}</p>
            </div>
            <Divider/>
            <div className={"mt-4"}>
                <h3 className="font-bold text-orange-400">Giới thiệu</h3>
                <div className={"flex flex-wrap items-center gap-2"}>
                    <label className={"font-semibold"}>Ngày sinh: </label>
                    <p className={"text-gray-500"}>{config.webConfig.convertDate(data.birthDay)}</p>
                </div>
                <div className={"flex flex-wrap items-center gap-2"}>
                    <label className={"font-semibold"}>Giới tính: </label>
                    <p className={"text-gray-500"}>{data.gender ? "Nam" : "Nữ"}</p>
                </div>
                <div className={"flex flex-wrap items-center gap-2"}>
                    <label className={"font-semibold"}>Địa chỉ: </label>
                    <p className={"text-gray-500"}>{data.address}</p>
                </div>
            </div>
            <div className="mt-4 space-y-1">
                <h3 className="font-bold text-orange-400">Liên hệ</h3>
                <p className="font-semibold text-gray-500 text-sm flex items-center gap-2"><PhoneCall
                    size={20}/> {data.phone}</p>
                <p className="font-semibold text-gray-500 text-sm flex items-center gap-2"><MdEmail
                    size={20}/>{data.email}</p>
            </div>
        </Card>
    );
};