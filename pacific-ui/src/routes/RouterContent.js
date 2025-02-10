import config from "~/config";
import Home from "~/pages/Home";
import { TourLists } from '~/pages/TourLists/TourLists';
import { Login } from '~/pages/Account/Login';
import { Register } from '~/pages/Account/Register';
import { TourDetail } from '~/pages/TourLists/TourDetail/TourDetail';
import { TourLists_outside } from '~/pages/TourLists/TourLists_outside';

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
        element: <TourLists_outside/>
    }

]