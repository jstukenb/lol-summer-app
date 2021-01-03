import React, { useState, useEffect } from 'react'
import Results from '../Profile/ProfileResults'
import MatchHistory from '../MatchHistory/MatchHistory'
import '../app.css'
import {
    searchSummonerName,
    getPlayerRank,
    getChampionJson,
    getRuneJson,
    getItemJson,
    getSummonerJson,

} from '../../RiotAPI'

const SearchStuff = () => {
    const [ summonerData, setSummonerData ] = useState()
    const [ rankData, setRankData ] = useState()
    const [ tylerLol, setTylerLol ] = useState(false)

    const [ summonerName, setSummonerName ] = useState("")

    const [ championJson, setChampionJson ] = useState()
    const [ itemJson, setItemJson ] = useState()
    const [ runeJson, setRuneJson ] = useState()
    const [ summonerJson, setSummonerJson ] = useState()
    
    const [ dataGrabbed, setDataGrabbed ] = useState(false)
    const [ error, setError ] = useState(null)

    async function grabData() {
        try {
            if (summonerName === "unknown warlac") {
                setTylerLol(true)
            } else if (summonerName !== "") {
                setSummonerData(await searchSummonerName(summonerName))
                setChampionJson(await getChampionJson())
                setRuneJson(await getRuneJson())
                setItemJson(await getItemJson())
                setSummonerJson(await getSummonerJson())
            } else throw "Input a valid Summoner Name"
        } catch (error) {
            setError("Sorry something went wrong");
            console.log(error)
        }
    }

    useEffect(() => {
        if (summonerData !== undefined && championJson !== undefined && itemJson !== undefined && runeJson !== undefined ) {
            getPlayerRank(summonerData.id)
                .then((result) => {
                    setRankData(result)
                    setDataGrabbed(true)
                })
        }
    }, [ summonerData, championJson, itemJson, runeJson ])

    function resetSearch() {
        setSummonerData()
        setRankData()
        setTylerLol()
        setDataGrabbed(false)
    }

    function onSearchButtonPress(e) {
        e.preventDefault()
        resetSearch()
        grabData()
    }
    
    if (dataGrabbed) {  
        return(
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
                <MatchHistory accountId = {summonerData.accountId} championJson={championJson} runeJson={runeJson} itemJson={itemJson} summonerJson={summonerJson}/>
            </div>
        )
    }
    if (tylerLol) {
        return(
            <div style={{display: 'block', position: 'relative', left:'50%'}}>
                WOOF WOOF TYLER DOG
            </div>
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
                <p style={{textAlign: "center"}}>Sample Summoner Names: Whodatwon, Crayzpirate, ponky, Malphus (case-sensitive)</p>
                <button className = "search" type="submit">Search</button>   
                
            </form>
            
        </div>
    )
}

export default SearchStuff