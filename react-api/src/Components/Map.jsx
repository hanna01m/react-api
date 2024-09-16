import React, { useEffect, useState } from "react";
import Axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const icon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
});

export default function Map() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    Axios.get("https://polisen.se/api/events").then((response) => {
      const data = response.data;

      const markers = data.map((marker) => {
        const [lat, lon] = marker.location.gps.split(",").map(Number);
        return {
          id: marker.id,
          position: [lat, lon],
          popUp: marker.name,
        };
      });
      setMarkers(markers);
    });
  }, []);

  return (
    <div className="map-section">
      <MapContainer
        center={[59.325, 18.05]}
        zoom={5}
        className="leaflet-container"
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((marker, index) => (
          <Marker key={marker.id} position={marker.position} icon={icon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>{" "}
    </div>
  );
}
