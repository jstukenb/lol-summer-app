import React, { useState, useEffect } from 'react'
import SoloRank from './Ranks/SoloRank'
import FlexRank from './Ranks/FlexRank'
import { getProfilePic } from '../../RiotAPI'
import '../app.css'

const Results = (props) => {
    const [ isLoaded, setIsLoaded ] = useState(false)
    useEffect(() => {
        setIsLoaded(true)
    }, [])

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
                    <SoloRank rankData = {props.rankData}/>
                    <FlexRank rankData = {props.rankData}/>
                </div>
            </div>
        )
    }
    
}

export default Results