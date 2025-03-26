import { RouterContent } from '~/routes/RouterContent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '~/component/Layout/MainLayout';
import 'font-awesome/css/font-awesome.min.css';
import NotFound from '~/pages/NotFound';
import { Fragment, useEffect } from 'react';
import PrivateRoute from '~/config/PrivateRoute';
import ScrollToTop from '~/component/Animation/ScrollToTop';
import webConfig from '~/config/webConfig';
import InterceptRoute from '~/config/IntercepterRoute';
import config from '~/config';
import { useTranslation } from "react-i18next";

function App() {

        const { i18n } = useTranslation();

        useEffect(() => {
            document.title = webConfig.defaultTitle;
        }, []);

        const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        };

        return (
        <Router>
            <ScrollToTop />

            <Routes>
                {RouterContent.map((route, index) => {
                    const isAdminRoute = route.path.startsWith('/admin');
                    const loggedInRoute = route.path.startsWith(config.routes.tourDetail);
                    // const isPublicRoute = route.path === '/';
                    const Layout = isAdminRoute ? Fragment : MainLayout;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <InterceptRoute route={loggedInRoute}>
                                    <PrivateRoute adminOnly={isAdminRoute}>
                                        <Layout>
                                            {route.element}
                                        </Layout>
                                    </PrivateRoute>
                                </InterceptRoute>
                            }
                        />

                    );
                })}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
