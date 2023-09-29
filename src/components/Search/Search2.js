import React, { useState, useEffect, createContext } from 'react'
import Results from '../Profile/ProfileResults'
import MatchHistory from '../MatchHistory/MatchHistory'
import axios from 'axios'
import '../app.css'
import {
    getChampionJson,
    getRuneJson,
    getItemJson,
    getSummonerJson,
  
  } from '../../RiotAPI'
  
export const RiotJsonContext = createContext()

const Search = () => {
    const [ summonerData, setSummonerData ] = useState()
    const [ rankData, setRankData ] = useState()

    const [ summonerName, setSummonerName ] = useState("")
    const [ dataGrabbed, setDataGrabbed] = useState(false)
    const [ riotJson, setRiotJson ] = useState({})

    useEffect(() => {
        if (summonerData !== undefined && rankData !== undefined) {
            setDataGrabbed(true)
        }
    }, [rankData, summonerData])

    const setUpContext = async () => {
        const championJson = await getChampionJson()
        const runeJson = await getRuneJson()
        const itemJson = await getItemJson()
        const summonerJson = await getSummonerJson()
        setRiotJson({
        "championJson": championJson,
        "runeJson": runeJson,
        "itemJson": itemJson,
        "summonerJson": summonerJson
        })
    }
    
    async function grabData() {
        try {
            if (summonerName !== "") {
                await setUpContext()
                const summonerResponse = await axios.get(`http://localhost:4000/searchSummoner/${summonerName}`)
                setSummonerData(summonerResponse.data)
                const rankedResponse = await axios.get(`http://localhost:4000/playerRank/${summonerResponse.data.id}`)
                setRankData(rankedResponse.data)
                
            }
        } catch(error) {
            console.error('Error fetching data: ', error)
        }
    }
    const onSearchButtonPress = (e) => {
        e.preventDefault()
        grabData()
    }

    if (dataGrabbed) {
        return(
            <RiotJsonContext.Provider value = {riotJson}>
                <div className = "entireShell">
                    <h1 className = "searchTitle">
                    Summoner Synopsis
                    </h1>
                    <form onSubmit={onSearchButtonPress}>
                        <input
                            id = "summonerInfo"
                            placeholder = "Input a Summoner Name"
                            type = "text"
                            onChange = {e => setSummonerName(e.target.value)}
                            value = {summonerName}
                            >
                        </input>
                        <button className = "search" type = "submit" >Search</button>
                    </form>
                    
                    <Results 
                        summonerData = {summonerData}
                        rankData = {rankData}
                    />
                    <MatchHistory 
                        summonerData = {summonerData}
                        puuid = {summonerData.puuid} 
                        accountId = {summonerData.accountId}
                    />
                </div>
            </RiotJsonContext.Provider>
        )
    }
    return(
        <div className="entireShell">
            <h1 className = "searchTitle">
                Summoner Synopsis    
            </h1>
            <form onSubmit={onSearchButtonPress}>
                <input
                  id = "summonerInfo"
                  placeholder = "Input a Summoner Name"
                  type = "text"
                  onChange = {e => setSummonerName(e.target.value)}
                  value = {summonerName}
                  >
                </input>
                <p style={{textAlign: "center"}}>Sample Summoner Names: Tippunk, Crayzpirate, ponky, Malphus (case-sensitive)</p>
                <button className = "search" type="submit">Search</button>   
                
            </form>
            
        </div>
    )
}

export default Search