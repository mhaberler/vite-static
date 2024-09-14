import './App.css'
import Map from './Map';
import DateTime from './DateTime';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { LatLng } from 'leaflet';
import { fetchData, fetchOpenMeteo } from './fetch';
// import { fetchWeatherApi } from 'openmeteo';


const levels = [
  "1000hPa",
  "975hPa",
  "950hPa",
  "925hPa",
  "900hPa",
  "850hPa",
  "800hPa",
  "700hPa",
  "600hPa",
  "500hPa",
  // "400hPa",
  // "300hPa",
  // "250hPa",
  // "200hPa",
  // "150hPa",
  // "100hPa",
  // "70hPa",
  // "50hPa",
  // "30hPa"
]
const values = [
  "temperature",
  "relative_humidity",
  "cloud_cover",
  "wind_speed",
  "wind_direction",
  // "geopotential_height"
]

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [position, setPosition] = useState<LatLng>(new LatLng(47, 15));
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    if (position && selectedDate) {

      const params = {
        "timezone": "auto",
        "forecast_days": 1,
        "forecast_hours": 6,
        "latitude": position.lat,
        "longitude": position.lng,
         "hourly": values.map((v) => levels.map((l) => v + "_" + l)).flat().join(',')
      };
      const plist = new URLSearchParams(params).toString();
      console.log(plist);
      const url = "https://api.open-meteo.com/v1/forecast?" + plist // + "&hourly=" + values.map((v) => levels.map((l) => v + "_" + l)).flat().join(',')
      // const url  = `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&current=surface_pressure,temperature_2m,wind_speed_10m,weather_code,cloud_cover,relative_humidity_2m,is_day&hourly=temperature_2m&forecast_days=1`;


      fetchData(
        url,
        setWeatherData
      );

      // fetchOpenMeteo(
      //   url,
      //   params,
      //   setWeatherData
      // );
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
          // weatherData !== undefined ? weatherData?.hourly?.temperature_2m.map((_, key) =>
          //   <div key={key}>
          //     {key}h: {weatherData?.hourly.temperature_2m[key]}°
          //   </div>
          // ) : 'None'
        }
      </div>

    </>
  )
}

export default App

