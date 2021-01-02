import React from 'react'
import {getScoreboardImage} from '../../../../RiotAPI'
import './Scoreboard.css'

const ExpandedObjectives = props => {
    //console.log("OBJECTIVES: ", props.gameData.teams[0])
    return (
        <div>
            <img className="scoreboardImage" src={getScoreboardImage("baron-100")} alt="loading"></img>: {props.gameData.teams[0].baronKills}
            <img className="scoreboardImage" src={getScoreboardImage("dragon-100")} alt="loading"></img>: {props.gameData.teams[0].dragonKills}
            <img className="scoreboardImage" src={getScoreboardImage("tower-100")} alt="loading"></img>: {props.gameData.teams[0].towerKills}  |||  <img className="scoreboardImage" src={getScoreboardImage("baron-200")} alt="loading"></img> : {props.gameData.teams[1].baronKills}
            <img className="scoreboardImage"src={getScoreboardImage("dragon-200")} alt="loading"></img>: {props.gameData.teams[1].dragonKills}
            <img className="scoreboardImage" src={getScoreboardImage("tower-200")} alt="loading"></img>: {props.gameData.teams[1].towerKills}
            
        </div>
    )
}

export default ExpandedObjectives