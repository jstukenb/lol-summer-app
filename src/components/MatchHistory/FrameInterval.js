import React from 'react'
import Event from './Expanded/Event'

const FrameInterval = props => {
    return(
        <div>
            {props.events.map(event => (
                <div key={event.key}>
                    <Event {...event} playerBios={props.playerBios} showSkills = {props.showSkills}/>
                </div>
            ))}
        </div>
    )
}

export default FrameInterval