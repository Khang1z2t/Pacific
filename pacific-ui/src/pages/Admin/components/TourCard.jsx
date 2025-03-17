import React, { useState } from "react";
import { Card, Button, Modal, Image, Typography } from "antd";

const { Title, Text } = Typography;

const TourCard = ({ tour, onDelete }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    return (
        <>
            <Card
                hoverable
                cover={<Image alt={tour.name} src={tour.image} style={{ height: 200, objectFit: "cover" }} />}
                style={{ backgroundColor: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
                <Title level={4}>{tour.name}</Title>
                <Text strong>Điểm đến:</Text> <Text>{tour.destination}</Text><br />
                <Text strong>Giá:</Text> <Text type="danger">{tour.price} USD</Text><br />
                <Text strong>Thời gian:</Text> <Text>{tour.duration}</Text><br />

                <Button type="primary" block style={{ marginTop: 10 }} onClick={showModal}>
                    Xem chi tiết
                </Button>
                <Button type="default" block danger style={{ marginTop: 10 }} onClick={() => onDelete(tour.id)}>
                    Xóa Tour
                </Button>
            </Card>

            <Modal
                title={<Title level={3}>Chi tiết Tour</Title>}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Image alt={tour.name} src={tour.image} style={{ width: "100%", borderRadius: 10, marginBottom: 10 }} />
                <p><Text strong>Tên Tour:</Text> {tour.name}</p>
                <p><Text strong>Điểm đến:</Text> {tour.destination}</p>
                <p><Text strong>Giá:</Text> <Text type="danger">{tour.price} USD</Text></p>
                <p><Text strong>Thời gian:</Text> {tour.duration}</p>
                <p><Text strong>Đánh giá:</Text> {tour.rating} ⭐</p>
            </Modal>
        </>
    );
};

export default TourCard;
