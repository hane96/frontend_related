
import Location from "./Components/Location"
import WeatherDisplay from "./Components/WeatherDisplay"
import {useState} from "react"
import useWeather from "./Hooks/useWeather";
import LocationSelector from "./Components/LocationSelector";
import History from "./Components/History";
import "./index.css";

function App() {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);

  const {weather, loading, error} = useWeather(location, coords);
  const [history, setHistory] = useState([]);

  return (
    <div>
       <LocationSelector
          onLocationChange = {setLocation}
          onCoordsChange = {setCoords}
          onHistory = {setHistory}
       />
       <Location
          location = {location}
          coords = {coords}
       />
       <WeatherDisplay
          weather = {weather}
          loading = {loading}
          error = {error}
       />
       <History 
          history = {history} 
          setHistory = {setHistory}
          location = {location}
          coords = {coords}
          weather = {weather}
       />
    </div>
  )
}

export default App
