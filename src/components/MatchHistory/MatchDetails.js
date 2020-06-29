import React, { useState, useEffect } from 'react'
import {
    getMatchDetails,
    getChampionPic,
    getSummonerSpellPic,
    getMatchTimeline,
} from '../../RiotAPI'
import ItemList from '../Items/ItemList'
import SummonerSpell from './SummonerSpell'
import BasicStats from './BasicStats'
import BasicGameStats from './BasicGameStats'
import ExpandedMatch from './Expanded/ExpandedMatch'
import Runes from './Runes'
import HoverCard from '../HoverCard'
import '../app.css'

const MatchDetails = (props) => {
    const [gameData, setGameData] = useState()
    const [gameTimeline, setGameTimeline] = useState()
    const [participantId, setParticipantId] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [showExpanded, setShowExpanded] = useState(false)
    const [error, setError] = useState(null)
    const [playerBios, setPlayerBios] = useState()
    let tempArrayOfBios = []
    //const [blurb, setBlurb] = useState()
    const [isShown, setIsShown] = useState(false)
    
    useEffect(() => {
        getMatchDetails(props.gameId)
            .then((result) => {
                setGameData(result)
                console.log(result)
                for (let i = 0; i < result.participantIdentities.length; i++) {
                    let playerBio = [result.participantIdentities[i].player.summonerName, result.participants[i].championId, result.participants[i].teamId, props.championJson.keys[result.participants[i].championId]]
                    tempArrayOfBios.push(playerBio)
                    if (result.participantIdentities[i].player.accountId === props.accountId) {
                        setParticipantId(i)
                    }
                }
                setPlayerBios(tempArrayOfBios)
            },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
        getMatchTimeline(props.gameId)
                .then((result) => {
                    setGameTimeline(result)
                    //console.log("timeline result: ", result)
                })
    }, [props.gameId, props.accountId, props.championJson, props.champion])

    useEffect(() => {
        if (gameData !== undefined && participantId !== undefined && playerBios !== undefined) {
            setIsLoaded(true)
        }
    }, [gameData, participantId, playerBios])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else if (gameData.participants === undefined) {
        return <div>Please reload and try again</div>
    } else {
        let victory = ""
        let color = ""
        if (gameData.participants[participantId].stats.win) {
            victory = "VICTORY"
            color = "#a3cfec"
        }
        else {
            victory = "DEFEAT"
            color = "#e2b6b3"
        }
        let item0 = gameData.participants[participantId].stats.item0
        let item1 = gameData.participants[participantId].stats.item1
        let item2 = gameData.participants[participantId].stats.item2
        let item3 = gameData.participants[participantId].stats.item3
        let item4 = gameData.participants[participantId].stats.item4
        let item5 = gameData.participants[participantId].stats.item5
        let item6 = gameData.participants[participantId].stats.item6
        let items = [item0, item1, item2, item3, item4, item5, item6]

        const champName = props.championJson.keys[props.champion]
        let blurb = props.championJson.data[champName].blurb

        const handleButtonPress = e => {
            e.preventDefault()
            setShowExpanded(!showExpanded)
        }
        return (
            <div
                style={{
                    border: 'solid black 1px'
                }}
            >
                <div className="matchDetails" style={{
                    backgroundColor: color,
                    display: 'inline-block',
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginRight: '10%',
                    marginLeft: 'auto',
                    border: 'solid black 2px'
                }}>
                    
                    <BasicGameStats victory={victory} gameData={gameData} participantId={participantId} />
                    <img className="championImage" src={getChampionPic(champName)} alt="loading" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} title={blurb}/>
                    {isShown && <HoverCard blurb={blurb} />}
                    <Runes gameData={gameData} participantId={participantId} runeJson={props.runeJson}/>
                    <SummonerSpell imageLink1={getSummonerSpellPic(gameData.participants[participantId].spell1Id)} imageLink2={getSummonerSpellPic(gameData.participants[participantId].spell2Id)} />
                    <ItemList items={items} />
                    <BasicStats gameData={gameData} participantId={participantId} />
                    <button className="expandMatchHistory" onClick={handleButtonPress} style={{display:'inLineFlex'}}>poggers</button>

                </div>
                {showExpanded && <ExpandedMatch playerBios={playerBios} gameTimeline={gameTimeline} gameData={gameData} runeJson={props.runeJson} championJson={props.championJson} champion={props.champion}/>}
            </div>
        )
    }
}

export default MatchDetails
/*


{showExpanded && gameData.participantIdentities.map(participant => (
                    <div key = {participant.player.summonerName}>
                        <ExpandedGameStats {...participant} gameData = {gameData} />
                    </div>
                ))}

{showExpanded && <ExpandedMatch gameData = {gameData} />}


title="<b style='color: #00cfbc'>Control Ward</b><br><span>Used to disable wards and invisible traps 
in an area.</span><br><span><groupLimit>Can only carry 2 Control Wards in inventory.</groupLimit><br>
<br><consumable>Click to Consume:</consumable> Places a ward that grants vision of the surrounding area. 
This device will also reveal invisible traps and reveal / disable wards. Control Wards do not disable other Control Wards. 
Camouflaged units will also be revealed. <br><br>Limit 1 <font color='#BBFFFF'>Control Ward</font> on the map per player.
</span><br><span>Cost:</span> <span style='color: #ffc659'>75 (75)</span>"


*/