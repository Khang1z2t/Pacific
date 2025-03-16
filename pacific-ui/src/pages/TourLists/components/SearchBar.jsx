import { Input, Select } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import CategoryServices from '~/services/CategoryServices';

export const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [sides, setSides] = useState([]);
    const [searchSides , setSearchSides] = useState(null);
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
        }).catch((err) => {
            console.log(err);
        })
    },[])

    // useEffect(() => {
    //     setSearchSides(
    //         sides.filter((side) =>
    //             side.title.toLowerCase().includes(searchSides.title.toLowerCase())
    //     ));
    // },[sides,searchSides])

    const handleSearch = () => {
        onSearch({ searchText, searchSides });
    };

    return (
        <div
            className={'flex flex-row justify-center mx-auto items-center bg-gray-100 shadow-xl bg-blend-overlay mt-4 gap-4 p-4 w-fit rounded-lg'}>
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
                fieldNames={{value: 'id', label: 'title'}}
                defaultValue={'All'}
                onChange={(value) => setSearchSides(value)}
                optionLabelProp={'title'}
                className={'w-96 font-bold '}
            />

            <button className={'bg-orange-500 text-white px-6 py-2 rounded-md'} onClick={handleSearch}>Tìm kiếm</button>
        </div>
    );
};