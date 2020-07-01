import React, { useState, useEffect } from 'react'
import FrameInterval from './FrameInterval'

const MatchTimeline = props => {
    console.log("TIMELINE: ", props)
    return(
        <div style={{height: "200px", overflowY: 'auto'}}>
           
            
            {props.gameTimeline.frames.map(frames => (
                <div key = {frames.timestamp}>
                    <FrameInterval {...frames} playerBios={props.playerBios} showSkills={document.getElementById("showSkills")}/>
                </div>
            ))}
        </div>
    )
}

export default MatchTimeline

/*
<form>
                <input defaultChecked type="checkbox" id="showKills" name="showKills" value ="showKills"></input>
                <label htmlFor="showKills">Kills</label>
                <input defaultChecked type="checkbox" id="showWards" name="showWards" value ="showWards"></input>
                <label htmlFor="showWards">Wards</label>
                <input defaultChecked type="checkbox" id="showBuildings" name="showBuildings" value ="showBuildings"></input>
                <label htmlFor="showBuildings">Buildings Destroyed</label>
                <input defaultChecked type="checkbox" id="showEliteMonsters" name="showEliteMonsters" value ="showEliteMonsters" onClick={() => console.log("cpock")}></input>
                <label htmlFor="showEliteMonsters">Elite Monster Kills</label>
                <input type="checkbox" id="showSkills" name="showSkills" value ="showSkills" onClick={(poop) => console.log(poop.value)}></input>
                <label htmlFor="showSkills">Skill Level Ups</label>
            </form>

showSkills={document.getElementById("showSkills").checked}

*/