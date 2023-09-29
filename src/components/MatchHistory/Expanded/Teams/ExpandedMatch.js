import React, {useEffect, useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ExpandedGameStats from './ExpandedGameStats'
import MatchTimeline from '../Timeline/MatchTimeline'
import KillMap from '../Map/KillMap'
import ExpandedObjectives from './ExpandedObjectives'
import AnalysisShell from '../Analysis/AnalysisShell'

const ExpandedMatch = props => {
    console.log("Expanded Match props: ", props)
    const [userTimelineId, setUserTimelineId] = useState()
    const [killTimeline, setKillTimeline] = useState()
    const [analysisTimeline, setAnalysisTimeline] = useState()
    const [levelTimeline, setLevelTimeline] = useState()
    //let count = 1
    useEffect(() => {
        //console.log(props.participantId)
        setUserTimelineId(props.participantId+1)
    }, [])
    useEffect(() => {
        setKillTimeline(props.gameTimeline.info.frames.flatMap(frames => (
            frames.events.filter(event => event.type === "CHAMPION_KILL")
        )))
        //console.log("USERTIMELINE ID: ", userTimelineId)
        setAnalysisTimeline(props.gameTimeline.info.frames.flatMap(frames => (
            frames.events.filter(event => (event.type === "ITEM_PURCHASED" || event.type === "ITEM_SOLD" || event.type === "ITEM_UNDO") && event.participantId === props.participantId+1)
        )))
        /*setLevelTimeline(props.gameTimeline.info.frames.flatMap(frames => (
            frames.events.filter(event => (event.type === "SKILL_LEVEL_UP"))
        )))*/
    }, [userTimelineId])
    
    return (
        <div>
            <Tabs style = {{display: "inlineFlex"}}>
                <TabList>
                    <Tab>Scores</Tab>
                    <Tab>Timeline</Tab>
                    <Tab>Kill Map</Tab>

                </TabList>
                <TabPanel>
                    <div>
                        <ExpandedObjectives gameData={props.gameData}/>
                        {props.gameData.info.participants.map(participant => (
                            <div key={participant.summonerName}>
                                {<ExpandedGameStats {...participant} gameData={props.gameData}/>}
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <MatchTimeline playerBios={props.playerBios} gameData={props.gameData} gameTimeline={props.gameTimeline}/>
                </TabPanel>
                <TabPanel>
                    <KillMap playerBios={props.playerBios} mapId={props.gameData.info.mapId} killTimeline={killTimeline}/>
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

                    <Tab>Item Analysis</Tab>

<TabPanel>
                    <AnalysisShell playerBios={props.playerBios} gameData={props.gameData} analysisTimeline={analysisTimeline} itemJson={props.itemJson} championJson={props.championJson} userTimelineId={userTimelineId} gameTimeline={props.gameTimeline} participantId={props.participantId}/>
                </TabPanel>




*/