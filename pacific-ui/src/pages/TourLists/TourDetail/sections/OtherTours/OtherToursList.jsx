import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TourCard } from '~/pages/TourLists/TourDetail/sections/OtherTours/Components/TourCard';
import { Pagination } from 'antd';
import config from '~/config';
import { Loading } from '~/component/ui/Loading';
import TourServices from '~/services/TourServices';

export const OtherToursList = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { id: currentTourId } = useParams();

    const page = tours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    const onChange = (e) => {
        setCurrentPage(e);
    };

    useEffect(() => {
        TourServices.getAllTour().then((res) => {
            const filteredTours = res.data.filter(tour => tour.id !== currentTourId);
            setTours(filteredTours);
        }).catch((err) => {
            console.error(err);
        });

        setCurrentPage(1);
    }, [currentTourId]);

    const handleTourClick = (id) => {
        setLoading(true);
        navigate(`/tour-chi-tiet/${id}`, {replace: true});
        setTimeout(() => {
            setLoading(false);
        },1000);
    };

    return (
        <div className={"container mx-8 w-11/12 px-8 justify-start bg-white py-8 border rounded-lg"}>
            {loading && <Loading />}
            <div className={"grid grid-cols-3 gap-4"}>
                {page.map((tour, index) => (
                    <TourCard key={index} {...tour} tag1={"Tour trong nước"} tag2={"Được đề xuất"} onClick={handleTourClick} />
                ))}
            </div>
            <Pagination rootClassName={'my-10'} align={'center'} defaultCurrent={1} total={tours.length}
                        pageSize={ITEM_PER_PAGE} onChange={(e) => onChange(e)} />
        </div>
    );
};