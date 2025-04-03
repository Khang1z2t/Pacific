import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TourCard } from '~/pages/TourLists/TourDetail/sections/OtherTours/Components/TourCard';
import { Pagination } from 'antd';
import config from '~/config';
import { Loading } from '~/component/ui/Loading';
import TourServices from '~/services/TourServices';

export const OtherToursList = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const [tours, setTours] = useState([]);
    const onChange = (e) => {
        setCurrentPage(e);
    };

    useEffect(() => {
        try {
            const params = {
                title: null,
                minPrice: null,
                maxPrice: null,
                categoryId: null,
                startDate: null,
                endDate: null,
            }
            const fetched = TourServices.getAllTour(params).then((res) => {
                const published = res.data.filter((tour) => tour.status === 'PUBLISHED' && tour.id !== id);
                setTours(published || []);
                setCurrentPage(1);
            }).catch((err) => {
                console.error(err);
                setTours([]);
            })

            fetched();
        } catch (error) {
            console.error('Error fetching tours:', error);
            setTours([]);
        }

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
                {page.map((tour, index) => (
                    <TourCard key={index} data={tour} onClick={handleTourClick} />
                ))}
            </div>
            <Pagination rootClassName={'my-10'} align={'center'} defaultCurrent={1} total={tours.length}
                        pageSize={ITEM_PER_PAGE} onChange={(e) => onChange(e)} />
        </div>
    );
};