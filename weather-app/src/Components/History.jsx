import HistoryItem from "./HistoryItem";
import { useEffect, useCallback } from "react";

function History({history, setHistory, location, coords, weather}) {
    if(!weather) return null;

    const addHistory = useCallback(() => {
    const item = {
        location: location || `${coords.lat}, ${coords.lon}`,
        temp: Math.round(weather.main.temp - 273.15),
        description: weather.weather[0].description,
    };

    if (history.length === 0) {
        setHistory((prev) => [...prev, item]);
        return;
    }

    //有時候history會不知道為什麼連續寫兩次一樣的資料 所以這邊多檢查重複
    const last = history.at(-1);
    
    const isDuplicate = 
        last.location === item.location &&
        last.temp === item.temp &&
        last.description === item.description;
    
    
    if (!isDuplicate) {
        setHistory((prev) => [...prev, item]);
    }
    });


    useEffect(()=>{
        if(location||coords) addHistory();
    }, 
    [weather])

    return (
        <div>
            <h3>History</h3>
            <ul>
                {history.map((item, index)=>{ 
                    return <HistoryItem item={item} key={index}/>
                })}
            </ul>
        </div>
    )

}

export default History;