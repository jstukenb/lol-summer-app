import React, { useState, useEffect } from "react";
import {
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

const MatchDetails = (props) => {
    const [gameData, setGameData] = useState();
    const [gameTimeline, setGameTimeline] = useState();
    const [participantId, setParticipantId] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showExpanded, setShowExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [playerBios, setPlayerBios] = useState();
    let tempArrayOfBios = [];
    //const [blurb, setBlurb] = useState()

    useEffect(() => {
        getMatchDetails(props.gameId).then(
            (result) => {
                setGameData(result);
                //console.log("RESULT: ", result);
                for (let i = 0; i < result.participantIdentities.length; i++) {
                    let playerBio = [
                        result.participantIdentities[i].player.summonerName,
                        result.participants[i].championId,
                        result.participants[i].teamId,
                        props.championJson.keys[result.participants[i].championId],
                        result.participantIdentities[i].participantId,
                    ];
                    tempArrayOfBios.push(playerBio);
                    if (
                        result.participantIdentities[i].player.accountId === props.accountId
                    ) {
                        setParticipantId(i);
                    }
                }
                setPlayerBios(tempArrayOfBios);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
        getMatchTimeline(props.gameId).then((result) => {
            setGameTimeline(result);
            //console.log("timeline result: ", result)
        });
    }, [props.gameId, props.accountId, props.championJson, props.champion]);

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
    } else if (gameData.participants === undefined) {
        return <div>Please reload and try again</div>;
    } else {
        let victory = "";
        let color = "";
        if (gameData.participants[participantId].stats.win) {
            victory = "VICTORY";
            color = "#a3cfec";
        } else {
            victory = "DEFEAT";
            color = "#e2b6b3";
        }
        let item0 = gameData.participants[participantId].stats.item0;
        let item1 = gameData.participants[participantId].stats.item1;
        let item2 = gameData.participants[participantId].stats.item2;
        let item3 = gameData.participants[participantId].stats.item3;
        let item4 = gameData.participants[participantId].stats.item4;
        let item5 = gameData.participants[participantId].stats.item5;
        let item6 = gameData.participants[participantId].stats.item6;
        let items = [item0, item1, item2, item3, item4, item5, item6];

        const champName = props.championJson.keys[props.champion];

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
                        runeJson={props.runeJson}
                    />
                    <SummonerSpell
                        imageLink1={getSummonerSpellPic(
                            gameData.participants[participantId].spell1Id
                        )}
                        imageLink2={getSummonerSpellPic(
                            gameData.participants[participantId].spell2Id
                        )}
                    />
                    <ItemList items={items} itemJson={props.itemJson} />
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
                        itemJson={props.itemJson}
                        runeJson={props.runeJson}
                        championJson={props.championJson}
                        champion={props.champion}
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
