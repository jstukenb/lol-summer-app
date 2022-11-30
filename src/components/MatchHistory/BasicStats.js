import React from 'react'

const BasicStats = props => {
    let kills = props.gameData.info.participants[props.participantId].kills
    let deaths = props.gameData.info.participants[props.participantId].deaths
    let assists = props.gameData.info.participants[props.participantId].assists
    let KDA = kills + "/" + deaths + "/" + assists
    let KDANumber = (kills + assists) / deaths
    let CS = props.gameData.info.participants[props.participantId].totalMinionsKilled + props.gameData.info.participants[props.participantId].neutralMinionsKilled
    if (KDANumber === Infinity) {
        KDANumber = "PERFECT"
    } else {
        KDANumber = KDANumber.toFixed(2)
    }
    return(
        <div className = "basicStatsShell">
            {KDA} KDA: {KDANumber} CS: {CS}
        </div>
    )
}

export default BasicStats