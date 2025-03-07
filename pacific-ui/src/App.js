import { RouterContent } from '~/routes/RouterContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '~/component/Layout/MainLayout';
import 'font-awesome/css/font-awesome.min.css';
import NotFound from '~/pages/NotFound';
import { Fragment, useEffect } from 'react';
import PrivateRoute from '~/config/PrivateRoute';
import ScrollToTop from '~/component/Animation/ScrollToTop';
import webConfig from '~/config/webConfig';
import { SEOComponent } from '~/component/SEOComponent/SEOComponent';
import { Helmet } from 'react-helmet';

function App() {
    useEffect(() => {
        window.title = webConfig.defaultTitle;
    }, []);
    return (
        <Router>
            <Helmet>
                <title>Pacific Travel - Khám phá đến mọi nơi</title>
                <meta name="description"
                      content="Trang chủ của Pacific, nơi bạn có thể khám phá những điểm đến tuyệt vời." />
                <meta name="keywords" content="du lịch, tour giá rẻ, điểm đến đẹp, du lịch châu Á, Pacific travel" />
                <meta name="author" content="TunzDev" />
                <link rel="canonical" href="https://pacific-vn.vercel.app" />
                <meta property="og:title" content="Pacific Travel - Khám phá đến mọi nơi" />
                <meta property="og:description"
                      content="Trang chủ của Pacific, nơi bạn có thể khám phá những điểm đến tuyệt vời." />
                <meta property="og:url" content="https://pacific-vn.vercel.app" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Pacific Travel - Khám phá đến mọi nơi" />
                <meta name="twitter:description"
                      content="Trang chủ của Pacific, nơi bạn có thể khám phá những điểm đến tuyệt vời." />
                <meta property="og:image" content="https://pacific-vn.vercel.app" />
                <meta property="og:image:alt" content="Pacific - Hành trình khám phá" />
                <meta name="twitter:image" content="https://pacific-vn.vercel.app" />
                <meta name="twitter:image:alt" content="Pacific - Hành trình khám phá" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        'url': 'https://pacific-vn.vercel.app',
                        'name': 'Pacific Travel - Khám phá đến mọi nơi',
                        'description': 'Trang chủ của Pacific, nơi bạn có thể khám phá những điểm đến tuyệt vời.',
                    })}
                </script>
            </Helmet>
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
                                    <Layout>{route.element}</Layout>
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
