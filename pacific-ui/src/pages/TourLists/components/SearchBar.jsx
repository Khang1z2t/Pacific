import { DatePicker, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import CategoryServices from '~/services/CategoryServices';

export const SearchBar = ({ onSearch }) => {
    const { RangePicker } = DatePicker;

    const [searchText, setSearchText] = useState('');
    const [sides, setSides] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
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

    const handleSearch = () => {
        onSearch({ searchText, searchSides, startDate, endDate });
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
            <RangePicker
                size={'large'}
                format={"DD/MM/YYYY"}
                placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                onChange={(dates) => {
                    if (dates) {
                        setStartDate(dates[0].format("YYYY-MM-DD"));
                        setEndDate(dates[1].format("YYYY-MM-DD"));
                    } else {
                        setStartDate(null);
                        setEndDate(null);
                    }
                }}
                className={'w-96 font-bold'}
            />
            <button className={'bg-orange-500 text-white px-6 py-2 rounded-md'} onClick={handleSearch}>Tìm kiếm</button>
        </div>
    );
};