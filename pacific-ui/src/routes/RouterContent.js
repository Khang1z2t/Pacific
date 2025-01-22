import config from "~/config";
import Home from "~/pages/Home";
import { TourLists } from '~/pages/TourLists/TourLists';
import { Login } from '~/pages/Account/Login';

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
    }
]