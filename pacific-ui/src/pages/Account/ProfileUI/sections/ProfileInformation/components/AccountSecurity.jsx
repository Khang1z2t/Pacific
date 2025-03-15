import { Input } from 'antd';

export const AccountSecurity = () => {
    return (
        <div className={"container mx-auto"}>
            <div className={"section1 p-4 "}>
                <h2 className={"text-2xl font-semibold"}>Bảo mật thông tin</h2>
                <p className={"text-gray-500"}>Thông tin cá nhân của bạn</p>
                <div className={"grid grid-cols-2 gap-4 mt-4"}>
                    <div>
                        <label className={"font-semibold text-md"}>Tài khoản Email</label>
                        <Input placeholder="Email" className={"w-full"} />
                    </div>
                    <div>
                        <label className={"font-semibold text-md"}>Số điện thoại</label>
                        <Input placeholder="Số điện thoại" className={"w-full"} />
                    </div>
                    <div className={"flex flex-col w-1/2"}>
                        <label className={"font-semibold text-md"}>Mật khẩu</label>
                        <button

                            className={"bg-orange-500 transition-all hover:bg-orange-700 hover:shadow-lg text-white px-4 py-2 rounded-md"}>Đổi mật khẩu</button>
                    </div>
                </div>
                <div className={"mt-2 flex justify-end"}>
                    <button
                        className={"bg-green-500 transition-all hover:bg-green-700 hover:shadow-lg text-white px-4 py-2 rounded-md"}>Lưu thay đổi</button>
                </div>
            </div>
        </div>
    );
};