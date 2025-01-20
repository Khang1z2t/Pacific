import config from "~/config";
import Home from "~/pages/Home";

export const RouterContent = [
    {
        path: config.routes.home,
        element: <Home/>
    }
]