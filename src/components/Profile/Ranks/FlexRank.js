import React from 'react'
import Image from '../../Image'
import { getRankPic } from '../../../RiotAPI'

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
        flexRank = props.rankData[1].tier + " " + props.rankData[1].rank + " " + props.rankData[1].leaguePoints
        flexRankPic = getRankPic(props.rankData[1].tier)
    }
    return(
        <div>
            Flex5x5 Rank: <Image imageLink = {flexRankPic} />{flexRank}
        </div>
    )
}

export default FlexRank