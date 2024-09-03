import './App.css'
import Map from './Map';
import DateTime from './DateTime';
// DateContext
function App() {

  return (
    <>
      <h1>heidiware picker</h1>

      <div className="Map">
        <Map />
      </div>

      <div className="timepicker">
        <DateTime />
      </div>
    </>
  )
}

export default App
