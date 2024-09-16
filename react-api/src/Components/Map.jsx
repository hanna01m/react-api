import React from "react";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <div className="map-section">
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        className="leaflet-container"
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>{" "}
    </div>
  );
}
