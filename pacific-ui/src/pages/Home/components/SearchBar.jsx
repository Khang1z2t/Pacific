import { DatePicker, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import CategoryServices from '~/services/CategoryServices';
import { useTranslation } from 'react-i18next';

export const SearchBar = ({ onSearch }) => {
    const { RangePicker } = DatePicker;
    const [searchText, setSearchText] = useState('');
    const [searchSides, setSearchSides] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);

    const [sides, setSides] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        CategoryServices.getCategories().then((res) => {
            setSides((
                [
                    {
                        id: null,
                        title: t("searchBar.ti1"),
                    },
                    ...res,
                ]
            ));
        });
    }, [t]);
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
                placeholder={t("searchBar.ti2")}
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
            <InputNumber
                allowClear
                min={0}
                step={100000}
                formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                suffix={"VND"}
                placeholder={t("searchBar.ti3")}
                onChange={(e) => setMinPrice(e)}
                className="w-[200px] font-bold"
                size="large"
                />
            <InputNumber
                min={0}
                step={100000}
                allowClear
                formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                suffix={"VND"}
                placeholder={t("searchBar.ti4")}
                onChange={(e) => setMaxPrice(e)}
                className="w-[200px] font-bold"
                size="large"
            />
            <button className={'bg-orange-500 text-white px-6 py-2 rounded-md'} onClick={handleSearch}>{t("searchBar.ti5")}</button>
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