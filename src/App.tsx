import './App.css'
import Map from './Map';
import DateTime from './DateTime';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { LatLng } from 'leaflet';
import { fetchData } from './fetch';



// DateContext
function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [position, setPosition] = useState<LatLng>(new LatLng(47, 15));
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    if (position) {
      fetchData(
        `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&current=surface_pressure,temperature_2m,wind_speed_10m,weather_code,cloud_cover,relative_humidity_2m,is_day&hourly=temperature_2m&forecast_days=1`,
        setWeatherData
      );
      console.log(weatherData);
    }

  }, [position, selectedDate]);

  return (
    <>
      <h1>heidiware picker</h1>
      <div>
        Selected Date & Time: {selectedDate ? format(selectedDate, 'MMMM d, yyyy h:mm aa') : 'None'}
      </div>
      <div>
        Selected Position: {JSON.stringify(position)}
      </div>
      <div className="Map">
        <Map position={position} setPosition={setPosition} />
      </div>

      <div className="timepicker">
        <DateTime selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className="forecast">
        {
          weatherData !== undefined ? weatherData?.hourly?.temperature_2m.map((_, key) =>
            <div key={key}>
              {key}h: {weatherData?.hourly.temperature_2m[key]}°
            </div>
          ) : 'None'
        }
      </div>

    </>
  )
}

export default App

