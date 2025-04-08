import { Divider, InputNumber, Radio, Rate, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseCircleOutlined } from '@ant-design/icons';

export const Aside = ({ query, setQuery, titleType }) => {
    const { t } = useTranslation();
    const ratingAvg = [1, 2, 3, 4, 5];
    const [rate, setRate] = useState(query.rate || null); // Đồng bộ với query.rate
    const [searchPrices, setSearchPrices] = useState(query.searchPrices || 'All'); // Đồng bộ với query.searchPrices
    const [checkedTour, setCheckedTour] = useState(titleType === t('search.ti4') ? 1 : 2);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);

    useEffect(() => {
        setCheckedTour(titleType === t('search.ti4') ? 1 : 2);
        setQuery((prevQuery) => ({
            ...prevQuery,
            rate,
            minPrice,
            maxPrice,
            searchPrices,
        }));
    }, [titleType, rate, searchPrices, setQuery]);

    const handleClear = () => {
        setRate(null);
        setSearchPrices('All');
        setMinPrice(0);
        setMaxPrice(0);
        setCheckedTour(1);
        setQuery((prevQuery) => ({
            ...prevQuery,
            rate: null,
            minPrice: null,
            maxPrice: null,
            searchPrices: 'All',
        }));
    }

    return (
        <aside className="w-3/12 sticky h-fit border p-4 bg-gray-50 shadow-md rounded-md">
            <Divider>{t('search.ti5')}</Divider>
            <Select
                className="w-full"
                placeholder={t('search.ti5')}
                optionFilterProp={'children'}
                onChange={(value) => setSearchPrices(value)}
                value={searchPrices}
                options={[
                    { label: t('search.ti6'), value: 'All' },
                    { label: t('search.ti7'), value: 'HighToLow' },
                    { label: t('search.ti8'), value: 'LowToHigh' },
                ]}
            />
            <div className={"grid grid-cols-2 items-center gap-2"}>
                <InputNumber
                    className="w-full mt-4"
                    placeholder="Giá thấp nhất"
                    min={0}
                    formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    suffix={"VND"}
                    value={minPrice}
                    onChange={(value) => {
                        setMinPrice(value);
                        setQuery((prevQuery) => ({
                            ...prevQuery,
                            minPrice: value,
                        }));
                    }}
                />
                <InputNumber
                    className="w-full mt-4"
                    placeholder="Giá cao nhất"
                    min={0}
                    formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    suffix={"VND"}
                    value={maxPrice}
                    onChange={(value) => {
                        setMaxPrice(value);
                        setQuery((prevQuery) => ({
                            ...prevQuery,
                            maxPrice: value,
                        }));
                    }}
                />
            </div>

            <Divider>{t('search.ti9')}</Divider>
            <Radio.Group
                value={rate}
                onChange={(e) => setRate(e.target.value)}
            >
                {ratingAvg.map((item, index) => (
                    <Radio key={index} value={item}>
                        <Rate value={item} disabled />
                    </Radio>
                ))}
            </Radio.Group>
            <Divider>{t('search.ti10')}</Divider>
            <Radio.Group value={checkedTour}>
                <Radio value={1}>{t('search.ti11')}</Radio>
                <Radio value={2}>{t('search.ti12')}</Radio>
            </Radio.Group>
            <Divider/>
            <button
                onClick={handleClear}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 flex items-center justify-center gap-2"
            >
                <CloseCircleOutlined className="text-lg text-red-500" />
                Bỏ chọn
            </button>
        </aside>
    );
};