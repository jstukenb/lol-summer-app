import React, { useState, useEffect } from 'react'
import Image from '../Image'
import SoloRank from './Ranks/SoloRank'
import FlexRank from './Ranks/FlexRank'
import { getProfilePic } from '../../RiotAPI'

const Results = (props) => {
    const [ isLoaded, setIsLoaded ] = useState(false)
    console.log("props from search: ", props)
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
                <Image imageLink = {profileImageLink} width = "100" height = "100"/>
                <h2>Summoner Name: {summonerName}</h2>
                <h2>Summoner Level: {summonerLevel}</h2>
                <SoloRank rankData = {props.rankData}/>
                <FlexRank rankData = {props.rankData}/>
            </div>
        )
    }
    
}

export default Results