import { SearchBar } from '~/pages/TourLists/components/SearchBar';
import { TourCards } from '~/pages/TourLists/components/TourCards';
import { useEffect, useState } from 'react';
import { Divider, Pagination, Spin } from 'antd';
import { Aside } from '~/pages/TourLists/components/Aside';
import TourServices from '~/services/TourServices';
import { EmptyComponent } from '~/component/ui/EmptyComponent';
import { useAuth } from '~/config/AuthContext';
import { LoadingOutlined } from '@ant-design/icons';

export const TourLists = ({ titleType }) => {
    const token = localStorage.getItem('accessToken');
    const { getWishlist } = useAuth()

    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [tours, setTours] = useState([]);
    const [query, setQuery] = useState({});
    const [filteredTours, setFilteredTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const onChange = (e) => {
        setCurrentPage(e);
    };

    const handleSearch = (query) => {
        const filterSearch = {};

        if (query.searchText) filterSearch.title = query.searchText;
        if (query.searchPrices !== null) filterSearch.categoryId = query.searchSides;
        if (query.startDate !== null) filterSearch.startDate = query.startDate;
        if (query.endDate !== null) filterSearch.endDate = query.endDate;
        // if (query.rate !== null) filterSearch.ratingAvg = query.rate;
        // if (query.searchPrices === "HighToLow") filterSearch.maxPrice = filterSearch.maxPrice.sort((a, b) => b.maxPrice - a.maxPrice);
        // if (query.searchPrices === "LowToHigh") filterSearch.minPrice = filterSearch.minPrice.sort((a, b) => a.minPrice - b.minPrice);
        setQuery(filterSearch);
    };

    useEffect(() => {
        getWishlist(token);
    }, [token]);

    useEffect(() => {
        let sortedTours = [...tours];

        if (query.rate) {
            sortedTours = sortedTours.filter((tour) => tour.ratingAvg >= query.rate);
        }
        sortedTours.sort((a, b) => a.ratingAvg - b.ratingAvg);

        // Sắp xếp theo giá
        if (query.searchPrices === 'HighToLow') {
            sortedTours.sort((a, b) => b.maxPrice - a.maxPrice);
        } else if (query.searchPrices === 'LowToHigh') {
            sortedTours.sort((a, b) => a.maxPrice - b.maxPrice);
        }

        setFilteredTours(sortedTours);
        setCurrentPage(1)
    }, [query.rate, query.searchPrices, tours]);

    useEffect(() => {
        setLoading(true);
        TourServices.getAllTour(query).then((res) => {
            const published = res.data.filter((tour) => tour.status === 'PUBLISHED');
            setTours(published);
            setFilteredTours(published);
        }).catch((error) => {
            console.error(error);
        }).finally(() => setLoading(false))
        setCurrentPage(1);
    }, [query]);
    const page = filteredTours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return (
        <div className="w-full h-full">
            <img src={'/img/Pages/TourLists/bg.jpg'} alt={'bg'} className="w-full h-96 object-cover" />
            <SearchBar onSearch={handleSearch} />
            <div className="mt-24 mx-24 justify-center min-h-[800px]">
                <Divider orientation={'center'}><p className={'text-orange-400 text-2xl font-bold uppercase'}>Danh sách
                    tour du
                    lịch {titleType} </p></Divider>
                <div className="flex">
                    <Aside query={query} setQuery={setQuery} titleType={titleType} />
                    {loading ? (
                        <div className="w-full h-[400px] col-span-4 flex items-center justify-center">
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
                        </div>
                    ) : page.length > 0 ? (
                        <div className="flex flex-wrap gap-4 w-full px-4">
                            {page.map((tour) => (
                                <TourCards key={tour.id} data={tour} />
                            ))}
                        </div>
                    ) : (
                        <EmptyComponent description={'tour'} />
                    )}
                </div>
            </div>
            <Pagination rootClassName={'my-10'} align={'center'}
                        current={currentPage}
                        defaultCurrent={1} total={filteredTours.length}
                        pageSize={ITEM_PER_PAGE} onChange={(e) => onChange(e)} />
        </div>
    );
};