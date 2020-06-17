import React, { useState, useEffect } from 'react'
import {
    getMatchDetails,
    getChampionPic,
    getSummonerSpellPic
} from '../../RiotAPI'
import Image from '../Image'
import ItemList from '../Items/ItemList'

const MatchDetails = (props) => {
    const [ gameData, setGameData ] = useState()
    const [ participantId, setParticipantId ] = useState()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {  
        getMatchDetails(props.gameId)
            .then((result) => {
                setGameData(result)
                console.log("result: ", result)
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
            console.log("WHODATWON IS: ", participantId)           
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
        let KDA = `${gameData.participants[participantId].stats.kills}/${gameData.participants[participantId].stats.deaths}/${gameData.participants[participantId].stats.assists}`
        let KDANumber = (gameData.participants[participantId].stats.kills + gameData.participants[participantId].stats.assists) / gameData.participants[participantId].stats.deaths

        if (KDANumber === Infinity) {
            KDANumber = "PERFECT"
        } else {
            KDANumber = KDANumber.toFixed(2)
        }
        let item0 = gameData.participants[participantId].stats.item0
        let item1 = gameData.participants[participantId].stats.item1
        let item2 = gameData.participants[participantId].stats.item2
        let item3 = gameData.participants[participantId].stats.item3
        let item4 = gameData.participants[participantId].stats.item4
        let item5 = gameData.participants[participantId].stats.item5
        let item6 = gameData.participants[participantId].stats.item6
        let items = [ item0, item1, item2, item3, item4, item5, item6 ]

        return(
        <div
            style = {{
                backgroundColor: color,
                border: 'solid black 1px'
            }}
        >
            <h1>
                {victory}
                <Image imageLink = {getChampionPic(props.champion)} width = "40" height = "40"/> 
                <ItemList items = {items}/>
                <Image imageLink = {getSummonerSpellPic(gameData.participants[participantId].spell1Id)}/> <Image imageLink = {getSummonerSpellPic(gameData.participants[participantId].spell2Id)}/>
                "{KDA}"
                KDA: {KDANumber}/1
            </h1>
            <h3>Damage to champions: {gameData.participants[participantId].stats.totalDamageDealtToChampions}</h3>
            
        </div>
        )
    }
}

export default MatchDetails