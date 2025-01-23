import { Card, Divider, Pagination } from 'antd';
import { TourCards } from '~/pages/Home/components/TourCards';
import { useEffect, useRef, useState } from 'react';
import { TourCardItems } from '~/pages/TourLists/data/TourCardItems';

export const TourLists = () => {
    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const pageItem = TourCardItems.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    const containerRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState(0);

    // Tính toán chiều cao tối đa của danh sách các trang
    useEffect(() => {
        if (containerRef.current) {
            setMaxHeight(containerRef.current.scrollHeight);
        }
    }, []);

    const onChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6">
            <Divider
                className="font-bold uppercase"
                style={{ borderColor: '#7cb305' }}
                orientation="center"
            >
                <p className="text-xl sm:text-2xl md:text-3xl">Danh sách tour</p>
            </Divider>
            <div
                ref={containerRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
                style={{
                    minHeight: `${maxHeight}px`,
                    height: 'auto',
                }} // Đặt chiều cao tối thiểu dựa trên chiều cao lớn nhất
            >
                {pageItem.length === 0 ? (
                    <p className={'text-center text-xl'}>Không có tour nào</p>
                ) : (
                    pageItem.map((item, index) => (
                        <TourCards key={index} {...item} />
                    ))
                )}
            </div>
            <Pagination
                rootClassName={'flex justify-center mt-6'}
                align="center"
                defaultCurrent={1}
                total={TourCardItems.length}
                pageSize={ITEM_PER_PAGE}
                onChange={onChange}
            />
        </div>
    );
};