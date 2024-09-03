import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LocateControl } from '@turtlesocks/react-leaflet.locatecontrol'
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import { useMapEvent } from 'react-leaflet';
import { LatLng } from 'leaflet';


function LocationMarker({ setPosition }: any) {
  const [position, setMarkerPosition] = useState<LatLng | null>(null);

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

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}


const Map = () => {
  // @ts-ignore
  const [position, setPosition] = useState(null);
  return (
    <MapContainer className="mapcont" center={[47, 15]} zoom={13} >
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


