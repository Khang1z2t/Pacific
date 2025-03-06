import { RouterContent } from '~/routes/RouterContent';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from '~/component/Layout/MainLayout';
import 'font-awesome/css/font-awesome.min.css';
import NotFound from '~/pages/NotFound';
import { Fragment, useEffect } from 'react';
import PrivateRoute from '~/config/PrivateRoute';
import ScrollToTop from '~/component/Animation/ScrollToTop';
import webConfig from '~/config/webConfig';
import { SEOComponent } from '~/component/SEOComponent/SEOComponent';

function App() {
    const location = useLocation();
    const breadcrumbs = () => {
        if (location.pathname === '/tours') {
            return [
                { name: 'Trang chủ', url: 'https://pacific-vn.vercel.app' },
                { name: 'Du lịch', url: 'https://pacific-vn.vercel.app/tours' },
            ];
        }
        return [{ name: 'Trang chủ', url: 'https://pacific-vn.vercel.app' }];
    };
    useEffect(() => {
        window.title = webConfig.defaultTitle;
    }, []);
    return (
        <>
            <SEOComponent
                title="Pacific - Hành trình khám phá mọi nơi"
                description="Website giúp bạn tìm kiếm những điểm đến tuyệt vời."
                href={`https://pacific-vn.vercel.app${location.pathname}`}
                keywords="du lịch, tour giá rẻ, điểm đến đẹp, Pacific travel"
                author="TunzDev"
                breadcrumbs={breadcrumbs()} // Truyền breadcrumbs động
                children={
                    <>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="description" content="Website giúp bạn tìm kiếm những điểm đến tuyệt vời." />
                        <meta name="keywords" content="du lịch, tour giá rẻ, điểm đến đẹp, Pacific travel" />
                        <meta name="author" content="TunzDev" />
                        <link rel="canonical" href={`https://pacific-vn.vercel.app${location.pathname}`} />
                        <meta property="og:title" content="Pacific - Hành trình khám phá mọi nơi" />
                        <meta property="og:description" content="Website giúp bạn tìm kiếm những điểm đến tuyệt vời." />
                        <meta property="og:url" content={`https://pacific-vn.vercel.app${location.pathname}`} />
                        <meta property="og:type" content="website" />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content="Pacific - Hành trình khám phá mọi nơi" />
                        <meta name="twitter:description"
                              content="Website giúp bạn tìm kiếm những điểm đến tuyệt vời." />
                        <script type="application/ld+json">
                            {JSON.stringify({
                                '@context': 'https://schema.org',
                                '@type': 'WebSite',
                                url: `https://pacific-vn.vercel.app${location.pathname}`,
                                name: 'Pacific - Hành trình khám phá mọi nơi',
                            })}
                            <meta name="theme-color" content="#000000" />
                        </script>
                    </>
                }
            />
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
        </>
    );
}

export default App;
