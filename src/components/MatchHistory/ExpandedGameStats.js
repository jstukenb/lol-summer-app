import React from 'react'
import BasicStats from './BasicStats'
import SummonerSpell from './SummonerSpell'
import ItemList from '../Items/ItemList'
import Runes from './Runes'
import { getChampionPic, getSummonerSpellPic } from '../../RiotAPI'

const ExpandedGameStats = props => {
    console.log("EXPANDED POROSP: ", props, "    ", props.participantId)
    let color = ""
    if(props.gameData.participants[props.participantId-1].stats.win) {
        color = "cornflowerblue"
    }
    else {
        color = "crimson"
    }
    let summonerName = props.gameData.participantIdentities[props.participantId-1].player.summonerName
    let item0 = props.gameData.participants[props.participantId - 1].stats.item0
    let item1 = props.gameData.participants[props.participantId - 1].stats.item1
    let item2 = props.gameData.participants[props.participantId - 1].stats.item2
    let item3 = props.gameData.participants[props.participantId - 1].stats.item3
    let item4 = props.gameData.participants[props.participantId - 1].stats.item4
    let item5 = props.gameData.participants[props.participantId - 1].stats.item5
    let item6 = props.gameData.participants[props.participantId - 1].stats.item6
    let items = [item0, item1, item2, item3, item4, item5, item6]
    return (
        <div style = {{
            position: 'relative',
            marginTop: '2px',
            marginBottom: '2px',
            marginLeft: '5%',
            marginRight: 'auto',
            backgroundColor: color,
            border: 'solid black 2px'
        }}>
            <p className = "pTest">{summonerName}</p>
            <img className="championImage" src={getChampionPic(props.gameData.participants[props.participantId - 1].championId)} alt="loading" />
            <SummonerSpell imageLink1={getSummonerSpellPic(props.gameData.participants[props.participantId - 1].spell1Id)} imageLink2={getSummonerSpellPic(props.gameData.participants[props.participantId - 1].spell2Id)} />
            <Runes gameData = {props.gameData} participantId = {props.participantId - 1}/>
            <ItemList items={items} />
            <BasicStats gameData={props.gameData} participantId={props.participantId - 1} />
        </div>
    )
}

export default ExpandedGameStats