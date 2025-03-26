import { Input, Select } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import CategoryServices from '~/services/CategoryServices';
import { useTranslation } from 'react-i18next';

export const SearchBar = ({ onSearch }) => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [sides, setSides] = useState([]);
    const [searchSides , setSearchSides] = useState(null);
    useEffect(() => {
        CategoryServices.getCategories().then((res) => {
            setSides((
                [
                    {
                        id: null,
                        title: t("search.ti1"),
                    },
                    ...res,
                ]
            ));
        }).catch((err) => {
            console.log(err);
        })
    },[])

    const handleSearch = () => {
        onSearch({ searchText, searchSides });
    };

    return (
        <div
            className={'flex flex-row justify-center mx-auto items-center bg-gray-100 shadow-xl bg-blend-overlay mt-4 gap-4 p-4 w-fit rounded-lg'}>
            <Input
                placeholder={t("search.ti2")}
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

            <button className={'bg-orange-500 text-white px-6 py-2 rounded-md'} onClick={handleSearch}>{t("search.ti3")}</button>
        </div>
    );
};