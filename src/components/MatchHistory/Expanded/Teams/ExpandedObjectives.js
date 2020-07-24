import React from 'react'
import {getScoreboardImage} from '../../../../RiotAPI'

const ExpandedObjectives = props => {
    console.log("OBJECTIVES: ", props.gameData.teams[0])
    return (
        <div>
            <img src={getScoreboardImage("icon-baron-b")} alt="loading"></img>: {props.gameData.teams[0].baronKills}
            <img src={getScoreboardImage("icon-dragon-b")} alt="loading"></img>: {props.gameData.teams[0].dragonKills}
            <img src={getScoreboardImage("icon-tower-b")} alt="loading"></img>: {props.gameData.teams[0].towerKills}  |||  <img src={getScoreboardImage("icon-baron-r")} alt="loading"></img> : {props.gameData.teams[1].baronKills}
            <img src={getScoreboardImage("icon-dragon-r")} alt="loading"></img>: {props.gameData.teams[1].dragonKills}
            <img src={getScoreboardImage("icon-tower-r")} alt="loading"></img>: {props.gameData.teams[1].towerKills}
            
        </div>
    )
}

export default ExpandedObjectives