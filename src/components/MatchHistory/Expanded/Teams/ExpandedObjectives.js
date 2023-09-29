import React from 'react'
import {getScoreboardImage} from '../../../../RiotAPI'
import './Scoreboard.css'

const ExpandedObjectives = props => {
    //console.log("OBJECTIVES: ", props.gameData.teams[0])
    return (
        <div>
            <img className="scoreboardImage" src={getScoreboardImage("baron-100")} alt="loading"></img>: {props.gameData.info.teams[0].objectives.baron.kills}
            <img className="scoreboardImage" src={getScoreboardImage("dragon-100")} alt="loading"></img>: {props.gameData.info.teams[0].objectives.dragon.kills}
            <img className="scoreboardImage" src={getScoreboardImage("tower-100")} alt="loading"></img>: {props.gameData.info.teams[0].objectives.tower.kills}  |||  <img className="scoreboardImage" src={getScoreboardImage("baron-200")} alt="loading"></img> : {props.gameData.info.teams[1].objectives.baron.kills}
            <img className="scoreboardImage"src={getScoreboardImage("dragon-200")} alt="loading"></img>: {props.gameData.info.teams[1].objectives.dragon.kills}
            <img className="scoreboardImage" src={getScoreboardImage("tower-200")} alt="loading"></img>: {props.gameData.info.teams[1].objectives.tower.kills}
            
        </div>
    )
}

export default ExpandedObjectives