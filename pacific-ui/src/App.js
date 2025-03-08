import { RouterContent } from '~/routes/RouterContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '~/component/Layout/MainLayout';
import 'font-awesome/css/font-awesome.min.css';
import NotFound from '~/pages/NotFound';
import { Fragment } from 'react';
import PrivateRoute from '~/config/PrivateRoute';
// import { getAllUsers } from "~/config/axiosConfig";

import { useEffect, useState } from "react";
import AdminUsers from '~/pages/Admin/AdminUsers';

function App() {
    return (
        <Router>
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


// function AdminUsersPage() {
//     const [users, setUsers] = useState([]);
//
//     useEffect(() => {
//         getAllUsers().then(data => {
//             if (data) setUsers(data.data);
//         });
//     }, []);
//
//     return <AdminUsers initialData={users} />;
// }
//
// function App() {
//     return (
//         <Router>
//             <Routes>
//                 {RouterContent.map((route, index) => {
//                     const isAdminRoute = route.path.startsWith('/admin');
//                     const Layout = isAdminRoute ? Fragment : MainLayout;
//                     return (
//                         <Route
//                             key={index}
//                             path={route.path}
//                             element={
//                                 <PrivateRoute adminOnly={isAdminRoute}>
//                                     <Layout>{route.element}</Layout>
//                                 </PrivateRoute>
//                             }
//                         />
//                     );
//                 })}
//
//                 {/* Trang quản lý Users */}
//                 <Route path="/admin-users" element={<AdminUsersPage />} />
//
//                 {/* Trang 404 */}
//                 <Route path="*" element={<NotFound />} />
//             </Routes>
//         </Router>
//     );
// }
//
// export default App;
