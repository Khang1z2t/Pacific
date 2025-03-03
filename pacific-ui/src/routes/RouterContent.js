import config from '~/config';
import Home from '~/pages/Home';
import Contacts from '~/pages/News/Contacts';
import About from '~/pages/Introduce/About';
import Booking1 from '~/pages/Admin/sections/Booking1';
import Tour from '~/pages/Admin/sections/Tour';
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
    },
    {
        path: config.routes.tourTrongNuoc,
        element: <TourLists titleType={"trong nước"} />,
    },
    {
        path: config.routes.login,
        element: <Login />,
    },
    {
        path: config.routes.register,
        element: <Register />,
    },
    {
        path: config.routes.tourDetail + ':id',
        element: <TourDetail />,
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
        path: config.routes.adminBooking,
        element: <Booking1 />,
    },
    {
        path: config.routes.adminBooking,
        element: <Tour />,
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
