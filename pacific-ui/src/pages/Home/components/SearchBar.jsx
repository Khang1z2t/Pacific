import { Button, DatePicker, Drawer, Input, InputNumber, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import CategoryServices from '~/services/CategoryServices';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa';

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

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        CategoryServices.getCategories().then((res) => {
            setSides((
                [
                    {
                        id: null,
                        title: t('searchBar.ti1'),
                    },
                    ...res,
                ]
            ));
        });
    }, [t]);
    const handleSearch = () => {
        onSearch({ searchText, searchSides, maxPrice, minPrice, startDate, endDate });
    };

    const handleRefresh = () => {
        setSearchText('');
        setSearchSides(null);
        setStartDate(null);
        setEndDate(null);
        setMaxPrice(null);
        setMinPrice(null);
        setVisible(false);
        onSearch({ searchText: '', searchSides: null, maxPrice: null, minPrice: null, startDate: null, endDate: null });
        message.success('Tìm kiếm đã được làm mới', 1);
    };
    return (
        <>
            <div style={{ backgroundSize: '200% 200%', animation: 'gradient-wave 6s ease infinite' }}
                 className="md:flex lg:flex md:flex-wrap lg:flex-wrap items-center justify-center bg-gradient-to-b from-orange-200 to-orange-700 shadow-md rounded-lg p-4 gap-4 max-w-screen-lg mx-auto hidden">
                <Input
                    placeholder={t('searchBar.ti2')}
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
                    suffix={'VND'}
                    placeholder={t('searchBar.ti3')}
                    onChange={(e) => setMinPrice(e)}
                    className="w-[200px] font-bold"
                    size="large"
                />
                <InputNumber
                    min={0}
                    step={100000}
                    allowClear
                    formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    suffix={'VND'}
                    placeholder={t('searchBar.ti4')}
                    onChange={(e) => setMaxPrice(e)}
                    className="w-[200px] font-bold"
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
                <button className={'bg-orange-500 text-white px-6 py-2 rounded-md'}
                        onClick={handleSearch}>{t('searchBar.ti5')}</button>
            </div>
            <div className="flex items-center mx-auto justify-end md:hidden lg:hidden">
                <Button
                    type={'text'}
                    icon={<FaBars />}
                    className={'text-orange-500 hover:text-orange-600'}
                    size={'large'}
                    onClick={() => setVisible(!visible)}
                />
                <Drawer
                    title={t('searchBar.ti6')}
                    placement="right"
                    closable={true}
                    onClose={() => setVisible(false)}
                    open={visible}
                    width={300}
                    bodyStyle={{
                        padding: 0,
                    }}
                    headerStyle={{
                        backgroundColor: '#f8f8f8',
                        borderBottom: '1px solid #eaeaea',
                    }}
                    footerStyle={{
                        backgroundColor: '#f8f8f8',
                        borderTop: '1px solid #eaeaea',
                    }}
                >
                    <div className="flex flex-col gap-4 p-4">
                        <Input
                            placeholder={t('searchBar.ti2')}
                            allowClear
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full font-bold rounded-lg"
                            size="large"
                        />
                        <Select
                            showSearch
                            options={sides}
                            size="large"
                            value={searchSides}
                            fieldNames={{ value: 'id', label: 'title' }}
                            onChange={(value) => setSearchSides(value)}
                            className="w-full font-bold"
                        />
                        <InputNumber
                            allowClear
                            min={0}
                            step={100000}
                            formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            suffix={'VND'}
                            placeholder={t('searchBar.ti3')}
                            onChange={(e) => setMinPrice(e)}
                            className="w-full font-bold"
                            size="large"
                        />
                        <InputNumber
                            min={0}
                            step={100000}
                            allowClear
                            formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            suffix={'VND'}
                            placeholder={t('searchBar.ti4')}
                            onChange={(e) => setMaxPrice(e)}
                            className="w-full font-bold"
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
                            className="w-full font-bold"
                        />
                        <button className={'bg-orange-500 text-white px-6 py-2 rounded-md'}
                                onClick={handleSearch}>{t('searchBar.ti5')}</button>
                        <button className={'bg-gray-300 text-gray-700 px-6 py-2 rounded-md'} onClick={handleRefresh}>Xóa
                            tất cả
                        </button>
                    </div>
                </Drawer>
            </div>
        </>
    );
};