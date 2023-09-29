import React, { useState, useEffect } from 'react'
import Results from '../Profile/ProfileResults'
import MatchHistory from '../MatchHistory/MatchHistory'
import axios from 'axios'
import '../app.css'
import {
    searchSummonerName,
    //getPlayerRank,
    getChampionJson,
    getRuneJson,
    getItemJson,
    getSummonerJson,

} from '../../RiotAPI'

const SearchStuff = () => {
    const [ summonerData, setSummonerData ] = useState()
    const [ rankData, setRankData ] = useState()

    const [ summonerName, setSummonerName ] = useState("")

    const [ championJson, setChampionJson ] = useState()
    const [ itemJson, setItemJson ] = useState()
    const [ runeJson, setRuneJson ] = useState()
    const [ summonerJson, setSummonerJson ] = useState()
    
    const [ dataGrabbed, setDataGrabbed ] = useState(false)
    const [ error, setError ] = useState(null)

    const [gameList, setGameList] = useState([])

    async function getPlayerGames() {
        axios.get(`http://localhost:4000/searchSummoner/${summonerName}`)
            .then(function(response) {
                console.log(response.data)
                setSummonerData(response.data)
            }).catch(function (error) {
                console.log(error)
            })
    }

    async function getPlayerRank (id) {
        axios.get(`http://localhost:4000/playerRank/${id}`)
            .then(function(response) {
                console.log(response.data)
                setRankData(response.data)
            }).catch(function (error) {
                console.log(error)
            })
    }

    async function grabData() {
        try {
            if (summonerName !== "") {
                console.log("Search: ", summonerName)
                await getPlayerGames(summonerName)
                //setSummonerData(await searchSummonerName(summonerName))
                setChampionJson(await getChampionJson())
                setRuneJson(await getRuneJson())
                setItemJson(await getItemJson())
                setSummonerJson(await getSummonerJson())
            } else throw "Input a valid Summoner Name"
        } catch (error) {
            setError("Sorry something went wrong");
            //console.log(error)
        }
    }

    useEffect(() => {
        if (summonerData !== undefined && championJson !== undefined && itemJson !== undefined && runeJson !== undefined ) {
            console.log("HERE: ", summonerData)
            getPlayerRank(summonerData.id)
                .then((result) => {
                    console.log("result: ", result)
                    setRankData(result)
                    setDataGrabbed(true)
                })
        }
    }, [ summonerData, championJson, itemJson, runeJson, gameList ])

    function resetSearch() {
        setSummonerData()
        setRankData()
        setDataGrabbed(false)
    }

    function onSearchButtonPress(e) {
        e.preventDefault()
        resetSearch()
        grabData()
    }
    
    if (dataGrabbed) {  
        return(
            <div>
                test
                <Results 
                    summonerData = {summonerData}
                    rankData = {rankData}
                />
                
            </div>
        )
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
                <MatchHistory puuid = {summonerData.puuid} accountId = {summonerData.accountId} championJson={championJson} runeJson={runeJson} itemJson={itemJson} summonerJson={summonerJson}/>
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
                <p style={{textAlign: "center"}}>Sample Summoner Names: Tippunk, Crayzpirate, ponky, Malphus (case-sensitive)</p>
                <button className = "search" type="submit">Search</button>   
                
            </form>
            
        </div>
    )
}

export default SearchStuff