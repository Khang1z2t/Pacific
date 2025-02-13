import { tours } from '~/pages/TourLists/data/tours';
import { useEffect, useState } from 'react';
import { TourCard } from '~/pages/TourLists/TourDetail/sections/OtherTours/Components/TourCard';
import { Pagination } from 'antd';
export const OtherToursList = () => {
    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const page = tours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    const onChange = (e) => {
        setCurrentPage(e);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, []);
    return (
        <div className={"container mx-8 w-11/12 px-8 justify-start bg-white py-8 border rounded-lg"}>
            <div className={"grid grid-cols-3 gap-4"}>
                {page.map((tour, index) => (
                    <TourCard key={index} {...tour} tag1={"Tour trong nước"} tag2={"Được đề xuất"} />
                ))}
            </div>
            <Pagination rootClassName={'my-10'} align={'center'} defaultCurrent={1} total={tours.length}
                        pageSize={ITEM_PER_PAGE} onChange={(e) => onChange(e)} />
        </div>
    );
};