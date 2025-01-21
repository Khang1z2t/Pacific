import {Navbar} from "~/component/Layout/Navbar";
import ScrollOnTop from '~/component/ui/ScrollOnTop';
import Footer from '~/component/Layout/Footer';

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
            <ScrollOnTop/>
            <Navbar/>
        {/*    Main Content    */}
            <main className={"flex-grow"}>{children}</main>
        {/*    Footer*/}
            <Footer/>
        </div>
    )
}
export default MainLayout;