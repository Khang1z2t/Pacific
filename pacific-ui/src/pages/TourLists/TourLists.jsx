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

export const TourLists = ({ titleType }) => {
    const token = localStorage.getItem('accessToken');
    const { getWishlist } = useAuth();
    const { t } = useTranslation();

    const ITEM_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
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
        setLoading(true);
    };

    useEffect(() => {
        if (token) {
            getWishlist(token);
        }
    }, [token]);

    useEffect(() => {
        const fetchTours = async () => {
            setLoading(true);
            try {
                const res = await TourServices.getAllTour({
                    title: query.title,
                    categoryId: query.categoryId,
                    startDate: query.startDate,
                    endDate: query.endDate,
                });
                const published = res.data.filter((tour) => tour.status === 'PUBLISHED');
                console.log('Published tours:', published);
                setTours(published);
            } catch (error) {
                console.error('Error fetching tours:', error);
                setTours([]);
            } finally {
                setLoading(false);
            }
            setCurrentPage(1);
        };

        fetchTours();
    }, [query.title, query.categoryId, query.startDate, query.endDate]);

    const filteredTours = useMemo(() => {
        if (!tours || tours.length === 0) {
            console.log('Tours is empty, returning empty filteredTours');
            return [];
        }

        let result = [...tours];

        // Lọc theo rate
        if (query.rate !== null && query.rate !== undefined) {
            result = result.filter((tour) => {
                if (!tour.ratingAvg) return false;
                return tour.ratingAvg === query.rate;
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

        console.log('Filtered tours:', result);
        return result;
    }, [tours, query.rate, query.searchPrices]);

    const totalPages = Math.ceil(filteredTours.length / ITEM_PER_PAGE);
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredTours, currentPage, totalPages]);

    const page = filteredTours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    console.log('Page data:', page);

    return (
        <div className="w W-full h-full">
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
            <Pagination
                rootClassName={'my-10'}
                align={'center'}
                current={currentPage}
                defaultCurrent={1}
                total={filteredTours.length}
                pageSize={ITEM_PER_PAGE}
                onChange={onChange}
            />
        </div>
    );
};