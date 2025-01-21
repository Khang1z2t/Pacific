import { Card, Divider, Pagination } from 'antd';
import { TourCards } from '~/pages/Home/components/TourCards';
import { useEffect, useRef, useState } from 'react';

export const TourLists = () => {
    const TourCardItems = [
        {
            img: '/img/TourLists/destination-1.jpg',
            title: 'Hawaii',
            location: 'Hawaii',
            date: '10/10/2021',
            price: '10.000.000',
            description: 'Hawaii là một quần đảo nằm ở Thái Bình Dương, gồm 137 đảo và đá ngầm, trong đó có 8 đảo lớn. Hawaii là tiểu bang thứ 50 và là tiểu bang đảo duy nhất của Hoa Kỳ.',
        },
        {
            img: '/img/TourLists/destination-2.jpg',
            title: 'Paris',
            location: 'Paris',
            date: '10/10/2021',
            price: '15.000.000',
            description: 'Paris là thủ đô và là thành phố lớn nhất của Pháp, cũng là thủ đô của vùng Île-de-France. Paris là một trong những trung tâm văn hóa và kinh tế quan trọng nhất thế giới.',
        },
        {
            img: '/img/TourLists/destination-3.jpg',
            title: 'Japan',
            location: 'Japan',
            date: '10/10/2021',
            price: '20.000.000',
            description: 'Nhật Bản, tên chính thức là Nhật Bản, là một quốc gia nằm ở châu Á Đông. Nhật Bản bao gồm một quần đảo lớn và nhiều đảo nhỏ, nằm ở phía đông bờ biển Đông Á của lục địa Á-Âu.',
        },
        {
            img: '/img/TourLists/destination-4.jpg',
            title: 'Korea',
            location: 'Korea',
            date: '10/10/2021',
            price: '25.000.000',
            description: 'Hàn Quốc, tên chính thức là Cộng hòa Hàn Quốc, là một quốc gia nằm ở Đông Á, trên bán đảo Triều Tiên. Hàn Quốc giáp với Trung Quốc ở phía tây bắc, với Nhật Bản qua biển Nhật Bản ở phía đông và với Triều Tiên ở phía bắc.',
        },
        {
            img: '/img/TourLists/destination-4.jpg',
            title: 'Korea',
            location: 'Korea',
            date: '10/10/2021',
            price: '25.000.000',
            description: 'Hàn Quốc, tên chính thức là Cộng hòa Hàn Quốc, là một quốc gia nằm ở Đông Á, trên bán đảo Triều Tiên. Hàn Quốc giáp với Trung Quốc ở phía tây bắc, với Nhật Bản qua biển Nhật Bản ở phía đông và với Triều Tiên ở phía bắc.',
        },
        {
            img: '/img/TourLists/destination-4.jpg',
            title: 'Korea',
            location: 'Korea',
            date: '10/10/2021',
            price: '25.000.000',
            description: 'Hàn Quốc, tên chính thức là Cộng hòa Hàn Quốc, là một quốc gia nằm ở Đông Á, trên bán đảo Triều Tiên. Hàn Quốc giáp với Trung Quốc ở phía tây bắc, với Nhật Bản qua biển Nhật Bản ở phía đông và với Triều Tiên ở phía bắc.',
        },
        {
            img: '/img/TourLists/destination-4.jpg',
            title: 'Korea',
            location: 'Korea',
            date: '10/10/2021',
            price: '25.000.000',
            description: 'Hàn Quốc, tên chính thức là Cộng hòa Hàn Quốc, là một quốc gia nằm ở Đông Á, trên bán đảo Triều Tiên. Hàn Quốc giáp với Trung Quốc ở phía tây bắc, với Nhật Bản qua biển Nhật Bản ở phía đông và với Triều Tiên ở phía bắc.',
        },
        {
            img: '/img/TourLists/destination-4.jpg',
            title: 'Korea',
            location: 'Korea',
            date: '10/10/2021',
            price: '25.000.000',
            description: 'Hàn Quốc, tên chính thức là Cộng hòa Hàn Quốc, là một quốc gia nằm ở Đông Á, trên bán đảo Triều Tiên. Hàn Quốc giáp với Trung Quốc ở phía tây bắc, với Nhật Bản qua biển Nhật Bản ở phía đông và với Triều Tiên ở phía bắc.',
        },
    ];
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
        <div className="container mx-auto">
            <Divider className="font-bold uppercase" style={{ borderColor: '#7cb305' }} orientation="center">
                <p className="text-3xl">Danh sách tour</p>
            </Divider>
            <div
                ref={containerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
                style={{
                    minHeight: `${maxHeight}px`,
                    height: 'auto',
                }} // Đặt chiều cao tối thiểu dựa trên chiều cao lớn nhất
            >
                {pageItem.map((item, index) => (
                    <TourCards key={index} {...item} />
                ))}
            </div>
            <Pagination
                rootClassName={"flex justify-center mt-6"}
                align="center"
                defaultCurrent={1}
                total={TourCardItems.length}
                pageSize={ITEM_PER_PAGE}
                onChange={onChange}
            />
        </div>
    );
};