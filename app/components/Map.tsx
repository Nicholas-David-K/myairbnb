'use client';

import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

type Props = {
    center?: number[];
};

const Map = ({ center }: Props) => {
    return (
        <MapContainer
            center={(center as L.LatLngExpression) || [0.0236, 37.9062]}
            zoom={center ? 7 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {center && <Marker position={center as L.LatLngExpression} />}
        </MapContainer>
    );
};

export default Map;
