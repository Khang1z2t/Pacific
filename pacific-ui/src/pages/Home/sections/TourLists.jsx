import { Divider, Pagination, Spin } from 'antd';
import { TourCards } from '~/pages/Home/components/TourCards';
import { useEffect, useState } from 'react';
import TourServices from '~/services/TourServices';
import { SearchBar } from '~/pages/Home/components/SearchBar';
import { EmptyComponent } from '~/component/ui/EmptyComponent';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const TourLists = () => {
    const ITEM_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [tours, setTours] = useState([]);
    const [query, setQuery] = useState({});
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleSearch = (query) => {
        const filterSearch = {};
        if (query.searchText) filterSearch.title = query.searchText;
        if (query.searchSides !== null) filterSearch.categoryId = query.searchSides;
        if (query.maxPrice) filterSearch.maxPrice = query.maxPrice;
        if (query.minPrice) filterSearch.minPrice = query.minPrice;
        if (query.startDate) filterSearch.startDate = query.startDate;
        if (query.endDate) filterSearch.endDate = query.endDate;

        setQuery(filterSearch);
        setCurrentPage(1); // Reset to page 1 on new search
        setLoading(true);
    };

    const onChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setLoading(true);
        TourServices.getAllTour(query)
            .then((res) => {
                const published = res.data.filter((tour) => tour.status === 'PUBLISHED');
                setTours(published);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [query]);

    const pageItem = tours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-32 py-6">
            <Divider
                className="font-bold uppercase"
                style={{ borderColor: '#7cb305' }}
                orientation="center"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-lime-500">
                    {t('comboTour.tour1')}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">{t('comboTour.tour3')}</p>
            </Divider>
            <div className="max-w-5xl mx-auto">
                <SearchBar onSearch={handleSearch} />
            </div>
            <div
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {loading ? (
                    <div className="col-span-full min-h-[400px] flex items-center justify-center">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                    </div>
                ) : pageItem.length === 0 ? (
                    <div className="col-span-full min-h-[400px] flex items-center justify-center">
                        <EmptyComponent description={t('tour')} />
                    </div>
                ) : (
                    pageItem.map((item) => <TourCards key={item.id} data={item} />)
                )}
            </div>
            {tours.length > 0 && (
                <Pagination
                    className="flex justify-center mt-8"
                    align="center"
                    current={currentPage}
                    total={tours.length}
                    pageSize={ITEM_PER_PAGE}
                    onChange={onChange}
                    showSizeChanger={false}
                    showLessItems={true}
                />
            )}
        </div>
    );
};