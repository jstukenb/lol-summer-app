import React from 'react'

const BasicStats = props => {
    let kills = props.gameData.participants[props.participantId].stats.kills
    let deaths = props.gameData.participants[props.participantId].stats.deaths
    let assists = props.gameData.participants[props.participantId].stats.assists
    let KDA = kills + "/" + deaths + "/" + assists
    let KDANumber = (kills + assists) / deaths

    if (KDANumber === Infinity) {
        KDANumber = "PERFECT"
    } else {
        KDANumber = KDANumber.toFixed(2)
    }
    return(
        <div className = "basicStatsShell">
            {KDA} KDA: {KDANumber}
        </div>
    )
}

export default BasicStats