import React, { useState, useEffect } from 'react'
import Rank from './Ranks/Rank'
import { getProfilePic } from '../../RiotAPI'
import '../app.css'

const Results = (props) => {
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ soloUnrank, setSoloUnrank ] = useState(true)
    const [ flexUnrank, setFlexUnrank ] = useState()
    const [ playersQueues, setPlayersQueues ] = useState({})

    useEffect(() => {
        let playersRankQueues = {}
        if (props.rankData.length !== 0) {
            for (let i = 0; i < props.rankData.length; i++) {
                playersRankQueues[props.rankData[i].queueType] = i
            }
        }
        setPlayersQueues(playersRankQueues)
        if ("RANKED_SOLO_5x5" in playersRankQueues) {
            setSoloUnrank(false)
        } else {
            setSoloUnrank(true)
        }
    
        if ("RANKED_FLEX_SR" in playersRankQueues) {
            setFlexUnrank(false)
        } else {
            setFlexUnrank(true)
        }
    }, [props.rankData]) 

    useEffect(() => {
        setIsLoaded(true)
    },[playersQueues])



    if( !isLoaded ) {
        return(<div>Loading</div>)
    }
    else {
        let summonerLevel = props.summonerData.summonerLevel
        let summonerName = props.summonerData.name
        let profileImageLink = getProfilePic(props.summonerData.profileIconId)
        
        return (
            <div
                style = {{
                    border: 'solid black 2px'
                }}
            >
                <img className = "profilePic" src = {profileImageLink} width = "100" height = "100" alt = "loading" />
                <h2 className = "summonerName" >Summoner Name: {summonerName}</h2>
                <h2 className = "summonerLevel">Summoner Level: {summonerLevel}</h2>
                <div className = "ranks">
                    <Rank rankData = {props.rankData[playersQueues["RANKED_SOLO_5x5"]]} unranked = {soloUnrank}/>
                    <Rank rankData = {props.rankData[playersQueues["RANKED_FLEX_SR"]]} unranked = {flexUnrank}/>
                </div>
            </div>
        )
    }
    
}//

export default Results