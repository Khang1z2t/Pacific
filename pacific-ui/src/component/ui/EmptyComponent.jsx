import { Empty } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const EmptyComponent = ({ description }) => {
    return (
        <div className="flex items-center justify-center w-full h-full py-32">
            <Empty
                className="h-full"
                image={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                description={<h1 className="mt-6 font-semibold text-2xl">Không tìm kiếm được {description} phù hợp</h1>}
            />
        </div>
    );
};