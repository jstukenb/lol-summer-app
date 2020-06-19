import React, { useState, useEffect } from 'react'
import {
    getMatchDetails,
    getChampionPic,
    getSummonerSpellPic
} from '../../RiotAPI'
import ItemList from '../Items/ItemList'
import SummonerSpell from './SummonerSpell'
import BasicStats from './BasicStats'
import BasicGameStats from './BasicGameStats'
import ExpandedGameStats from './ExpandedGameStats'
import '../app.css'

const MatchDetails = (props) => {
    const [ gameData, setGameData ] = useState()
    const [ participantId, setParticipantId ] = useState()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ showExpanded, setShowExpanded ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {  
        getMatchDetails(props.gameId)
            .then((result) => {
                setGameData(result)
                for(let i=0; i<result.participantIdentities.length; i++) {
                    if(result.participantIdentities[i].player.accountId === props.accountId){
                        setParticipantId(i)
                    }
                }
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            })
    }, [props.gameId, props.accountId])

    useEffect(() => {
        if(gameData !== undefined && participantId !== undefined) {         
            setIsLoaded(true)
        }
    }, [gameData, participantId])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if(!isLoaded) {
        return <div>Loading...</div>
    } else {
        let victory = ""
        let color = ""
        if(gameData.participants[participantId].stats.win) {
            victory = "VICTORY"
            color = "cornflowerblue"
        }
        else {
            victory = "DEFEAT"
            color = "crimson"
        }
        let item0 = gameData.participants[participantId].stats.item0
        let item1 = gameData.participants[participantId].stats.item1
        let item2 = gameData.participants[participantId].stats.item2
        let item3 = gameData.participants[participantId].stats.item3
        let item4 = gameData.participants[participantId].stats.item4
        let item5 = gameData.participants[participantId].stats.item5
        let item6 = gameData.participants[participantId].stats.item6
        let items = [ item0, item1, item2, item3, item4, item5, item6 ]

        const handleButtonPress = e => {
            e.preventDefault()
            setShowExpanded(!showExpanded)
        }
        return(
        <div
            style = {{
                backgroundColor: color,
                border: 'solid black 1px'
            }}
        >
            <div className = "matchDetails">
                <BasicGameStats victory = {victory} gameData = {gameData} participantId = {participantId}/>
                <img className = "championImage" src = {getChampionPic(props.champion)} alt = "loading"/> 
                <SummonerSpell  imageLink1 = {getSummonerSpellPic(gameData.participants[participantId].spell1Id)} imageLink2 = {getSummonerSpellPic(gameData.participants[participantId].spell2Id)}/> 
                <ItemList items = {items}/>
                <BasicStats gameData = {gameData} participantId = {participantId}/>
                <button className = "expandMatchHistory" onClick = {handleButtonPress}>poggers</button>
                {showExpanded && gameData.participantIdentities.map(participant => (
                    <div key = {participant.player.summonerName}>
                        <ExpandedGameStats {...participant} gameData = {gameData} />
                    </div>
                ))}
            </div> 
        </div>
        )
    }
}

export default MatchDetails
/*






*/