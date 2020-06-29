import React from 'react'
import MapDot from './MapDot'

const MapFrameInterval = props => {
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }
    return(
        <g>
            {props.events.map(event => (
                <g key={getUniqueKey()}>
                    <MapDot {...event} playerBios={props.playerBios}/>
                </g>
            ))}
        </g> 
    )
}

export default MapFrameInterval

/*
<MapDot {...props.events[key]} />
{props.events.map(event => (
                <div key={event.key}>
                    <MapDot {...event}/>
                </div>
            ))}


            if (props.events.length > 0) {
        console.log("FART: ",props.events)
        for (var key in props.events) {
            console.log("pee",props.events[key])
            if (props.events[key].type === "CHAMPION_KILL") {
                console.log( "THIS WAS HITTTTT", props.events[key])
                return <g><circle cx="0" cy="0" r="5" fill="red" style={{backgroundColor:"red"}}></circle></g>
            } else if (props.events[key] == props.events[props.events.length-1]) {
                return null
            } else {continue}
            
        }
    } else {
        return null
    }
*/