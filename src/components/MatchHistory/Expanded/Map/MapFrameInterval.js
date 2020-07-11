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


.filter
*/