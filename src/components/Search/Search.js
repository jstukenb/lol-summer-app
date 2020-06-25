import React, { useState, useEffect } from 'react'
import Results from '../Profile/ProfileResults'
import MatchHistory from '../MatchHistory/MatchHistory'
import '../app.css'
import {
    searchSummonerName,
    getPlayerRank,
    getLiveData
} from '../../RiotAPI'

const SearchStuff = () => {
    const [ summonerData, setSummonerData ] = useState()
    const [ rankData, setRankData ] = useState()
    const [ tylerLol, setTylerLol ] = useState(false)

    const [ summonerName, setSummonerName ] = useState("")
    
    const [ dataGrabbed, setDataGrabbed ] = useState(false)
    const [ error, setError ] = useState(null)

    async function grabData() {
        try {
            if (summonerName !== "") {
                setSummonerData(await searchSummonerName(summonerName))
            } else if (summonerName === "unknown warlac") {
                setTylerLol(true)
            } else throw "Input a valid Summoner Name"
        } catch (error) {
            setError("Sorry something went wrong");
            console.log(error)
        }
    }

    useEffect(() => {
        if (summonerData !== undefined) {
            getPlayerRank(summonerData.id)
                .then((result) => {
                    setRankData(result)
                    setDataGrabbed(true)
                })
        }
    }, [ summonerData ])

    const onSearchButtonPress = (e) => {
        e.preventDefault();
        console.log("SEARCH PRESSEd")
        grabData();
    }
    
    if (dataGrabbed) {  
        return(
            <div className = "entireShell">
                <h1 className = "searchTitle">
                JOSH.GG
                </h1>
                <form>
                    <input
                        id = "summonerInfo"
                        placeholder = "Input a Summoner Name"
                        type = "text"
                        onChange = {e => setSummonerName(e.target.value)}
                        value = {summonerName}
                        >
                    </input>
                </form>
                <button className = "search" onClick = {onSearchButtonPress}>Search</button>
                <Results 
                    summonerData = {summonerData}
                    rankData = {rankData}
                />
                <MatchHistory accountId = {summonerData.accountId}/>
            </div>
        )
    }
    if (tylerLol) {
        return(
            <div>
                WOOF WOOF TYLER DOG
            </div>
        )
    }
    return(
        <div className="entireShell">
            <h1 className = "searchTitle">
                JOSH.GG    
            </h1>
            <form>
                <input
                  id = "summonerInfo"
                  placeholder = "Input a Summoner Name"
                  type = "text"
                  onChange = {e => setSummonerName(e.target.value)}
                  value = {summonerName}
                  >
                </input>
            </form>
            <button className = "search" onClick = {onSearchButtonPress}>Search</button>   
        </div>
    )
}

export default SearchStuff