import React from 'react'

const ExpandedObjectives = props => {
    console.log("OBJECTIVES: ", props.gameData.teams[0])
    return (
        <div>
            Blue Team: Baron: {props.gameData.teams[0].baronKills},
            Dragon: {props.gameData.teams[0].dragonKills},
            Towers: {props.gameData.teams[0].towerKills}  |||  Red Team: Baron: {props.gameData.teams[1].baronKills},
            Dragon: {props.gameData.teams[1].dragonKills},
            Towers: {props.gameData.teams[1].towerKills}
            
        </div>
    )
}

export default ExpandedObjectives