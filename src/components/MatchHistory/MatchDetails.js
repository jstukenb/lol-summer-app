import React, { useState, useEffect, useContext } from "react";
import {
    searchPuuid,
    getMatchDetails,
    getChampionPic,
    getSummonerSpellPic,
    getMatchTimeline,
} from "../../RiotAPI";
import ItemList from "../Items/ItemList";
import SummonerSpell from "./SummonerSpell";
import BasicStats from "./BasicStats";
import BasicGameStats from "./BasicGameStats";
import ExpandedMatch from "./Expanded/Teams/ExpandedMatch";
import Runes from "./Runes";
import "../app.css";
import axios from 'axios'
import { RiotJsonContext } from "../Search/Search2";

const MatchDetails = (props) => {
    // console.log("match details props: ", props)
    const riotJsons = useContext(RiotJsonContext)
    const championJson = riotJsons["championJson"]
    const [gameData, setGameData] = useState();
    const [gameTimeline, setGameTimeline] = useState();
    const [participantId, setParticipantId] = useState();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [showExpanded, setShowExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [playerBios, setPlayerBios] = useState();
    let tempArrayOfBios = [];
    //const [blurb, setBlurb] = useState()
    function getSummonerSpellName(id) {
        switch(id) {
            case 1:
                return "summoner_boost.png"
            case 3:
                return "summoner_exhaust.png"
            case 4:
                return "summoner_flash.png"
            case 6:
                return "summoner_haste.png"
            case 7:
                return "summoner_heal.png"
            case 11:
                return "summoner_smite.png"
            case 12:
                return "summoner_teleport.png"
            case 13:
                return "summonermana.png"
            case 14:
                return "summonerignite.png"
            case 21:
                return "summonerbarrier.png"
            case 32:
                return "summoner_mark.png"
            case 39:
                return "summoner_mark.png"
            default:
                return "summonertemp2.png"
        }
    }
    async function grabData() {
        const matchDetail = await axios.get(`http://localhost:4000/matchDetails/${props.gameId}`)
        setGameData(matchDetail.data)
        const matchTimeline = await axios.get(`http://localhost:4000/matchTimeline/${props.gameId}`)
        setGameTimeline(matchTimeline.data)
        for (let i = 0; i < matchDetail.data.metadata.participants.length; i++) {         
            //we want one hub of a users team champion, champion key i guess and then the participant id  
            let playerBio = [
                matchDetail.data.info.participants[i].summonerName,
                matchDetail.data.info.participants[i].championId,
                matchDetail.data.info.participants[i].teamId,
                championJson.keys[matchDetail.data.info.participants[i].championId],
                //this the account id because i assume we only need that
                matchDetail.data.info.participants[i].accountId,
            ]
            tempArrayOfBios.push(playerBio);
            if (matchDetail.data.metadata.participants[i] === props.puuid) {
                setParticipantId(i);
            }         
        }
        setPlayerBios(tempArrayOfBios)

    }
    useEffect(() => {
        grabData()
    }, [])

    useEffect(() => {
        if (
            gameData !== undefined &&
            participantId !== undefined &&
            playerBios !== undefined
        ) {
            setIsLoaded(true);
        }
    }, [gameData, participantId, playerBios]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (gameData.info.participants === undefined) {
        return <div>Please reload and try again</div>;
    } else {
        let victory = "";
        let color = "";
        if (gameData.info.participants[participantId].win) {
            victory = "VICTORY";
            color = "#a3cfec";
        } else {
            victory = "DEFEAT";
            color = "#e2b6b3";
        }
        let item0 = gameData.info.participants[participantId].item0;
        let item1 = gameData.info.participants[participantId].item1;
        let item2 = gameData.info.participants[participantId].item2;
        let item3 = gameData.info.participants[participantId].item3;
        let item4 = gameData.info.participants[participantId].item4;
        let item5 = gameData.info.participants[participantId].item5;
        let item6 = gameData.info.participants[participantId].item6;
        let items = [item0, item1, item2, item3, item4, item5, item6];

        const champName = championJson.keys[gameData.info.participants[participantId].championId];

        const handleButtonPress = (e) => {
            e.preventDefault();
            setShowExpanded(!showExpanded);
        };
        return (
            <div
                style={{
                    border: "solid black 1px",
                }}
            >
                <div
                    className="matchDetails"
                    style={{
                        backgroundColor: color,
                        display: "inline-block",
                        marginTop: "1%",
                        marginBottom: "1%",
                        marginRight: "10%",
                        marginLeft: "auto",
                        border: "solid black 2px",
                    }}
                >
                    <BasicGameStats
                        victory={victory}
                        gameData={gameData}
                        participantId={participantId}
                    />
                    <img
                        className="championImage"
                        src={getChampionPic(champName)}
                        alt="loading"
                    />
                    <Runes
                        gameData={gameData}
                        participantId={participantId}
                    />
                    <SummonerSpell
                        gameData={gameData}
                        imageLink1={getSummonerSpellPic(
                            getSummonerSpellName(gameData.info.participants[participantId].summoner1Id)
                        )}
                        imageLink2={getSummonerSpellPic(
                            getSummonerSpellName(gameData.info.participants[participantId].summoner2Id)
                        )}
                    />
                    <ItemList items={items}/>
                    <BasicStats gameData={gameData} participantId={participantId} />
                    <button
                        className="expandMatchHistory"
                        onClick={handleButtonPress}
                        style={{ display: "inLineFlex" }}
                    >
                        Expand
          </button>
                </div>
                {showExpanded && (
                    <ExpandedMatch
                        playerBios={playerBios}
                        gameTimeline={gameTimeline}
                        gameData={gameData}
                        champion={champName}
                        participantId={participantId}
                    />
                )}
            </div>
        );
    }
};

export default MatchDetails;
/*


{showExpanded && gameData.participantIdentities.map(participant => (
                    <div key = {participant.player.summonerName}>
                        <ExpandedGameStats {...participant} gameData = {gameData} />
                    </div>
                ))}

{showExpanded && <ExpandedMatch gameData = {gameData} />}




*/
