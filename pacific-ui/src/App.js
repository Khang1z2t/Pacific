import { RouterContent } from '~/routes/RouterContent';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import MainLayout from '~/component/Layout/MainLayout';
import 'font-awesome/css/font-awesome.min.css';
import NotFound from '~/pages/NotFound';
import {Fragment} from "react";

function App() {

    return (
        <Router>
            <Routes>
                {RouterContent.map((route, index) => {
                    const isAdminRoute = route.path.startsWith('/admin');
                    const Layout = isAdminRoute ? Fragment : MainLayout;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    {route.element}
                                </Layout>
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
