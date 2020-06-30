import React from 'react'

const HoverCard = props => {
    return(
        <div style={{display: 'box', flexDirection: 'column', position: 'absolute', zIndex: 9, backgroundColor: 'yellow'}}>{props.blurb}</div>
    )
}

export default HoverCard