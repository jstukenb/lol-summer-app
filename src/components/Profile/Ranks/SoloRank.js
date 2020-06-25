import React from 'react'
import { getRankPic } from '../../../RiotAPI'
import '../../app.css'

const SoloRank = (props) => {
    let soloRank = ""
    let soloRankPic = ""

    if (props.rankData.length === 1) {
        if (props.rankData[0].queueType === "RANKED_SOLO_5x5") {
            soloRank = props.rankData[0].tier + " " + props.rankData[0].rank + " " + props.rankData[0].leaguePoints
            soloRankPic = getRankPic(props.rankData[0].tier)
        } else {
            soloRank = "N/A"
            soloRankPic = getRankPic("0")
        }
    } else if (props.rankData.length === 0) {
        soloRank = "N/A"
        soloRankPic = getRankPic("0")
    } else {
        if (props.rankData[0].queueType === "RANKED_SOLO_5x5") {
            soloRank = props.rankData[0].tier + " " + props.rankData[0].rank + " " + props.rankData[0].leaguePoints
            soloRankPic = getRankPic(props.rankData[0].tier)
        } else {
            soloRank = props.rankData[1].tier + " " + props.rankData[1].rank + " " + props.rankData[1].leaguePoints
            soloRankPic = getRankPic(props.rankData[1].tier) 
        }
    }
    return(
        <div className = "soloRank">
            <img className = "soloRankImage" src = {soloRankPic} alt = "loading" height='57px' width='50px'/>Solo Rank: {soloRank}
        </div>
    )
}

export default SoloRank