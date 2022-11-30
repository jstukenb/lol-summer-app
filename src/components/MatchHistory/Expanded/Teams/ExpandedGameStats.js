import React from 'react'
import BasicStats from '../../BasicStats'
import SummonerSpell from '../../SummonerSpell'
import ItemList from '../../../Items/ItemList'
import Runes from '../../Runes'
import { getChampionPic, getSummonerSpellPic } from '../../../../RiotAPI'

const ExpandedGameStats = props => {
    function getSummonerSpellName(id) {
        switch(id) {
            case 1:
                return "summoner_boost.png"
            case 3:
                return "summoner_exhaust.png"
            case 4:
                return "summoner_flash.png"
            case 6:
                return "summoner_haste.png"
            case 7:
                return "summoner_heal.png"
            case 11:
                return "summoner_smite.png"
            case 12:
                return "summoner_teleport.png"
            case 13:
                return "summonermana.png"
            case 14:
                return "summonerignite.png"
            case 21:
                return "summonerbarrier.png"
            case 32:
                return "summoner_mark.png"
            case 39:
                return "summoner_mark.png"
            default:
                return "summonertemp2.png"
        }
    }

    //console.log("EXPANDED PROPS: ", props)
    let color = ""
    if (props.gameData.info.participants[props.participantId - 1].win) {
        color = "#a3cfec"
    }
    else {
        color = "#e2b6b3"
    }
    let summonerName = props.gameData.info.participants[props.participantId - 1].summonerName
    let item0 = props.gameData.info.participants[props.participantId - 1].item0
    let item1 = props.gameData.info.participants[props.participantId - 1].item1
    let item2 = props.gameData.info.participants[props.participantId - 1].item2
    let item3 = props.gameData.info.participants[props.participantId - 1].item3
    let item4 = props.gameData.info.participants[props.participantId - 1].item4
    let item5 = props.gameData.info.participants[props.participantId - 1].item5
    let item6 = props.gameData.info.participants[props.participantId - 1].item6
    let items = [item0, item1, item2, item3, item4, item5, item6]

    const champName = props.championJson.keys[props.gameData.info.participants[props.participantId - 1].championId]
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
            <SummonerSpell imageLink1={getSummonerSpellPic(getSummonerSpellName(props.gameData.info.participants[props.participantId - 1].spell1Id))} imageLink2={getSummonerSpellPic(getSummonerSpellName(props.gameData.info.participants[props.participantId - 1].spell2Id))} />
            <ItemList items={items} itemJson={props.itemJson}/>
            <BasicStats gameData={props.gameData} participantId={props.participantId - 1} />
        </div>
    )
}

export default ExpandedGameStats