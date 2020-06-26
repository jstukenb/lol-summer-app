import React from 'react'

const MapDot = props => {
    var d3 = require('d3')
    let color = ""
    if (props.type === "CHAMPION_KILL") {
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
            <circle fill={color}cx={x} cy={y} r="5"></circle>
        )
    } else {
        return(
            null
        )
    }
}

export default MapDot