import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ExpandedGameStats from './ExpandedGameStats'
import MatchTimeline from './MatchTimeline'
import KillMap from './KillMap'
import ExpandedObjectives from './ExpandedObjectives'

const ExpandedMatch = props => {
    console.log("MATCH PROPS: ", props)

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
                        <ExpandedObjectives />
                        {props.gameData.participantIdentities.map(participant => (
                            <div key={participant.player.summonerName}>
                                {<ExpandedGameStats {...participant} gameData={props.gameData} />}
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <MatchTimeline playerBios={props.playerBios} gameData={props.gameData} gameTimeline={props.gameTimeline}/>
                </TabPanel>
                <TabPanel>
                    <KillMap playerBios={props.playerBios} mapId={props.gameData.mapId} gameTimeline={props.gameTimeline}/>
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