import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LocateControl } from '@turtlesocks/react-leaflet.locatecontrol'
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import { useMapEvent } from 'react-leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';


interface MapProps {
  position: LatLng;
  setPosition: (position: LatLng) => void; // Function to update the position
}

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ setPosition }: any) {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);

  const map = useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng;
    console.log(lat + ', ' + lng);
    map.setView(e.latlng, map.getZoom())
    setMarkerPosition(e.latlng);
    setPosition(e.latlng);
  })

  useMapEvent('locationfound', (e) => {
    const { lat, lng } = e.latlng;
    console.log('locationfound', lat + ', ' + lng);
    setMarkerPosition(e.latlng);
    setPosition(e.latlng);
  })

  return markerPosition === null ? null : (
    <Marker position={markerPosition}></Marker>
  );
}


const Map: React.FC<MapProps> = ({ position, setPosition }) => {
  return (
    <MapContainer className="mapcont" center={position} zoom={7} >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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


