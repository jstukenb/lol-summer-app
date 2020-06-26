import React from 'react'
import {getChampionPic} from '../../../RiotAPI'

const Event = props => {
    let time = props.timestamp / 1000
    if (time % 60 !== 0) {
        let seconds = "" + Math.floor(time % 60)
        if (seconds < 10 ) {
            seconds = "0"+seconds
        }
        time = time / 60
        time = Math.floor(time)
        time = time + ":" + seconds
    } else {
        time = time / 60
    }

    const handleEvent = () => {
        switch(props.type) {
            case 'CHAMPION_KILL':
                return (
                    <div className = "champKill">
                        Time: {time} <img height = "20px" width = "20px"style = {{display: "inLineFlex"}}alt = "loading" src = {getChampionPic(props.playerBios[props.killerId - 1][1])} ></img> {props.playerBios[props.killerId - 1][0]} killed <img height = "20px" width = "20px"style = {{display: "inLineFlex"}}alt = "loading" src = {getChampionPic(props.playerBios[props.victimId - 1][1])} ></img> {props.playerBios[props.victimId - 1][0]}
                    </div>
                )
            case 'WARD_PLACED':
                if (props.wardType !== "UNDEFINED") {
                    return (
                        <div className = "wardPlace">
                            Time: {time} <img height = "20px" width = "20px"style = {{display: "inLineFlex"}}alt = "loading" src = {getChampionPic(props.playerBios[props.creatorId - 1][1])}></img> {props.playerBios[props.creatorId - 1][0]} placed a {props.wardType}
                        </div>
                    )
                } else {
                    return(<div></div>)
                }
                
            case 'WARD_KILL':
                return (
                    <div>
                        Time: {time} <img height = "20px" width = "20px"style = {{display: "inLineFlex"}}alt = "loading" src = {getChampionPic(props.playerBios[props.killerId - 1][1])} ></img> {props.playerBios[props.killerId-1][0]} killed a {props.wardType}
                    </div>
                )
            case 'BUILDING_KILL':
                if (props.killerId === 0) {
                    return<div className = "buildingKill">Time: {time} A minion killed a {props.towerType} in {props.laneType}</div>
                } else {
                    return (
                        <div className = "buildingKill">
                            Time: {time} <img height="20px"width="20px"style={{display:"inLineFlex"}}alt="loading"src={getChampionPic(props.playerBios[props.killerId-1][1])}></img> {props.playerBios[props.killerId-1][0]} destroyed a {props.towerType} in {props.laneType}
                        </div>
                    )
                }
     
            case 'ELITE_MONSTER_KILL':
                //<img height="20px"width="20px"style={{display:"inLineFlex"}}alt="loading"src={getChampionPic(props.playerBios[props.participantId-1][1])}></img>
                if (props.killerId === 0) {
                    return(<div></div>)
                } else {
                    return (
                        <div className = "eliteMonsterKill">
                            Time: {time} <img height="20px"width="20px"style={{display:"inLineFlex"}}alt="loading"src={getChampionPic(props.playerBios[props.killerId-1][1])}></img> {props.playerBios[props.killerId-1][0]} killed {props.monsterSubType}
                        </div>
                    )
                }
                
            case 'ITEM_PURCHASED':
                return (
                    <div>
                        
                    </div>
                )
            case 'ITEM_DESTROYED':
                return (
                    <div>
                        
                    </div>
                )
            case 'ITEM_SOLD':
                return (
                    <div>
                        
                    </div>
                )
            case 'ITEM_UNDO':
                return (
                    <div>
                        
                    </div>
                )
            case 'SKILL_LEVEL_UP':
                if (props.showSkills) {
                    return (
                        <div className = "skillLevelUp">
                            Time: {time} <img height="20px"width="20px"style={{display:"inLineFlex"}}alt="loading"src={getChampionPic(props.playerBios[props.participantId-1][1])}></img> levelled up skill slot {props.skillSlot}
                        </div>
                    )
                } else {
                    return(<div></div>)
                }
                
            case 'ASCENDED_EVENT':
                return (
                    <div>
                        Time: {time}
                    </div>
                )
            case 'CAPTURE_POINT':
                return (
                    <div>
                        Time: {time}
                    </div>
                )
            case 'PORO_KING_SUMMON':
                return (
                    <div>
                        Time: {time}
                    </div>
                )
            default:
                return (
                    <div>
                        UH OHHHH SOMETHIGN WENT WRONG
                    </div>
                )
                
        }
    }
    let eventResponse = handleEvent()
    return(
        <div>
            {eventResponse}
        </div>
    )
}

export default Event

/*


src = {getChampionPic(props.playerBios[props.killerId - 1][1])}


*/