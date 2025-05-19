
import { useState, useEffect } from "react";

const useWeather = (location, coords) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            async function fetchWeatherData() {
                if(!location && !coords) return; //no data

                setLoading(true); //start loading
                try{
                    //有coords就優先用coords
                    const API_key = "b481b6e55144baa59f5613f511c0085e";
                    const url = coords 
                    ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`
                    : `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_key}`;
                    
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    if(response.ok){
                        setWeather(data);
                        setError(null);
                    }
                    else
                    {
                        setError(data.message);
                    }

                }
                catch (err){
                    setError("Network error")
                }
                finally{
                    setLoading(false);
                }
            }

            fetchWeatherData();
                
        }  
        , [location, coords]
    )

    return {weather, loading, error};

}


export default useWeather;







