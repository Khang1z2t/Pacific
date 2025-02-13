import { Checkbox, Divider, Rate, Select } from 'antd';
import { useState } from 'react';
import { prices } from '~/pages/TourLists/data/prices';
import { times } from '~/pages/TourLists/data/times';
import { ratings } from '~/pages/TourLists/data/ratings';

export const Aside = ({ onFilter }) => {


    const [filters, setFilters] = useState({
        prices: "All",
        times: [],
        ratings: [],
    });

    const handleChange = (type, value) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            if (type === 'prices') {
                newFilters[type] = value;
            } else {
                if (newFilters[type].includes(value)) {
                    newFilters[type] = newFilters[type].filter((item) => item !== value);
                } else {
                    newFilters[type].push(value);
                }
            }
            onFilter(newFilters);
            return newFilters;
        });
    };


    return (
        <aside className="w-3/12 h-fit border p-4 bg-gray-50 shadow-md rounded-md">
            <Divider>Chọn lọc giá</Divider>
            <Select
                className="w-full"
                placeholder="Chọn giá"
                onChange={(value) => handleChange('prices', value)}
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
                    key={timed.label} onChange={() => handleChange('times', timed.value)}>
                    {timed.label}
                </Checkbox>
            ))}
            <Divider>Điểm đánh giá</Divider>
            {ratings.map((rating) => (
                <div key={rating}>
                    <Checkbox onChange={() => handleChange('ratings', rating)}>
                        <Rate allowHalf defaultValue={rating} disabled /> trở lên
                    </Checkbox>
                </div>
            ))}
        </aside>
    );
};
