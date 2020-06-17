import React from 'react'
import Image from '../../Image'
import { getRankPic } from '../../../RiotAPI'

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
        soloRank = props.rankData[0].tier + " " + props.rankData[0].rank + " " + props.rankData[0].leaguePoints
        soloRankPic = getRankPic(props.rankData[0].tier)
    }
    return(
        <div>
            Solo/Duo Rank: <Image imageLink = {soloRankPic}/>{soloRank}
        </div>
    )
}

export default SoloRank