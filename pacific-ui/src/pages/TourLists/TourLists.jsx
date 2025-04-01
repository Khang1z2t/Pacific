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
    const [query, setQuery] = useState({});
    const [loading, setLoading] = useState(false);

    const onChange = (page) => {
        setLoading(true);
        setCurrentPage(page);
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
                // Nếu query rỗng, gửi request lấy tất cả tour mà không cần lọc
                const params = Object.keys(query).length === 0 ? { status: 'PUBLISHED' } : {
                    title: query.title || null,
                    categoryId: query.categoryId || null,
                    startDate: query.startDate || null,
                    endDate: query.endDate || null,
                    minPrice: query.minPrice || null,
                    maxPrice: query.maxPrice || null,
                    // currentPage: currentPage - 1,
                    // pageSize: ITEM_PER_PAGE,
                };

                const res = await TourServices.getAllTour(params);
                const published = res.data.filter((tour) => tour.status === 'PUBLISHED');
                setTours(published || []);
            } catch (error) {
                console.error('Error fetching tours:', error);
                setTours([]);
            } finally {
                setLoading(false); // Đảm bảo loading luôn được tắt
            }
        };

        fetchTours();
    }, [query, currentPage]); // Chỉ phụ thuộc vào query và currentPage

    const filteredTours = useMemo(() => {
        if (!tours || tours.length === 0) return [];

        let result = [...tours];

        if (query.rate !== null && query.rate !== undefined) {
            result = result.filter((tour) => tour.ratingAvg >= query.rate);
        }

        if (result.length > 0) {
            result.sort((a, b) => (a.ratingAvg || 0) - (b.ratingAvg || 0));
        }

        if (query.searchPrices && query.searchPrices !== 'All') {
            if (query.searchPrices === 'HighToLow') {
                result.sort((a, b) => (b.maxPrice || 0) - (a.maxPrice || 0));
            } else if (query.searchPrices === 'LowToHigh') {
                result.sort((a, b) => (a.maxPrice || 0) - (b.maxPrice || 0));
            }
        }

        // Phân trang thủ công nếu API không hỗ trợ
        const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
        const endIndex = startIndex + ITEM_PER_PAGE;
        return result.slice(startIndex, endIndex);
    }, [tours, query.rate, query.searchPrices, currentPage]);

    const handleSearch = (query) => {
        const filterSearch = {};
        if (query.searchText) filterSearch.title = query.searchText;
        if (query.searchSides !== null) filterSearch.categoryId = query.searchSides;
        if (query.startDate !== null) filterSearch.startDate = query.startDate;
        if (query.endDate !== null) filterSearch.endDate = query.endDate;
        if (query.maxPrice) filterSearch.maxPrice = query.maxPrice;
        if (query.minPrice) filterSearch.minPrice = query.minPrice;
        if (query.rate) filterSearch.rate = query.rate;
        if (query.searchPrices) filterSearch.searchPrices = query.searchPrices;

        setQuery(filterSearch);
        setCurrentPage(1);
        setLoading(true);
    };

    const pageItem = tours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

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
                    <div className="flex-1">
                        {loading ? (
                            <div className="w-full h-[400px] flex items-center justify-center">
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
                            </div>
                        ) : filteredTours.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full px-4">
                                {filteredTours.map((tour) => (
                                    <TourCards key={tour.id} data={tour} />
                                ))}
                            </div>
                        ) : (
                            <EmptyComponent description={'tour'} />
                        )}
                    </div>
                </div>
            </div>
            <Pagination
                rootClassName={'my-10'}
                align={'center'}
                current={currentPage}
                defaultCurrent={1}
                total={tours.length} // Sử dụng totalItems thực tế
                pageSize={ITEM_PER_PAGE}
                onChange={onChange}
            />
        </div>
    );
};