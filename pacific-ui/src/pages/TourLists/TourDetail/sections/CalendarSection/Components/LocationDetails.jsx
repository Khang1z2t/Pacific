import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import getCoordinates from '~/config/MapConfig/CoordinateConfig';

// Fix icon không hiển thị
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const LocationDetails = () => {
    const position = [16.047079, 108.206230]; // Đà Nẵng
    const [address, setAddress] = useState("114/188/2 Tô Ngọc Vân, Gò Vấp, TP.HCM");
    useEffect(() => {
        getCoordinates(address).then(r => console.log(r));
    }, []);
    return (
        <div className="w-full h-96">
            <h2 className="text-2xl font-semibold mb-4">Chi tiết địa điểm</h2>
            <p className="text-lg font-semibold mb-4">Địa chỉ: {address}</p>
            <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>Vị trí đã chọn: Hồ Chí Minh</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};
