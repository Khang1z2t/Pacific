import { Button, Result } from 'antd';

export const Error = () => {
    return (
        <Result
            title="Có vấn đề xảy ra! Liên hệ admin để hỗ trợ!"
            subTitle={"MÃ HỖ TRỢ:XXX1111XXX"}
            extra={
                <Button type="primary" key="console">
                    Go Console
                </Button>
            }
        />
    );
};