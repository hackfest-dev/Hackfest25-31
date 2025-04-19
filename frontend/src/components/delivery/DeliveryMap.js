import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DeliveryMap = ({ lat, lng }) => (
  <MapContainer center={[lat, lng]} zoom={13} style={{ height: "400px" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[lat, lng]}>
      <Popup>Current Delivery Location</Popup>
    </Marker>
  </MapContainer>
);

export default DeliveryMap;
