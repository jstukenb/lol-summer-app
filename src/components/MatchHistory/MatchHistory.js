import React, { useState, useEffect } from 'react'
import {
    getMatchList,
    getChampionJson
} from '../../RiotAPI'
import MatchDetails from './MatchDetails'
import '../app.css'

const MatchHistory = (props) => {
    const [ matchListGrabbed, setMatchListGrabbed ] = useState()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ error, setError ] = useState(null)
    var blurb = ""
    useEffect(() => {
        getMatchList(props.accountId)
            .then((result) => {
                setMatchListGrabbed(result.matches)
                console.log("result: ", result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            })
              
    }, [props.accountId])

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
                    <div key={match.gameId}> 
                        <MatchDetails {...match} accountId = {props.accountId}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default MatchHistory
