import { Divider } from 'antd';
import React from 'react';

export const CardInfo = ({title, children1, children2, ...props}) => {
    return (
        <div className={"mt-2"}>
            <h3 className={'text-xl uppercase text-blue-800 font-semibold text-center'}>{title}</h3>
            <div className={'flex justify-between flex-wrap gap-4 mt-6'}>
                {children1}
                <Divider
                    style={{
                        borderColor: '#656565',
                    }}
                    className="h-28"
                    type="vertical"
                />
                {children2}
            </div>
        </div>
    );
};