import React from 'react'

const SummonerSpell = (props) => {
    return(
        <div className = "summonerSpells">
            <img className = "summonerSpell" src = {props.imageLink1} alt = "loading"/>
            <img style = {{top: '30px',right: '30px'}}className = "summonerSpell" src = {props.imageLink2} alt = "loading"/>
        </div>
    )
}

export default SummonerSpell