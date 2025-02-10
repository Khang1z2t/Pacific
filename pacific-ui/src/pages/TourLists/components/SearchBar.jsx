import { Input, Select } from 'antd';
import Search from 'antd/es/input/Search';
import { useState } from 'react';
import { sides } from '~/pages/TourLists/data/sides';

export const SearchBar = ({ ...props }) => {
    const [query, setQuery] = useState({
        searchText: '',
        side: 'All',
    });
    const handleChangeInput = (e) => {
        setQuery((prev) => ({ ...prev, searchText: e.target.value }));
    }
    const handleChangeSelect = (value) => {
        setQuery((prev) => ({ ...prev, side: value }));
    }
    const handleSearch = () => {
        props.onSearch(query);
    }
    return (
        <div
            className={'flex flex-row justify-center mx-auto items-center bg-gray-200 shadow-xl bg-blend-overlay mt-4 gap-4 p-4 w-fit rounded-lg'}>
            <Input
                placeholder="Tìm kiếm tour"
                allowClear
                onChange={handleChangeInput}
                rootClassName={'w-96 font-bold rounded-lg'}
                size={'large'}
            />
            <Select
                showSearch
                placeholder="Chọn khu vực"
                options={sides}
                size={'large'}
                defaultValue={"All"}
                filterOption={(input, option) => option.value.toLowerCase().includes(input.toLowerCase())}
                onChange={handleChangeSelect}
                optionLabelProp={'label'}
                className={'w-96 font-bold '}
            />

            <button className={'bg-orange-500 text-white px-6 py-2 rounded-md'} onClick={handleSearch}>Tìm kiếm</button>
        </div>
    );
};