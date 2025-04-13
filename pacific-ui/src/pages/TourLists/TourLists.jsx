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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import config from '~/config';
import { SearchFilterBar } from '~/pages/TourLists/components/SearchFilterBar';

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
        setCurrentPage(page);
        setLoading(false); // Không cần fetch lại dữ liệu, chỉ cập nhật trang
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
                const params = Object.keys(query).length === 0 ? { status: 'PUBLISHED' } : {
                    title: query.title || null,
                    categoryId: query.categoryId || null,
                    startDate: query.startDate || null,
                    endDate: query.endDate || null,
                    minPrice: query.minPrice || null,
                    maxPrice: query.maxPrice || null,
                };

                const res = await TourServices.getAllTour(params);
                const published = res.data.filter((tour) => tour.status === 'PUBLISHED');
                setTours(published || []);
            } catch (error) {
                console.error('Error fetching tours:', error);
                setTours([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, [query]); // Chỉ fetch lại khi query thay đổi

    // Tính toán danh sách tour đã lọc (trước khi phân trang)
    const allFilteredTours = useMemo(() => {
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

        if (query.minPrice && query.minPrice > 0) {
            result = result.filter((tour) => tour.maxPrice >= query.minPrice);
        }
        if (query.maxPrice && query.maxPrice > 0) {
            result = result.filter((tour) => tour.maxPrice <= query.maxPrice);
        }

        return result;
    }, [tours, query.rate, query.searchPrices, query.minPrice, query.maxPrice]);

    // Tính danh sách tour hiển thị trên trang hiện tại
    const filteredTours = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
        const endIndex = startIndex + ITEM_PER_PAGE;
        return allFilteredTours.slice(startIndex, endIndex);
    }, [allFilteredTours, currentPage]);

    // Tổng số item (tour) sau khi lọc
    const totalItems = useMemo(() => allFilteredTours.length, [allFilteredTours]);

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

    const bannerImages = [
        { src: config.webConfig.banner1, title: 'Khám phá đất nước', subtitle: 'Chuyến đi khó quên' },
        { src: config.webConfig.banner2, title: 'Khám phá mọi nơi', subtitle: 'Trở lại với ván cờ thực tế' },
        { src: config.webConfig.banner3, title: 'Du lịch đầy phong cách', subtitle: 'Cuộc phiêu lưu mới, kí niệm mới' },
    ];

    return (
        <div className="w-full min-h-screen">
            <Swiper
                modules={[Autoplay, EffectFade]}
                loop={true}
                slidesPerView={1}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                className="w-full h-64 sm:h-80 md:h-96"
            >
                {bannerImages.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={banner.src}
                                alt={`banner-${index}`}
                                className="w-full h-full object-cover brightness-[60%]"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg text-center">
                                    {banner.title}
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg mt-2 drop-shadow-md text-center">
                                    {banner.subtitle}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Divider orientation="center">
                <p className="text-orange-400 text-xl sm:text-2xl font-bold uppercase">{t('tourList.ti1')}</p>
            </Divider>

            <SearchBar onSearch={handleSearch} />

            <SearchFilterBar onSearch={setQuery} query={query} titleType={titleType} />

            <div className="mt-8 mx-4 sm:mx-8 lg:mx-16 space-y-8 min-h-[600px]">
                <div className="flex flex-col md:flex-row gap-4 min-h-[600px]">
                    <Aside query={query} setQuery={setQuery} titleType={titleType} />
                    <div className="flex-1">
                        {loading ? (
                            <div className="w-full h-64 flex items-center justify-center">
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                            </div>
                        ) : filteredTours.length > 0 ? (
                            <div
                                className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
                                {filteredTours.map((tour) => (
                                    <TourCards key={tour.id} data={tour} />
                                ))}
                            </div>
                        ) : (
                            <EmptyComponent description={"tour"} />
                        )}
                    </div>
                </div>
            </div>

            <Pagination
                className="my-8"
                align="center"
                current={currentPage}
                total={totalItems}
                pageSize={ITEM_PER_PAGE}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                responsive={true}
            />
        </div>
    );
};