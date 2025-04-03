import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TourCard } from '~/pages/TourLists/TourDetail/sections/OtherTours/Components/TourCard';
import { Pagination, Skeleton } from 'antd'; // Thêm Skeleton
import config from '~/config';
import { Loading } from '~/component/ui/Loading';
import TourServices from '~/services/TourServices';

export const OtherToursList = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false); // Loading cho navigation
    const [pageLoading, setPageLoading] = useState(false); // Loading cho phân trang
    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const [tours, setTours] = useState([]);

    const onChange = (e) => {
        setPageLoading(true); // Bật Skeleton khi đổi trang
        setCurrentPage(e);
        // Giả lập thời gian chờ để thấy Skeleton (có thể bỏ nếu không cần)
        setTimeout(() => {
            setPageLoading(false); // Tắt Skeleton sau khi trang mới sẵn sàng
        }, 500); // Thời gian chờ 500ms, điều chỉnh tùy ý
    };

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const params = {
                    title: null,
                    minPrice: null,
                    maxPrice: null,
                    categoryId: null,
                    startDate: null,
                    endDate: null,
                };
                const res = await TourServices.getAllTour(params);
                const published = res.data.filter((tour) => tour.status === 'PUBLISHED' && tour.id !== id);
                setTours(published || []);
                setCurrentPage(1);
            } catch (error) {
                console.error('Error fetching tours:', error);
                setTours([]);
            }
        };

        fetchTours();
    }, [id]);

    const handleTourClick = (id) => {
        setLoading(true);
        navigate(config.routes.tourDetail + id, { replace: true });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const page = tours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return (
        <div className={'container mx-8 w-11/12 px-8 justify-start bg-white py-8 border rounded-lg'}>
            {loading && <Loading />}
            <div className={'grid grid-cols-3 gap-4'}>
                {pageLoading ? (
                    // Hiển thị Skeleton khi đang chuyển trang
                    Array.from({ length: ITEM_PER_PAGE }).map((_, index) => (
                        <Skeleton active avatar={{ shape: 'square', size: 120 }} paragraph={{ rows: 2 }} />
                    ))
                ) : (
                    // Hiển thị danh sách tour khi không loading
                    page.map((tour, index) => (
                        <TourCard key={index} data={tour} onClick={handleTourClick} />
                    ))
                )}
            </div>
            <Pagination
                rootClassName={'my-10'}
                align={'center'}
                defaultCurrent={1}
                total={tours.length}
                pageSize={ITEM_PER_PAGE}
                onChange={(e) => onChange(e)}
            />
        </div>
    );
};