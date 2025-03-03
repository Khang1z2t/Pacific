import React, { useState } from 'react';
import { Menu, Calendar, Modal, Card } from 'antd';
import dayjs from 'dayjs';

export const CalendarSection = ({ tourDT }) => {
    const [selectedMonth, setSelectedMonth] = useState(dayjs());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const validDates = [19, 12]; // Các ngày hợp lệ
    const prices = {
        19: '63,990K',
        12: '66,990K',
    };

    const handleMonthSelect = (month) => {
        setSelectedMonth(dayjs(month));
    };

    const handleDateClick = (date) => {
        if (validDates.includes(date.date())) {
            setIsModalVisible(true);
        }
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="flex p-4 space-x-4">
            {/* Month Picker */}
            <Card className="w-1/4 border-r p-4 shadow-lg">
                <h2 className="font-bold mb-2">Chọn tháng</h2>
                <Menu
                    selectedKeys={[selectedMonth.format('M/YYYY')]}
                    mode="vertical"
                >
                    {[3, 4].map((month) => (
                        <Menu.Item
                            key={`${month}/2025`}
                            onClick={() => handleMonthSelect(`2025-${month}-01`)}
                        >
                            {`${month}/2025`}
                        </Menu.Item>
                    ))}
                </Menu>
            </Card>

            {/* Date Picker */}
            <Card className="w-3/4 p-4 shadow-lg">
                <h2 className="text-blue-600 text-center text-lg font-bold mb-4">
                    THÁNG {selectedMonth.format('M/YYYY')}
                </h2>
                <Calendar
                    value={selectedMonth}
                    fullscreen={false}
                    headerRender={() => null}
                    disabledDate={(date) => date.month() !== selectedMonth.month()}
                    dateFullCellRender={(date) => {
                        const day = date.date();
                        const isValid = validDates.includes(day);
                        const isDisabled = date.month() !== selectedMonth.month();
                        return (
                            <div
                                className={`text-center p-2 rounded-lg transition-colors duration-200  ${
                                        isValid
                                            ? 'border border-red-500 text-red-500 hover:bg-red-100 cursor-pointer'
                                            : 'text-gray-400'
                                }`}
                                onClick={() => handleDateClick(date)}
                            >
                                {day}
                                {isValid && (
                                    <div className="text-xs font-bold ">{prices[day]}</div>
                                )}
                            </div>
                        );
                    }}
                />
                <p className="text-red-500 text-center mt-2 italic">
                    Quý khách vui lòng chọn ngày phù hợp
                </p>
                <Modal className={'w-1/2'} title="Basic Modal" visible={isModalVisible} onOk={handleClose}
                       onCancel={handleClose}>
                    <p>Modal Content</p>
                </Modal>
            </Card>
        </div>
    );
};