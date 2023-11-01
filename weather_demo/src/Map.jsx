import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = ({ lat, lon }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (lat && lon) {
      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([lat, lon], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);
      }

      mapInstance.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapInstance.current.removeLayer(layer);
        }
      });
      L.marker([lat, lon]).addTo(mapInstance.current);
    }
  }, [lat, lon]);

  return <div ref={mapRef} style={{ height: '400px' }} />;
};

export default Map;