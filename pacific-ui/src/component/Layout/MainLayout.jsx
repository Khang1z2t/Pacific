import { Navbar } from '~/component/Layout/Navbar';
import { FloatButton } from 'antd';
import Footer from '~/component/Layout/Footer';
import { CommentOutlined } from '@ant-design/icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

const MainLayout = ({children}) => {
    useEffect(() => {
        document.title = "Pacific Travel";
    }, []);

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