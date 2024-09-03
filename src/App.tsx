import { useState } from 'react'
import './App.css'
import Map from './Map';
import DateTime  from './DateTime';
// DateContext
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>react-leaflet-pwa</h1> */}

      <div className="Map">
        <Map />
      </div>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
      <div className="timepicker">
      <DateTime />
      </div>


    </>
  )
}

export default App
