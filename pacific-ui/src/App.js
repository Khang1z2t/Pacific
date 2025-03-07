import { RouterContent } from '~/routes/RouterContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '~/component/Layout/MainLayout';
import 'font-awesome/css/font-awesome.min.css';
import NotFound from '~/pages/NotFound';
import { Fragment, useEffect } from 'react';
import PrivateRoute from '~/config/PrivateRoute';
import ScrollToTop from '~/component/Animation/ScrollToTop';
import webConfig from '~/config/webConfig';

function App() {
    useEffect(() => {
        window.title = webConfig.defaultTitle;
    }, []);
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {RouterContent.map((route, index) => {
                    const isAdminRoute = route.path.startsWith('/admin');
                    // const isPublicRoute = route.path === '/';
                    const Layout = isAdminRoute ? Fragment : MainLayout;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivateRoute adminOnly={isAdminRoute}>
                                    <Layout>
                                        {route.element}
                                    </Layout>
                                </PrivateRoute>
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
