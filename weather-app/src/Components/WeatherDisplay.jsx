
function WeatherDisplay({weather, loading, error}){

    if(error) return (<p>Error: {error}</p>);
    if(loading) return (<p>Loading...</p>);
    if(!weather) return (<p>No weather data</p>);

    return(
    <div>
        <h2>{weather.name}</h2>
        <p>溫度: {Math.round(weather.main.temp - 273.15)}°C </p>
        <p>天氣: {weather.weather[0].description}</p>
        <p>濕度: {weather.main.humidity}%</p>
    </div>
    )
}

export default WeatherDisplay;