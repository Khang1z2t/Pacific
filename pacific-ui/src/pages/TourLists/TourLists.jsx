import { SearchBar } from '~/pages/TourLists/components/SearchBar';
import { TourCards } from '~/pages/TourLists/components/TourCards';
import { useEffect, useMemo, useState } from 'react';
import { Divider, Pagination, Spin } from 'antd';
import { Aside } from '~/pages/TourLists/components/Aside';
import TourServices from '~/services/TourServices';
import { EmptyComponent } from '~/component/ui/EmptyComponent';
import { useAuth } from '~/config/AuthContext';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

export const TourLists = ({ titleType }) => {
    const token = localStorage.getItem('accessToken');
    const { getWishlist } = useAuth();
    const { t } = useTranslation();

    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [tours, setTours] = useState([]);
    const [query, setQuery] = useState({
        title: '',
        categoryId: null,
        startDate: null,
        endDate: null,
        rate: null, // Khởi tạo rate là null
        searchPrices: 'All', // Khởi tạo searchPrices là 'All'
    });
    const [loading, setLoading] = useState(true);

    const onChange = (e) => {
        setCurrentPage(e);
    };

    const handleSearch = (searchQuery) => {
        const filterSearch = { ...query }; // Giữ các giá trị hiện tại của query

        if (searchQuery.searchText) filterSearch.title = searchQuery.searchText;
        if (searchQuery.searchSides !== null) filterSearch.categoryId = searchQuery.searchSides;
        if (searchQuery.startDate !== null) filterSearch.startDate = searchQuery.startDate;
        if (searchQuery.endDate !== null) filterSearch.endDate = searchQuery.endDate;
        setQuery(filterSearch);
        setCurrentPage(1);
        setLoading(true);
    };

    useEffect(() => {
        if (token) {
            getWishlist(token);
        }
    }, [token]);

    const fetchTours = async () => {
        setLoading(true);
        try {
            const res = await TourServices.getAllTour({
                title: query.title,
                categoryId: query.categoryId,
                startDate: query.startDate,
                endDate: query.endDate,
                status: 'PUBLISHED',
                minPrice: null,
                maxPrice: null,
                currentPage: currentPage,
                pageSize: ITEM_PER_PAGE,
            });
            // const published = res.data.filter((tour) => tour.status === 'PUBLISHED');
            setTours(res.data.content);
            setTotalItems(res.data.totalItems);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error('Error fetching tours:', error);
            setTours([]);
            setTotalItems(0);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
        setCurrentPage(1);
    };

    const debouncedFetchTours = useMemo(() => debounce(fetchTours, 500), []);

    useEffect(() => {
        debouncedFetchTours(query, currentPage);
        return () => debouncedFetchTours.cancel();
    }, [query.title, query.categoryId, query.startDate, query.endDate, currentPage, debouncedFetchTours]);

    const filteredTours = useMemo(() => {
        if (!tours || tours.length === 0) {
            return [];
        }

        let result = [...tours];

        // Lọc theo rate
        if (query.rate !== null && query.rate !== undefined) {
            result = result.filter((tour) => {
                if (!tour.ratingAvg) return false;
                return tour.ratingAvg >= query.rate;
            });
        }

        // Sắp xếp theo ratingAvg
        if (result.length > 0) {
            result.sort((a, b) => {
                const ratingA = a.ratingAvg || 0;
                const ratingB = b.ratingAvg || 0;
                return ratingA - ratingB;
            });
        }

        // Sắp xếp theo giá
        if (query.searchPrices && query.searchPrices !== 'All') {
            if (query.searchPrices === 'HighToLow') {
                result.sort((a, b) => {
                    const priceA = a.maxPrice || 0;
                    const priceB = b.maxPrice || 0;
                    return priceB - priceA;
                });
            } else if (query.searchPrices === 'LowToHigh') {
                result.sort((a, b) => {
                    const priceA = a.maxPrice || 0;
                    const priceB = b.maxPrice || 0;
                    return priceA - priceB;
                });
            }
        }
        return result;
    }, [tours, query.rate, query.searchPrices]);

    // const totalPages = Math.ceil(filteredTours.length / ITEM_PER_PAGE);
    // useEffect(() => {
    //     if (currentPage > totalPages && totalPages > 0) {
    //         setCurrentPage(totalPages);
    //     }
    // }, [filteredTours, currentPage, totalPages]);

    // const page = filteredTours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return (
        <div className="w-full h-full">
            <img src={'/img/Pages/TourLists/bg.jpg'} alt={'bg'} className="w-full h-96 object-cover" />
            <SearchBar onSearch={handleSearch} />
            <div className="mt-24 mx-24 justify-center min-h-[800px]">
                <Divider orientation={'center'}>
                    <p className={'text-orange-400 text-2xl font-bold uppercase'}>{t('tourList.ti1')}</p>
                </Divider>
                <div className="flex">
                    <Aside query={query} setQuery={setQuery} titleType={titleType} />
                    {loading ? (
                        <div className="w-full h-[400px] col-span-4 flex items-center justify-center">
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
                        </div>
                    ) : filteredTours.length > 0 ? (
                        <div className="flex flex-wrap gap-4 w-full px-4">
                            {filteredTours.map((tour) => (
                                <TourCards key={tour.id} data={tour} />
                            ))}
                        </div>
                    ) : (
                        <EmptyComponent description={'tour'} />
                    )}
                </div>
            </div>
            <Pagination
                rootClassName={'my-10'}
                align={'center'}
                current={currentPage}
                defaultCurrent={1}
                total={totalItems}
                pageSize={ITEM_PER_PAGE}
                onChange={onChange}
            />
        </div>
    );
};