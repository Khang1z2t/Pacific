import { Card, DatePicker, Input } from 'antd';

export const ProfileUI = () => {
    return (
        <div className={'container mx-auto px-4 py-8 flex flex-col gap-4'}>
            <Card className={'p-4 border rounded-lg shadow-md'}>
                <h1 className={'text-2xl font-semibold'}>Thông tin cá nhân</h1>
                <div className={'grid grid-cols-2 gap-4'}>
                    <div>
                        <label className={'text-sm font-medium'}>Họ và tên</label>
                        <Input placeholder={'VD: Nguyễn Văn A'} />
                    </div>
                    <div>
                        <label className={'text-sm font-medium'}>Ngày sinh</label>
                        <DatePicker className={'w-full'} format={'MM/DD/YYYY'} />
                    </div>
                </div>
                <div className={'grid grid-cols-2 gap-4'}>
                    <div>
                        <label className={'text-sm font-medium'}>Email</label>
                        <Input placeholder={'VD: abc@gmail.com'} />
                    </div>
                    <div>
                        <label className={'text-sm font-medium'}>Số điện thoại</label>
                        <Input placeholder={'VD: 0123456789'} />
                    </div>
                </div>
                <div className={'grid grid-cols-2 gap-4'}>
                    <div>
                        <label className={'text-sm font-medium'}>Địa chỉ</label>
                        <Input placeholder={'VD: 123 Đường ABC, Quận XYZ'} />
                    </div>
                    <div>
                        <label className={'text-sm font-medium'}>Giới tính</label>
                        <Input placeholder={'VD: Nam/Nữ'} />
                    </div>
                </div>
            </Card>
        </div>
    );
};