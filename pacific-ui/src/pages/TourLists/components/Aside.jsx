import { Checkbox, Divider, Radio, Rate, Select } from 'antd';
import { useEffect, useState } from 'react';
import { prices } from '~/pages/TourLists/data/prices';
import { times } from '~/pages/TourLists/data/times';
import { ratings } from '~/pages/TourLists/data/ratings';

export const Aside = ({ setQuery, titleType }) => {
    const ratingAvg = [1, 2, 3, 4, 5];
    const [rate, setRate] = useState([]);
    const [searchPrices, setSearchPrices] = useState(null);
    const [checkedTour, setCheckedTour] = useState(titleType === 'trong nước' ? 1 : 2);
    useEffect(() => {
        setCheckedTour(titleType === 'trong nước' ? 1 : 2);
        setQuery({ rate, searchPrices });
    }, [titleType, rate, searchPrices]);

    return (
        <aside className="w-3/12 sticky h-fit border p-4 bg-gray-50 shadow-md rounded-md">
            <Divider>Chọn lọc giá</Divider>
            <Select
                className="w-full"
                placeholder="Chọn giá"
                optionFilterProp={'children'}
                onChange={(e) => setSearchPrices(e)}
                options={[
                    { label: 'Tất cả', value: 'All' },
                    { label: 'Cao nhất', value: 'HighToLow' },
                    { label: 'Thấp nhất', value: 'LowToHigh' },
                ]}
                defaultValue="All"
            />

            <Divider>Điểm đánh giá</Divider>
            <Radio.Group className="w-full">
                {ratingAvg.map((item, index) => (
                    <Radio key={index} value={item} onChange={(e) => setRate(e.target.value)}>
                        <Rate value={item} disabled />
                    </Radio>
                ))}
            </Radio.Group>
            <Divider>Loại tour</Divider>
            <Radio.Group value={checkedTour}>
                <Radio value={1}>Tour trong nước</Radio>
                <Radio value={2}>Tour nước ngoài</Radio>
            </Radio.Group>
        </aside>
    );
};
