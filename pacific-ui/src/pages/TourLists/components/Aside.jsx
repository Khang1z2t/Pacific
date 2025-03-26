import { Divider, Radio, Rate, Select } from 'antd';
import { useEffect, useState } from 'react';
import { prices } from '~/pages/TourLists/data/prices';
import { times } from '~/pages/TourLists/data/times';
import { ratings } from '~/pages/TourLists/data/ratings';
import { useTranslation } from 'react-i18next';

export const Aside = ({ setQuery, titleType }) => {
    const { t } = useTranslation();
    const ratingAvg = [1, 2, 3, 4, 5];
    const [rate, setRate] = useState([]);
    const [searchPrices, setSearchPrices] = useState(null);
    const [checkedTour, setCheckedTour] = useState(titleType === t("search.ti4") ? 1 : 2);
    useEffect(() => {
        setCheckedTour(titleType === t("search.ti4") ? 1 : 2);
        setQuery({ rate, searchPrices });
    }, [titleType, rate, searchPrices]);

    return (
        <aside className="w-3/12 sticky h-fit border p-4 bg-gray-50 shadow-md rounded-md">
            <Divider>{t("search.ti5")}</Divider>
            <Select
                className="w-full"
                placeholder={t("search.ti5")}
                optionFilterProp={'children'}
                onChange={(e) => setSearchPrices(e)}
                options={[
                    { label: t("search.ti6"), value: 'All' },
                    { label: t("search.ti7"), value: 'HighToLow' },
                    { label: t("search.ti8"), value: 'LowToHigh' },
                ]}
                defaultValue="All"
            />

            <Divider>{t("search.ti9")}</Divider>
            <Radio.Group className="w-full">
                {ratingAvg.map((item, index) => (
                    <Radio key={index} value={item} onChange={(e) => setRate(e.target.value)}>
                        <Rate value={item} disabled />
                    </Radio>
                ))}
            </Radio.Group>
            <Divider>{t("search.ti10")}</Divider>
            <Radio.Group value={checkedTour}>
                <Radio value={1}>{t("search.ti11")}</Radio>
                <Radio value={2}>{t("search.ti12")}</Radio>
            </Radio.Group>
        </aside>
    );
};
