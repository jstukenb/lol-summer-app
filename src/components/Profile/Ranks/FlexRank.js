import React from 'react'
import { getRankPic } from '../../../RiotAPI'
import '../../app.css'

const FlexRank = (props) => {
    let flexRank = ""
    let flexRankPic = ""

    if (props.rankData.length === 1) {
        if (props.rankData[0].queueType === "RANKED_SOLO_5x5") {
            flexRank = "N/A"
            flexRankPic = getRankPic("0") 
        } else {
            flexRank = props.rankData[0].tier + " " + props.rankData[0].rank + " " + props.rankData[0].leaguePoints
            flexRankPic = getRankPic(props.rankData[0].tier)
        }
    } else if (props.rankData.length === 0) {
        flexRank = "N/A"
        flexRankPic = getRankPic("0")
    } else {
        if (props.rankData[0].queueType === "RANKED_FLEX_SR") {
            flexRank = props.rankData[0].tier + " " + props.rankData[0].rank + " " + props.rankData[0].leaguePoints
            flexRankPic = getRankPic(props.rankData[0].tier)
        } else {
            flexRank = props.rankData[1].tier + " " + props.rankData[1].rank + " " + props.rankData[1].leaguePoints
            flexRankPic = getRankPic(props.rankData[1].tier) 
        }
    }
    return(
        <div className = "flexRank">
            <img className = "flexRankImage" src = {flexRankPic} alt = "loading" height='57px' width='50px'/>Flex 5x5 Rank: {flexRank}
        </div>
    )
}

export default FlexRank