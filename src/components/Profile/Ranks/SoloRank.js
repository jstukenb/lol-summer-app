import React from 'react'
import { getRankPic } from '../../../RiotAPI'
import '../../app.css'

const SoloRank = (props) => {
    let soloRank = ""
    let soloRankPic = ""

    function getCDragonPath(tier) {
        switch (tier) {
            case "IRON":
                return "/01_iron/images/iron_face.png"
            case "BRONZE":
                return "/02_bronze/images/bronze_face.png"
            case "SILVER":
                return "/03_silver/images/silver_face.png"
            case "GOLD":
                return "/04_gold/images/gold_face.png"
            case "PLATINUM": 
                return "/05_platinum/images/platinum_face.png"
            case "DIAMOND": 
                return "/06_diamond/images/diamond_face.png"
            case "MASTER":
                return "/07_master/images/master_face.png"
            case "GRANDMASTER":
                return "/08_grandmaster/images/grandmaster_face.png"
            case "CHALLENGER":
                return "/09_challenger/images/challenger_face.png"
            default:
                return "poop"
        }
    }

    if (props.rankData.length === 1) {
        if (props.rankData[0].queueType === "RANKED_SOLO_5x5") {
            soloRank = props.rankData[0].tier + " " + props.rankData[0].rank + " " + props.rankData[0].leaguePoints
            soloRankPic = getRankPic(getCDragonPath(props.rankData[0].tier))
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
            soloRankPic = getRankPic(getCDragonPath(props.rankData[0].tier))
        } else {
            soloRank = props.rankData[1].tier + " " + props.rankData[1].rank + " " + props.rankData[1].leaguePoints
            soloRankPic = getRankPic(getCDragonPath(props.rankData[1].tier))
        }
    }
    return(
        <div className = "soloRank">
            <img className = "soloRankImage" src = {soloRankPic} alt = "loading" height='57px' width='50px'/>Solo Rank: {soloRank}
        </div>
    )
}

export default SoloRank