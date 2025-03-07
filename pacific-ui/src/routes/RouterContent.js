import config from '~/config';
import Home from '~/pages/Home';
import Contacts from '~/pages/News/Contacts';
import About from '~/pages/Introduce/About';
import { TourLists } from '~/pages/TourLists/TourLists';
import { Login } from '~/pages/Account/Login';
import { Register } from '~/pages/Account/Register';
import { TourDetail } from '~/pages/TourLists/TourDetail/TourDetail';
import { ProfileUI } from '~/pages/Account/ProfileUI/ProfileUI';
import { Booking } from '~/pages/Booking/Booking';
import HistoryPayment from '~/pages/Account/HistoryPayment/HistoryPayment';
import { Success } from '~/pages/Booking/status/Success';
import { ForgetPassword } from '~/pages/Account/ForgetPassword';
import { ChangePassword } from '~/pages/Account/ChangePassword';
import { MienBac } from '~/pages/Blog/MienBac';
import { MienTrung } from '~/pages/Blog/MienTrung';
import { MienNam } from '~/pages/Blog/MienNam';
import { BookedTour } from '~/pages/Account/historyBooked/BookedTour';
import { AdminLayout } from '~/component/Layout/Admin/AdminLayout';
import AdminHome from '~/pages/Admin/AdminHome';
import { News } from '~/pages/News/News';
import AdminUsers from '~/pages/Admin/AdminUsers';
import InfoGuide from '~/pages/Admin/InfoGuide';
import AddGuide from '~/pages/Admin/AddGuide';
import { Error } from '~/pages/Booking/status/Error';

export const RouterContent = [
    {
        path: config.routes.home,
        element: <Home />,
        title: "Pacific - Hành trình khám phá mọi nơi",
        description: "Trang chủ của Pacific, nơi bạn có thể khám phá những điểm đến tuyệt vời.",
        keywords: "du lịch, tour giá rẻ, điểm đến đẹp, du lịch châu Á, Pacific travel",
    },
    {
        path: config.routes.tourTrongNuoc,
        element: <TourLists titleType={"trong nước"} />,
        title: "Pacific - Danh sách các tour du lịch trong nước",
        description: "Danh sách các tour du lịch trong nước của Pacific Travel",
        keywords: "tour du lịch, tour trong nước, tour du lịch giá rẻ, tour du lịch chất lượng",
    },
    {
        path: config.routes.login,
        element: <Login />,
        title: "Pacific - Đăng Nhập",
        description: "Đây là trang đăng nhập của Pacific Travel",
        keywords: "đăng nhập, đăng nhập tài khoản, đăng nhập Pacific Travel",
    },
    {
        path: config.routes.register,
        element: <Register />,
        title: "Pacific - Đăng Ký",
        description: "Đây là trang đăng ký tài khoản của Pacific Travel",
        keywords: "đăng ký, đăng ký tài khoản, đăng ký Pacific Travel",
    },
    {
        path: config.routes.tourDetail + ':id',
        element: <TourDetail />,
        title: "Pacific - Chi tiết tour",
        description: "Chi tiết tour du lịch của Pacific Travel",
        keywords: "chi tiết tour, tour du lịch, tour du lịch giá rẻ, tour du lịch chất lượng",
    },
    {
        path: config.routes.tourNgoaiNuoc,
        element: <TourLists titleType={"ngoài nước"} />,
    },
    {
        path: config.routes.contacts,
        element: <Contacts />,
    },
    {
        path: config.routes.about,
        element: <About />,
    },
    {
        path: config.routes.profile,
        element: <ProfileUI />,
    },
    {
        path: config.routes.booking + ':id',
        element: <Booking />,
    },
    {
        path: config.routes.historyBooked,
        element: <BookedTour />,
    },
    {
        path: config.routes.historyPayment,
        element: <HistoryPayment />,
    },
    {
        path: config.routes.forgotPassword,
        element: <ForgetPassword />,
    },
    {
        path: config.routes.changePassword,
        element: <ChangePassword />,
    },
    {
        path: config.routes.blogMienBac,
        element: <MienBac />,
    },
    {
        path: config.routes.blogMienTrung,
        element: <MienTrung />,
    },
    {
        path: config.routes.blogMienNam,
        element: <MienNam />,
    },
    {
        path: config.routes.checkOutSuccess,
        element: <Success />,
    },
    {
      path: config.routes.checkoutFail,
        element: <Error />,
    },
    {
        path: config.routes.adminHome,
        element: (
            <AdminLayout>
                <AdminHome />
            </AdminLayout>
        ),
    },
    {
        path: config.routes.news,
        element: <News />,
    },
    {
        path: config.routes.adminUsers,
        element: (
            <AdminLayout>
                <AdminUsers />
            </AdminLayout>
        ),
    },
    {
        path: config.routes.infoGuide,
        element: (
            <AdminLayout>
                <InfoGuide />
            </AdminLayout>
        ),
    },
    {
        path: config.routes.addGuide,
        element: (
            <AdminLayout>
                <AddGuide />
            </AdminLayout>
        ),
    },
];
