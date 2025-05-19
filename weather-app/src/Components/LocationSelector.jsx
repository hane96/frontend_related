import { useState } from "react";



function LocationSelector({onLocationChange, onCoordsChange}) {

    const [input, setInput] = useState("");

    const handleSubmit =  (e) => {
        e.preventDefault();
        onLocationChange(input);
    }

    const handleLocationReset = () => {
        onLocationChange(null);
        setInput("");
    }

    const handleCoords = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                onCoordsChange({lat: latitude, lon: longitude});
            },
            (error) => {
                console.error(error);
            }
            
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="enter city name" 
                    type = "text"
                    value = {input}
                    onChange={(e)=>{setInput(e.target.value)}}
                />
                <button type="submit">Search</button>
                <button type="button" onClick={handleCoords}>use my location</button>
                <button type="button" onClick={handleLocationReset}>reset</button>
            </form>
        </div>
    )
}


export default LocationSelector;