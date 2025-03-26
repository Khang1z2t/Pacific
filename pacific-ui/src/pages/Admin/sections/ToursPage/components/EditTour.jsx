import { Modal } from 'antd';
import React from 'react';

export const EditTour = ({editModalVisible, setEditModalVisible, setLoading}) => {
    // States

    // Modules


    // Handles
    return (
        <Modal title={'Chỉnh sửa tour và thông tin tour'}
               open={editModalVisible}
               onCancel={() => setEditModalVisible(false)}
               okText={'Lưu'}
               cancelText={'Đóng'}>


        </Modal>
    );
};