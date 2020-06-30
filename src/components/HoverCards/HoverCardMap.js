import React from 'react'

const HoverCardMap = props => {
    //console.log(props)
    return(
        <g>
            <image href={props.killerImage} x='400px' y='75px'/> <text x='545px' y='50%'>KILLED</text> <image href={props.victimImage} x='625px' y='75px'/>
        </g>
    )
}

export default HoverCardMap