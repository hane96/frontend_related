
import Location from "./Components/Location"
import WeatherDisplay from "./Components/WeatherDisplay"
import { useEffect, useState, useCallback } from "react"
import useWeather from "./Hooks/useWeather";
import LocationSelector from "./Components/LocationSelector";
import "./index.css";

function App() {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);

  const {weather, loading, error} = useWeather(location, coords);

  return (
    <div>
       <LocationSelector
          onLocationChange = {setLocation}
          onCoordsChange = {setCoords}
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
    </div>
  )
}

export default App
