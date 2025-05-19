
function Location({location, coords}) {

    if(coords) {
        return <p>location: {coords.lat}, {coords.lon}</p>
    }
    else if(location) {
        return <p>location: {location}</p>
    }
    else {
        return <p>No location selected</p>
    }
}

export default Location;