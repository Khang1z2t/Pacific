import config from "~/config";
import Home from "~/pages/Home";
import { TourLists } from '~/pages/TourLists/TourLists';
import { Login } from '~/pages/Account/Login';
import { Register } from '~/pages/Account/Register';

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
    }
]