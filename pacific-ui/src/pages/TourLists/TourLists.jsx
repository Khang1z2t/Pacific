import { SearchBar } from '~/pages/TourLists/components/SearchBar';
import { TourCards } from '~/pages/TourLists/components/TourCards';
import { useEffect, useState } from 'react';
import { Divider, Empty, Pagination, Popover, Rate, Select, Tag } from 'antd';
import { Aside } from '~/pages/TourLists/components/Aside';
import TourServices from '~/services/TourServices';

export const TourLists = ({titleType}) => {
    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [tours, setTours] = useState([]);
    const [query, setQuery] = useState({});
    const [filteredTours, setFilteredTours] = useState([]);
    const [sort, setSort] = useState('All');

    const onChange = (e) => {
        setCurrentPage(e);
    };

    const handleSearch = (query) => {
        const filterSearch = {};

        if(query.searchText) filterSearch.title = query.searchText;
        if(query.sidesValue !== 'All') filterSearch.categoryId = query.searchSides;

        setQuery(filterSearch);

        console.log(query);
    };



    useEffect(() => {
        let sortedTours = [...tours];
        if(sort === "HighToLow") {
            sortedTours.sort((a,b) => b.maxPrice - a.maxPrice);
        }else if (sort === "LowToHigh") {
            sortedTours.sort((a,b) => a.maxPrice - b.maxPrice);
        }
        setFilteredTours(sortedTours);
    }, [sort,tours]);

    useEffect(() => {
        TourServices.getAllTour(query).then((res) => {
            setTours(res.data);
            setFilteredTours(res.data);
        }).catch((error) => {
            console.error(error);
        })
        setCurrentPage(1);
    },[query])
    const page = filteredTours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return (
        <div className="w-full h-full">
            <img src={'/img/Pages/TourLists/bg.jpg'} alt={'bg'} className="w-full h-96 object-cover" />
            <SearchBar onSearch={handleSearch} />
            <div className="mt-24 mx-24 justify-center min-h-[800px]">
                <Divider orientation={'center'}><p className={'text-orange-400 text-2xl font-bold uppercase'}>Danh sách tour du
                    lịch {titleType} </p></Divider>
                <div className="flex">
                    <Aside setSort={setSort} titleType={titleType} />
                    {page.length > 0 ?
                        <div className="flex flex-wrap gap-4 w-full px-4">
                            {page.map((tour) => (
                                <TourCards key={tour.id} data={tour} />
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