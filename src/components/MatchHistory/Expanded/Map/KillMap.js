import React from 'react'
import { getMapImage } from '../../../../RiotAPI'
import MapFrameInterval from './MapFrameInterval'


const KillMap = props => {
    console.log("KILLMAP PROPS: ", props)
    console.log(props.mapId)
    
    return(
        <svg width="289" height="289">
            <h4>Blue = Blue Side, Red = Red Side</h4>
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