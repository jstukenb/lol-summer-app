import React, {useEffect, useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ExpandedGameStats from './ExpandedGameStats'
import MatchTimeline from '../Timeline/MatchTimeline'
import KillMap from '../Map/KillMap'
import ExpandedObjectives from './ExpandedObjectives'
import AnalysisShell from '../Analysis/AnalysisShell'

const ExpandedMatch = props => {
    const [userTimelineId, setUserTimelineId] = useState()
    const [killTimeline, setKillTimeline] = useState()
    const [analysisTimeline, setAnalysisTimeline] = useState()
    let count = 1
    useEffect(() => {
        //console.log(props.participantId)
        setUserTimelineId(props.participantId+1)
        /*
        Object.keys(props.gameTimeline.frames[0].participantFrames).forEach(key => {
            if (props.gameTimeline.frames[0].participantFrames[key].participantId === props.playerBios[props.participantId][4]){
                setUserTimelineId(count)
            }
            count++;
        })*/
    }, [])
    useEffect(() => {
        setKillTimeline(props.gameTimeline.frames.flatMap(frames => (
            frames.events.filter(event => event.type === "CHAMPION_KILL")
        )))
        console.log("USERTIMELINE ID: ", userTimelineId)
        setAnalysisTimeline(props.gameTimeline.frames.flatMap(frames => (
            frames.events.filter(event => event.type === "ITEM_PURCHASED" && event.participantId === props.participantId+1)
        )))
    }, [userTimelineId])
    
    console.log("MARCO IS COOL: ", props.participantId, " ", analysisTimeline)
    return (
        <div>
            <Tabs style = {{display: "inlineFlex"}}>
                <TabList>
                    <Tab>Scores</Tab>
                    <Tab>Timeline</Tab>
                    <Tab>Kill Map</Tab>
                    <Tab>Item Analysis</Tab>
                </TabList>
                <TabPanel>
                    <div>
                        <ExpandedObjectives gameData={props.gameData}/>
                        {props.gameData.participantIdentities.map(participant => (
                            <div key={participant.player.summonerName}>
                                {<ExpandedGameStats {...participant} gameData={props.gameData} itemJson={props.itemJson} runeJson={props.runeJson} championJson={props.championJson}/>}
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <MatchTimeline playerBios={props.playerBios} gameData={props.gameData} gameTimeline={props.gameTimeline}/>
                </TabPanel>
                <TabPanel>
                    <KillMap playerBios={props.playerBios} mapId={props.gameData.mapId} killTimeline={killTimeline}/>
                </TabPanel>
                <TabPanel>
                    <AnalysisShell playerBios={props.playerBios} gameData={props.gameData} analysisTimeline={analysisTimeline} itemJson={props.itemJson} championJson={props.championJson} userTimelineId={userTimelineId} gameTimeline={props.gameTimeline} participantId={props.participantId}/>
                </TabPanel>
            </Tabs>

        </div>
    )

}

export default ExpandedMatch

/*
{props.gameData.participantIdentities.map(participant => (
                        <div key={participant.player.summonerName}>
                            <ExpandedGameStats {...participant} gameData={props.gameData} />
                        </div>
                    ))}
*/