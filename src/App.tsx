import { useState } from 'react';
import './App.css'
import Map from './Map';
import DateTime from './DateTime';
import DateTimeContext from './DateTimeContext';

// import { LatLng } from 'leaflet';

// const PositionContext = createContext<LatLng|undefined>();
// ;export  PositionContext;

function App() {

  const [dateTime, setDateTime] = useState<Date>(new Date());

  return (
    <DateTimeContext.Provider value={{ dateTime, setDateTime }}>

    <>
      <h1>heidiware picker</h1>

      <div className="Map">
        <Map />
      </div>

      <div className="timepicker">
        <DateTime />
      </div>
    </>
    </DateTimeContext.Provider>

  )
}

export default App
