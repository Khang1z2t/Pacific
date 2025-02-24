import { SearchBar } from '~/pages/TourLists/components/SearchBar';
import { TourCards } from '~/pages/TourLists/components/TourCards';
import { useEffect, useState } from 'react';
import { Divider, Empty, Pagination, Popover, Rate, Select, Tag } from 'antd';
import { Aside } from '~/pages/TourLists/components/Aside';
import config from '~/config';
import TourServices from '~/services/TourServices';

export const TourLists = () => {
    const ITEM_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [sort, setSort] = useState('All');


    const page = filteredTours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    const onChange = (e) => {
        setCurrentPage(e);
    };

    useEffect(() => {
        TourServices.getAllTour().then((res) => {
            setTours(res.data);
            setFilteredTours(res.data); // Initialize filteredTours with all tours
        }).catch((err) => {
            console.error(err);
        });
        setCurrentPage(1);
    }, []);
    useEffect(() => {
        let sortedTours = [...tours];
        if(sort === "HighToLow") {
            sortedTours.sort((a,b) => b.priceAdults - a.priceAdults);
        }else if (sort === "LowToHigh") {
            sortedTours.sort((a,b) => a.priceAdults - b.priceAdults);
        }
        setFilteredTours(sortedTours);
    }, [sort,tours]);


    const handleSearch = (query) => {
        const SearchFiltered = tours.filter((tour) => {
            const searchText = query.searchText
                ? tour.title.toLowerCase().includes(query.searchText.toLowerCase()) : true;
            const side = query.side !== 'All' ? tour.side === query.side : true;
            return searchText && side;
        });
        setFilteredTours(SearchFiltered);
    };

    return (
        <div className="w-full h-full">
            <img src={'/img/Pages/TourLists/bg.jpg'} alt={'bg'} className="w-full h-96 object-cover" />
            <SearchBar onSearch={handleSearch} />
            <div className="mt-24 mx-24 justify-center min-h-[800px]">
                <Divider orientation={'center'}><p className={'text-orange-400 text-2xl font-bold'}>Danh sách tour du
                    lịch</p></Divider>
                <div className="flex">
                    <Aside setSort={setSort} />
                    {page.length > 0 ?
                        <div className="flex flex-wrap gap-4 w-full px-4">
                            {page.map((tour) => (
                                <TourCards key={tour.id} {...tour} />
                            ))}
                        </div>
                        :
                        <div className={'w-full flex justify-center items-center'}>
                            <Empty description={'Không tìm thấy tour du lịch'} image={'/img/empty.jpg'} />
                        </div>
                    }
                </div>
            </div>
            <Pagination rootClassName={'my-10'} align={'center'} defaultCurrent={1} total={filteredTours.length}
                        pageSize={ITEM_PER_PAGE} onChange={(e) => onChange(e)} />
        </div>
    );
};