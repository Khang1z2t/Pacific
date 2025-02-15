import { Result } from 'antd';

export const Success = () => {
    return (
        <Result status={'success'}
                title={'Thanh toán thành công!'}
                subTitle={'Mã thanh toán:2017182818828182881 - Đang chuyển về trang chủ trong 3-5s. Xin cám ơn!'}
        />
    );
};