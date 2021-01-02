import React from 'react'

const BasicGameStats = props => {
    let gameLengthInSeconds = props.gameData.gameDuration
    let gameLength = 0
    if (gameLengthInSeconds % 60 === 0) {
        gameLength = gameLengthInSeconds / 60
    } else {
        gameLength = Math.floor(gameLengthInSeconds / 60)
        gameLength = gameLength + 'm ' + gameLengthInSeconds % 60 + 's'
    }
    return (
        <div className="basicGameStats">
            
            Time: {gameLength}
        </div>
    )


}

export default BasicGameStats