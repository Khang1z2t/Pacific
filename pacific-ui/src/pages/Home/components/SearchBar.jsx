import { Input, Select } from 'antd';
import config from '~/config';
import { useEffect, useState } from 'react';
import CategoryService from '~/services/CategoryService';

export const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [searchSides, setSearchSides] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);

    const [sides, setSides] = useState([]);

    useEffect(() => {
        CategoryService.getCategories().then((res) => {
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
        onSearch({ searchText, searchSides, maxPrice, minPrice });
    };

    return (
        <div
            className={'flex flex-row justify-center mx-auto items-center bg-gray-100 shadow-md bg-blend-overlay mt-4 gap-4 p-4 w-fit rounded-lg'}>
            <Input
                placeholder="Tìm kiếm tour"
                allowClear
                onChange={(e) => setSearchText(e.target.value)}
                rootClassName={'w-96 font-bold rounded-lg'}
                size={'large'}
            />
            <Select
                showSearch
                options={sides}
                size={'large'}
                value={searchSides}
                fieldNames={{ value: 'id', label: 'title' }}
                defaultValue={'All'}
                onChange={(value) => setSearchSides(value)}
                optionLabelProp={'title'}
                className={'w-96 font-bold '}
            />
            <Input
                type={'number'}
                placeholder={'Giá thấp nhất'}
                onChange={(e) => setMinPrice(e.target.value)}
                className={'w-fit font-bold'}
                size={'large'}
            />
            <Input
                type={'number'}
                placeholder={'Giá cao nhất'}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={'w-fit font-bold'}
                size={'large'}
            />
            <button className={'bg-orange-500 text-white px-6 py-2 rounded-md'} onClick={handleSearch}>Tìm kiếm</button>
        </div>
    );
};