import { SearchBar } from '~/pages/TourLists/components/SearchBar';
import { TourCards } from '~/pages/TourLists/components/TourCards';
import {tours} from '~/pages/TourLists/data/tours';
import { useState } from 'react';
import { Divider, Pagination } from 'antd';

export const TourLists = () => {

    const ITEM_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filteredTours, setFilteredTours] = useState(tours);
    const page = filteredTours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    const onChange = (e) => {
        // setSearch(e.target.value);
        setCurrentPage(e);
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
        const filtered = tours.filter((tour) => {
            return tour.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredTours(filtered);
    }
    return (
        <div className="relative w-full h-full ">
            <img
                src="/img/Pages/TourLists/bg.jpg"
                alt="Background"
                className="absolute top-0 left-0 w-full h-[300px] object-cover brightness-75"
            />
            <div className="relative container mx-auto py-10 text-center text-white">
                <h1 className="text-4xl font-bold uppercase">Tour Miền Bắc</h1>
            </div>
            <div className="relative z-10 container mx-auto mt-8">
                <SearchBar onSearch={handleSearch}/>
                <h1 className={"text-2xl font-bold uppercase shadow-lg text-orange-500 text-center mt-8"}>Danh sách tour</h1>
                <div className="mt-24 min-h-[800px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 mx-auto max-w-7xl">
                        {page.map((tour, index) => (
                            <TourCards
                                key={index}
                                src={tour.src}
                                title={tour.title}
                                location={tour.location}
                                date={tour.date}
                                description={tour.description}
                                rate={tour.rate}
                                price={tour.price}
                            />
                        ))}
                    </div>
                </div>
                <Pagination rootClassName={"my-10"} align={"center"} defaultCurrent={1} total={tours.length} pageSize={ITEM_PER_PAGE} onChange={(e) => onChange(e)} />
            </div>
        </div>
    );
};