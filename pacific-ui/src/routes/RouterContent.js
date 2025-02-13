import config from "~/config";
import Home from "~/pages/Home";
import { TourLists } from '~/pages/TourLists/TourLists';
import { Login } from '~/pages/Account/Login';
import { Register } from '~/pages/Account/Register';
import { TourDetail } from '~/pages/TourLists/TourDetail/TourDetail';
import { TourLists_outside } from '~/pages/TourLists/TourLists_outside';
import { ProfileUI } from '~/pages/Account/ProfileUI/ProfileUI';
import { Booking } from '~/pages/Booking/Booking';
import { HistoryBooked } from '~/pages/Account/ProfileUI/sections/HistoryBooked';
import { HistoryPayment } from '~/pages/Account/ProfileUI/sections/HistoryPayment';
import { ForgetPassword } from '~/pages/Account/ForgetPassword';
import { ChangePassword } from '~/pages/Account/ChangePassword';

export const RouterContent = [
    {
        path: config.routes.home,
        element: <Home/>
    },
    {
        path: config.routes.tourTrongNuoc,
        element: <TourLists/>
    },
    {
      path: config.routes.login,
      element: <Login/>
    },
    {
      path: config.routes.register,
      element: <Register/>
    },
    {
        path: config.routes.tourDetail+':id',
        element: <TourDetail/>
    },
    {
        path: config.routes.tourNgoaiNuoc,
        element: <TourLists/>
    },
    {
        path: config.routes.profile,
        element: <ProfileUI/>
    },
    {
        path: config.routes.booking+':id',
        element: <Booking/>
    },
    {
        path: config.routes.historyBooked,
        element: <HistoryBooked/>
    },
    {
        path: config.routes.historyPayment,
        element: <HistoryPayment/>
    },
    {
        path:config.routes.forgotPassword,
        element: <ForgetPassword/>
    },
    {
        path:config.routes.changePassword,
        element: <ChangePassword/>
    }
]