import {Navbar} from "~/component/Layout/Navbar";
import { FloatButton } from 'antd';
import Footer from '~/component/Layout/Footer';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainLayout = ({children}) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Thêm thuộc tính này để cuộn mượt
        });
    };
    return (
        <div className={"flex flex-col min-h-screen"}>
        {/*navbar*/}
            <FloatButton.BackTop />
            <FloatButton.Group
                trigger="hover"
                type="primary"
                style={{

                    insetInlineEnd: 94,
                }}
                icon={<FontAwesomeIcon icon={faHeadset} />}
            >
                <FloatButton />
                <FloatButton icon={<CommentOutlined />} />
            </FloatButton.Group>
            <Navbar/>
        {/*    Main Content    */}
            <main className={"flex-grow"}>{children}</main>
        {/*    Footer*/}
            <Footer/>
        </div>
    )
}
export default MainLayout;