import { Card, Divider, Pagination } from 'antd';
import { TourCards } from '~/pages/Home/components/TourCards';
import { useEffect, useState } from 'react';
import TourServices from '~/services/TourServices';

export const TourLists = () => {
    const ITEM_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [tours, setTours] = useState([]);

    // Tính toán chiều cao tối đa của danh sách các trang

    const onChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        TourServices.getAllTour().then((res) => {
            setTours(res.data);
        }).catch((err) => {
            console.error(err);
        })
    }, []);
    const pageItem = tours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return (
        <div className="container mx-auto justify-center w-full">
            <Divider
                className="font-bold uppercase"
                style={{ borderColor: '#7cb305' }}
                orientation="center"
            >
                <h2 className="lg:text-3xl text-md">Danh sách tour</h2>
                <p className="lg:text-xl text-sm">Những tour đang hot gần đây</p>
            </Divider>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center px-14 w-fit mx-auto min-h-[500px]">
                {pageItem.length === 0 ? (
                    <p className={'text-center text-xl'}>Không có tour nào</p>
                ) : (
                    pageItem.map((item, index) => (
                        <TourCards key={index} data={item} />
                    ))
                )}
            </div>
            <Pagination
                rootClassName={'flex justify-center mt-6'}
                align="center"
                defaultCurrent={1}
                total={tours.length}
                pageSize={ITEM_PER_PAGE}
                onChange={onChange}
            />
        </div>
    );
};