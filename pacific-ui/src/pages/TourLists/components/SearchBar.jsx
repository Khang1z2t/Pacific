import { DatePicker, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import CategoryServices from '~/services/CategoryServices';
import { useTranslation } from 'react-i18next';

export const SearchBar = ({ onSearch }) => {
    const { RangePicker } = DatePicker;
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [sides, setSides] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchSides, setSearchSides] = useState(null); // Khởi tạo searchSides là null

    useEffect(() => {
        CategoryServices.getCategories()
            .then((res) => {
                // Đảm bảo dữ liệu từ API có cấu trúc đúng
                const formattedSides = [
                    {
                        id: null, // Giá trị mặc định cho "All"
                        title: "Tất cả khu vực" // "All" hoặc giá trị dịch
                    },
                    ...res.map(category => ({
                        id: category.id, // Đảm bảo có id
                        title: category.title || category.name || 'Unknown', // Đảm bảo có title
                    })),
                ];
                setSides(formattedSides);
            })
            .catch((err) => {
                console.log('Error fetching categories:', err);
                setSides([
                    {
                        id: null,
                        title: "Tất cả khu vực"
                    },
                ]); // Fallback nếu API lỗi
            });
    }, [t]); // Thêm t vào dependency để cập nhật khi ngôn ngữ thay đổi

    const handleSearch = () => {
        console.log({ searchText, searchSides, startDate, endDate });
        onSearch({ searchText, searchSides, startDate, endDate });
    };

    return (
        <div
            className={
                'flex flex-row justify-center mx-auto items-center bg-gray-100 shadow-xl bg-blend-overlay mt-4 gap-4 p-4 w-fit rounded-lg'
            }
        >
            <Input
                placeholder={t('search.ti2')}
                allowClear
                onChange={(e) => setSearchText(e.target.value)}
                rootClassName={'w-96 font-bold rounded-lg'}
                size={'large'}
            />
            <Select
                showSearch
                options={sides}
                size={'large'}
                value={searchSides} // Giá trị được chọn
                fieldNames={{ value: 'id', label: 'title' }}
                onChange={(value) => setSearchSides(value)} // Cập nhật searchSides
                optionLabelProp={'title'}
                className={'w-96 font-bold'}
                placeholder={t('search.ti1')} // Placeholder là "All"
            />
            <RangePicker
                size={'large'}
                format={'DD/MM/YYYY'}
                placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} // Dịch placeholder
                onChange={(dates) => {
                    if (dates) {
                        setStartDate(dates[0].format('YYYY-MM-DD'));
                        setEndDate(dates[1].format('YYYY-MM-DD'));
                    } else {
                        setStartDate(null);
                        setEndDate(null);
                    }
                }}
                className={'w-96 font-bold'}
            />
            <button
                className={'bg-orange-500 text-white px-6 py-2 rounded-md'}
                onClick={handleSearch}
            >
                {t('search.ti3')}
            </button>
        </div>
    );
};