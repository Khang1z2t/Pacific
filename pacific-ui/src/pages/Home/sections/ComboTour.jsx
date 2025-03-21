import { Divider, Pagination } from 'antd';
import { TourCards } from '~/pages/Home/components/TourCards';
import { useEffect, useState } from 'react';
import TourServices from '~/services/TourServices';
import { SearchBar } from '~/pages/Home/components/SearchBar';
import { EmptyComponent } from '~/component/ui/EmptyComponent';
import { LoadingOutlined } from '@ant-design/icons';

export const ComboTour = () => {
    const ITEM_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [tours, setTours] = useState([]);
    const [query, setQuery] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSearch = (query) => {
        const filterSearch = {};

        if (query.searchText) filterSearch.title = query.searchText;
        if (query.searchSides !== null) filterSearch.categoryId = query.searchSides;
        if(query.maxPrice) filterSearch.maxPrice = query.maxPrice;
        if(query.minPrice) filterSearch.minPrice = query.minPrice;

        setQuery(filterSearch);
    };


    const onChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        TourServices.getAllTour(query).then((res) => {
            const published = res.data.filter((tour) => tour.status === 'PUBLISHED');
            setTours(published);
            setLoading(false)
        }).catch((err) => {
            console.error(err);
        });
    }, [query]);


    const pageItem = tours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return (
        <div className="container mx-auto justify-center w-full">
            <Divider
                className="font-bold uppercase"
                style={{ borderColor: '#7cb305' }}
                orientation="center"
            >
                <h2 className="lg:text-3xl text-md">Danh sách tour</h2>
                <p className="lg:text-xl text-sm">Những tour đang có ưu đãi hot!</p>
            </Divider>
            <SearchBar onSearch={handleSearch}/>
            <div
                className="mt-6 grid grid-cols-4 gap-4 justify-center px-14 w-fit mx-auto min-h-[500px]">
                {!loading && pageItem.length === 0 && (
                    <div className={"col-span-4 w-full"}>
                        <EmptyComponent description={'tour'}/>
                    </div>
                )}
                {!loading && pageItem.map((item, index) => (
                    <TourCards key={index} data={item} />
                ))}
                {loading && (
                    <div className="w-full h-[400px] col-span-4 flex items-center justify-center">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
                    </div>
                )}
            </div>
            <Pagination
                rootClassName={'flex justify-center mt-6'}
                align="center"
                defaultCurrent={1}
                total={tours.length}
                pageSize={ITEM_PER_PAGE}
                onChange={onChange}
            />
        </div>
    );
};