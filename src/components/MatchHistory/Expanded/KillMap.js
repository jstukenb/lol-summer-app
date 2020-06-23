import React from 'react'
import { getMapImage } from '../../../RiotAPI'

const KillMap = props => {
    //console.log("KILLMAP PROPS: ", props)
    console.log(props.mapId)

    return(
        <div>
            <img src={getMapImage(props.mapId)} alt="loading"></img>
        </div>
    )
}

export default KillMap