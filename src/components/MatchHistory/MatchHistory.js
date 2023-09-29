import React, { useState, useEffect } from 'react'
import {
    getMatchList,
} from '../../RiotAPI'
import MatchDetails from './MatchDetails'
import '../app.css'
import axios from 'axios'

const MatchHistory = (props) => {
    //console.log("MATCH HISTORY PROPS: ", props)
    const [ matchListGrabbed, setMatchListGrabbed ] = useState()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ error, setError ] = useState(null)
    useEffect(() => {
        grabData()
    }, [])

    async function grabData() {
        const matchList = await axios.get(`http://localhost:4000/past5Games/${props.puuid}`)
        setMatchListGrabbed(matchList.data)
    }
    useEffect(() => {
        if (matchListGrabbed !== undefined) {
            setIsLoaded(true)     
        }
    }, [matchListGrabbed])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div className = "matchList"> Match History
                {matchListGrabbed.map(match => (
                    <div key={match}> 
                        <MatchDetails gameId={match} accountId = {props.accountId} puuid = {props.puuid}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default MatchHistory
