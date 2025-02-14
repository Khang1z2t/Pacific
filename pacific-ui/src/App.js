import { RouterContent } from '~/routes/RouterContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '~/component/Layout/MainLayout';
import 'font-awesome/css/font-awesome.min.css';
import NotFound from '~/pages/NotFound';

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    {RouterContent.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
