import {Checkbox, Divider, Radio, Rate, Select} from 'antd';
import { useEffect, useState } from 'react';
import { prices } from '~/pages/TourLists/data/prices';
import { times } from '~/pages/TourLists/data/times';
import { ratings } from '~/pages/TourLists/data/ratings';

export const Aside = ({setSort}) => {
    const [query, setQuery] = useState({
        prices: "All",
        times: [],
        ratings: [],
    });
    const [checkedTour, setCheckedTour] = useState();


    const handleCheckboxChange = (field, value) => {
        setQuery({...query, [field]: value});
    }
    const handleSelectChange = (value) => {
        setQuery({...query, prices: value});
        setSort(value);
    }
    return (
        <aside className="w-3/12 h-fit border p-4 bg-gray-50 shadow-md rounded-md">
            <Divider>Chọn lọc giá</Divider>
            <Select
                className="w-full"
                placeholder="Chọn giá"
                optionFilterProp={'children'}
                onChange={(value,option) => handleSelectChange(option.value)}
                options={[
                    { label: 'Tất cả', value: 'All' },
                    { label: 'Cao nhất', value: 'HighToLow' },
                    { label: 'Thấp nhất', value: 'LowToHigh' },
                ]}
                defaultValue="All"
            />

            <Divider>Giờ trong ngày</Divider>
            {times.map((timed) => (
                <Checkbox
                    key={timed.label} onChange={(value) => handleCheckboxChange('times', value)}>
                    {timed.label}
                </Checkbox>
            ))}
            <Divider>Điểm đánh giá</Divider>
            {ratings.map((rating) => (
                <div key={rating}>
                    <Checkbox onChange={(value) => handleCheckboxChange('rating',value)}>
                        <Rate allowHalf defaultValue={rating} disabled /> trở lên
                    </Checkbox>
                </div>
            ))}
            <Divider>Loại tour</Divider>
            <Radio.Group>
                <Radio value={1}>Tour trong nước</Radio>
                <Radio value={2}>Tour nước ngoài</Radio>
            </Radio.Group>
        </aside>
    );
};
