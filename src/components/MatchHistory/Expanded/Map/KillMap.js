import React from 'react'
import { getMapImage } from '../../../../RiotAPI'
import MapDot from './MapDot'


const KillMap = props => {
    console.log("map: ", props)
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }

    return(
        <svg width="1000" height="289">
            <text>Blue = Blue Side, Red = Red Side</text>
            <image href={getMapImage(props.mapId)} alt="loading" height="289px" width="289px"></image> 
            {props.killTimeline.map(frames => (
                <g key = {getUniqueKey()}>
                    <MapDot {...frames} playerBios={props.playerBios}/>
                </g>
            ))}
        </svg>
    )
}

export default KillMap

