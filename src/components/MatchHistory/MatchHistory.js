import React, { useState, useEffect } from 'react'
import {
    getMatchList,
} from '../../RiotAPI'
import MatchDetails from './MatchDetails'

const MatchHistory = (props) => {
    const [ matchListGrabbed, setMatchListGrabbed ] = useState()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ error, setError ] = useState(null)

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
            <ul>
                {matchListGrabbed.map(match => (
                    <li key={match.gameId}> 
                        <MatchDetails {...match} accountId = {props.accountId}/>
                    </li>
                ))}
            </ul>
        )
    }
}

export default MatchHistory