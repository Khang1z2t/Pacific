import { DatePicker, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import CategoryServices from '~/services/CategoryServices';

export const SearchBar = ({ onSearch }) => {
    const { RangePicker } = DatePicker;
    const [searchText, setSearchText] = useState('');
    const [searchSides, setSearchSides] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);

    const [sides, setSides] = useState([]);

    useEffect(() => {
        CategoryServices.getCategories().then((res) => {
            setSides((
                [
                    {
                        id: null,
                        title: 'Tất cả khu vực',
                    },
                    ...res,
                ]
            ));
        });
    }, []);
    const handleSearch = () => {
        onSearch({ searchText, searchSides, maxPrice, minPrice, startDate, endDate });
    };

    return (
        <div
            style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-wave 6s ease infinite',
            }}
            className="flex flex-wrap items-center justify-center bg-gradient-to-b from-orange-200 to-orange-700 shadow-md rounded-lg p-4 gap-4 max-w-screen-lg mx-auto">
            <Input
                placeholder="Tìm kiếm tour"
                allowClear
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-grow min-w-[200px] max-w-[300px] font-bold rounded-lg"
                size="large"
            />
            <Select
                showSearch
                options={sides}
                size="large"
                value={searchSides}
                fieldNames={{ value: 'id', label: 'title' }}
                onChange={(value) => setSearchSides(value)}
                className="flex-grow min-w-[150px] max-w-[200px] font-bold"
            />
            <Input
                type="number"
                placeholder="Giá thấp nhất"
                onChange={(e) => setMinPrice(e.target.value)}
                className="min-w-[120px] max-w-[150px] font-bold"
                size="large"
            />
            <Input
                type="number"
                placeholder="Giá cao nhất"
                onChange={(e) => setMaxPrice(e.target.value)}
                className="min-w-[120px] max-w-[150px] font-bold"
                size="large"
            />
            <RangePicker
                size="large"
                format="DD/MM/YYYY"
                placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                onChange={(dates) => {
                    if (dates) {
                        setStartDate(dates[0].format('YYYY-MM-DD'));
                        setEndDate(dates[1].format('YYYY-MM-DD'));
                    } else {
                        setStartDate(null);
                        setEndDate(null);
                    }
                }}
                className="flex-grow min-w-[200px] max-w-[300px] font-bold"
            />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md max-w-full" onClick={handleSearch}>
                Tìm kiếm
            </button>
        </div>
    );
};