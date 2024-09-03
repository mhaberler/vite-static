import { useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LocateControl } from '@turtlesocks/react-leaflet.locatecontrol'
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import { useMapEvent, useMapEvents } from 'react-leaflet';

const defaultPosition = [47, 15]

function LocationMarker({ setPosition }) {
  const [position, setMarkerPosition] = useState(null);

  const map = useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng;
    console.log(lat + ', ' + lng);
    map.setView(e.latlng, map.getZoom())
    setMarkerPosition(e.latlng);
    setPosition(e.latlng);

  })

  const m = useMapEvent('locationfound', (e) => {
    const { lat, lng } = e.latlng;
    console.log('locationfound', lat + ', ' + lng);
    setMarkerPosition(e.latlng);
    setPosition(e.latlng);
  })

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}


const Map = () => {
  const [position, setPosition] = useState(null);
  return (
    <MapContainer className="mapcont" center={[47, 15]} zoom={13} style={{ height: '40vh', width: '90vw' }}>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={position}></Marker> */}
      <LocateControl metric
        setView='always'
        flyTo={true}
        // keepCurrentZoomLevel={true}
        // returnToPrevBounds={true}
        locateOptions={{ watch: true, enableHighAccuracy: true }}
        position="topright"
      />
      <LocationMarker setPosition={setPosition} />
    </MapContainer>
  );
};

export default Map;


