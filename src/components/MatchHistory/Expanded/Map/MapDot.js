import React from 'react'

const MapDot = props => {

    let map11 = {
        min: {
            x: 0,
            y: 0
        },
        max: {
            x: 14820,
            y: 14881
        }
    }


    //d3.scale.linear().domain([e.min.x, e.max.x]).range([0, g.mapWidth])
    //whatever scale linear does
    //let xScale = .domain[map11.min.x, map11.max.x].range([0, 289])
    //let yScale = .domain([mapp11.min.y, map11.max.y]).range([289, 0])



    if (props.type === "CHAMPION_KILL") {
        console.log("MAP DOT PROPS: ", props)
        // map is 15000x15000
        let x = props.position.x/51.2802768166
        let y = props.position.y/51.2802768166
        return(
            <circle fill="red"cx={x} cy={y} r="5"></circle>
        )
    } else {
        return(
            null
        )
    }
}

export default MapDot