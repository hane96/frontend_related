
function HistoryItem({item}) {
    return (
        <li>
            {item.location} {item.temp}°C {item.description}
        </li>
    )
}

export default HistoryItem;