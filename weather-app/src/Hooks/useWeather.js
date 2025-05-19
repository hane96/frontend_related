
import { useState, useEffect, useRef } from "react";

const useWeather = (location, coords) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const fetchWeatherData = async () => {
            if (!location && !coords) 
            {
                setWeather(null);
                return;
            }

            setLoading(true);
            try {
                const API_key = "b481b6e55144baa59f5613f511c0085e";
                const url = coords
                    ? `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_key}`
                    : `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`;

                console.log("api request");
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    setWeather(data);
                    setError(null);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Network error");
            } finally {
                setLoading(false);
            }
        };
        //fetchWeatherData(); 

        timeoutRef.current = setTimeout(() => { 
            //settimeout不能用在asyn function 所以前面的fetchWeatherData要包裝成箭頭函數
            fetchWeatherData(); 
        }, 500);

        return () => clearTimeout(timeoutRef.current); //cleanup
    }, [location, coords]);

    return { weather, loading, error };
};

export default useWeather;


