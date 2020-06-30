import React, { useState } from 'react'
import HoverCardMap from '../../../HoverCards/HoverCardMap'
import {getChampionPic} from '../../../../RiotAPI'

const MapDot = props => {
    const [isShown, setIsShown] = useState(false)
    function handleMouseOver() {
        setIsShown(true)
    }
    function handleMouseExit() {
        setIsShown(false)
    }
    var d3 = require('d3')
    let color = ""
    if (props.type === "CHAMPION_KILL" && props.killerId !== 0) {
        if (props.playerBios[props.killerId-1][2] === 100) {
            color = "blue";
        } else {
            color = "red"
        }
        var xScale = d3.scaleLinear()
            .domain([0, 14820])
            .range([0, 289])
        var yScale = d3.scaleLinear()
            .domain([0, 14881])
            .range([289, 0])

        let x = xScale(props.position.x)
        let y = yScale(props.position.y)
        return(
            <g>
                <circle fill={color}cx={x} cy={y} r="5" onMouseEnter={() => handleMouseOver()} onMouseLeave={() => handleMouseExit()}></circle>
                {isShown && <HoverCardMap killerImage={getChampionPic(props.playerBios[props.killerId-1][3])} victimImage={getChampionPic(props.playerBios[props.victimId-1][3])}/>}
            </g>
        )
    } else {
        return(
            null
        )
    }
}

export default MapDot

/*

{isShown && <rect style={{fill:"green"}} height="50px" width="50px" x='100px' y='100px'/>}


*/