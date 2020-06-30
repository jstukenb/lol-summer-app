import React from 'react'
import { getMapImage } from '../../../../RiotAPI'
import MapFrameInterval from './MapFrameInterval'


const KillMap = props => {
    
    return(
        <svg width="1000" height="289">
            <text>Blue = Blue Side, Red = Red Side</text>
            <image href={getMapImage(props.mapId)} alt="loading" height="289px" width="289px"></image> 
            {props.gameTimeline.frames.map(frames => (
                <g key = {frames.timestamp}>
                    <MapFrameInterval {...frames} playerBios={props.playerBios}/>
                </g>
            ))}
        </svg>
    )
}

export default KillMap


/*
<img src={getMapImage(props.mapId)} alt="loading"></img> 

{props.gameTimeline.frames.map(frames => (
                <div key = {frames.timestamp}>
                    <MapFrameInterval {...frames} playerBios={props.playerBios}/>
                </div>
            ))}

*/