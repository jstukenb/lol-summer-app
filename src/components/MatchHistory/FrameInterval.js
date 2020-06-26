import React from 'react'
import Event from './Expanded/Event'

const FrameInterval = props => {
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }
    return(
        <div>
            {props.events.map(event => (
                <div key={getUniqueKey()}>
                    <Event {...event} playerBios={props.playerBios} showSkills = {props.showSkills}/>
                </div>
            ))}
        </div>
    )
}

export default FrameInterval

/*
key={event.key}
*/