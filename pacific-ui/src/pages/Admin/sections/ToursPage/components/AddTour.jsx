import { Divider, Image, Input, InputNumber, message, Modal, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import AdminServices from '~/services/AdminServices';
import config from '~/config';
import TourServices from '~/services/TourServices';
import CategoryServices from '~/services/CategoryServices';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const AddTour = ({ modalVisible, setModalVisible, setLoading }) => {
    // MODAL & IMAGES UPLOAD
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    // TOUR MODULES
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [destination, setDestination] = useState('');
    const [guides, setGuides] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    // HANDLE PREVIEW
    useEffect(() => {
        AdminServices.getGuides().then((res) => {
            setGuides(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    useEffect(() => {
        CategoryServices.getCategories().then((res) => {
            setCategories(res);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setImages(newFileList);
    const handleChangeThumbnail = ({ fileList: newThumbnail }) => setThumbnail(newThumbnail);
    // Render
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    //
const handleAdd = async () => {
    const thumbnailFile = thumbnail[0]?.originFileObj;
    const imageFiles = images.map(file => ({ file: file.originFileObj }));

    const params = {
        title,
        description,
        duration,
        destination,
        selectedGuide,
        selectedCategory,
        thumbnail: thumbnailFile,
        images : imageFiles,
    };
    console.log(thumbnailFile,imageFiles)
    try {
        await TourServices.AddTour(params);
        message.success('Thêm tour thành công', 1);
        setLoading();
    } catch (err) {
        message.error('Thêm tour thất bại: ' + err, 1);
        console.log(err);
    }
    setModalVisible(false);
};

    //
    return (
        <Modal title={'Thêm tour'}
               OkText={'Lưu'}
               width={800}
               CancelText={'Đóng'}
               onOk={handleAdd}
               open={modalVisible}
               onCancel={() => setModalVisible(false)}
        >
            <div className={'p-4 space-y-2 w-full'}>
                <div className={'flex flex-col gap-2'}>
                    <label className={'font-semibold text-gray-500'}>Ảnh tour thumbnail</label>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={thumbnail}
                        onPreview={handlePreview}
                        onChange={handleChangeThumbnail}
                    >
                        {thumbnail.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>
                <div className={'flex flex-col gap-2'}>
                    <label className={'font-semibold text-gray-500'}>Ảnh phụ <span className={'text-red-500'}>(Số lượng không lớn hơn 8)</span></label>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={images}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {images.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>
                <Divider />
                <div className={'p-2'}>
                    <div className={'grid grid-cols-2 gap-4'}>
                        <div className={'flex flex-col gap-2'}>
                            <label className={'font-semibold text-black uppercase'}>Tên tour</label>
                            <Input placeholder={'Tên tour'}
                                   allowClear
                                   onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <label className={'font-semibold text-black uppercase'}>Mô tả tour</label>
                            <Input.TextArea rootClassName={'max-h-24'}
                                            allowClear
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={'Mô tả tour'} />
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <label className={'font-semibold text-black uppercase'}>Thời gian</label>
                            <InputNumber
                                className={'w-full'}
                                onChange={(e) => setDuration(e)}
                                min={0}
                                placeholder={'Thời gian'} />
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <label className={'font-semibold text-black uppercase'}>Điểm đến</label>
                            <Input
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder={'Điểm đến destination'} />
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <label className={'font-semibold text-black uppercase'}>Hướng dẫn viên</label>
                            <Select
                                showSearch
                                options={guides}
                                fieldNames={{ value: 'id', label: 'firstname + lastname' }}
                                onChange={(e) => setSelectedGuide(e)}
                                placeholder={'Chọn hướng dẫn viên'} />
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <label className={'font-semibold text-black uppercase'}>Loại tour</label>
                            <Select
                                showSearch
                                options={categories}
                                fieldNames={{ value: 'id', label: 'title' }}
                                onChange={(e) => setCategories(e)}
                                placeholder={'Chọn loại tour'} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};