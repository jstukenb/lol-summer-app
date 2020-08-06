import React from 'react'
import BasicStats from '../../BasicStats'
import SummonerSpell from '../../SummonerSpell'
import ItemList from '../../../Items/ItemList'
import Runes from '../../Runes'
import { getChampionPic, getSummonerSpellPic } from '../../../../RiotAPI'

const ExpandedGameStats = props => {
    //console.log("EXPANDED PROPS: ", props)
    let color = ""
    if (props.gameData.participants[props.participantId - 1].stats.win) {
        color = "#a3cfec"
    }
    else {
        color = "#e2b6b3"
    }
    let summonerName = props.gameData.participantIdentities[props.participantId - 1].player.summonerName
    let item0 = props.gameData.participants[props.participantId - 1].stats.item0
    let item1 = props.gameData.participants[props.participantId - 1].stats.item1
    let item2 = props.gameData.participants[props.participantId - 1].stats.item2
    let item3 = props.gameData.participants[props.participantId - 1].stats.item3
    let item4 = props.gameData.participants[props.participantId - 1].stats.item4
    let item5 = props.gameData.participants[props.participantId - 1].stats.item5
    let item6 = props.gameData.participants[props.participantId - 1].stats.item6
    let items = [item0, item1, item2, item3, item4, item5, item6]

    const champName = props.championJson.keys[props.gameData.participants[props.participantId - 1].championId]
    //let blurb = props.championJson.data[champName].blurb

    return (
        <div style={{
            position: 'relative',
            marginTop: '2px',
            marginBottom: '2px',
            marginLeft: '5%',
            marginRight: 'auto',
            backgroundColor: color,
            border: 'solid black 2px'
        }}>
            <p className="pTest">{summonerName}</p>
            
            <img className="championImage" src={getChampionPic(champName)} alt="loading" />
            <Runes gameData={props.gameData} participantId={props.participantId - 1} runeJson={props.runeJson} />
            <SummonerSpell imageLink1={getSummonerSpellPic(props.gameData.participants[props.participantId - 1].spell1Id)} imageLink2={getSummonerSpellPic(props.gameData.participants[props.participantId - 1].spell2Id)} />
            <ItemList items={items} itemJson={props.itemJson}/>
            <BasicStats gameData={props.gameData} participantId={props.participantId - 1} />
        </div>
    )
}

export default ExpandedGameStats