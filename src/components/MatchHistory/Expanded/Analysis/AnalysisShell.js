import React, {useState, useEffect} from 'react'
import ItemTimeline from './ItemTimeline'

const AnalysisShell = props => {
    console.log("ANALYSIS PROPS: ", props)
    let purchaseGroups = []
    let specificFrameGroup = []

    //ENEMY ITEMS AND PURCHASES
    let allEnemyItems = []

    if(props.participantId <= 5) {
        getEnemyItems("red")
    } else {
        getEnemyItems("blue")
    }
    function getEnemyItems(color) {
        if (color === "blue") {
            for (let i=0; i<5; i++) {
                let playerItems = props.gameTimeline.frames.flatMap(frames => (
                    frames.events.filter(event => event.type === "ITEM_PURCHASED" && event.participantId === props.playerBios[i][4])
                ))
                //console.log("ENEMY ITEMS: ", playerItems)
                allEnemyItems.push(playerItems)
                
            }
        } else if(color === "red") {
            for (let i=5; i<props.playerBios.length; i++) {
                let playerItems = props.gameTimeline.frames.flatMap(frames => (
                    frames.events.filter(event => event.type === "ITEM_PURCHASED" && event.participantId === props.playerBios[i][4])
                ))
                //console.log("ENEMY ITEMS: ", playerItems)
                allEnemyItems.push(playerItems)
                
            }
        }
        console.log("ALL ENEMY ITEMS: ", allEnemyItems)
    }

    for (let i=0; i<props.analysisTimeline.length; i++) {
        let purchase = [props.analysisTimeline[i]]
        let difference = 0;
        let timesThroughLoop = -1
        for (let j=i+1; j<props.analysisTimeline.length; j++) {
            difference = props.analysisTimeline[j].timestamp - props.analysisTimeline[i].timestamp
            timesThroughLoop++
            if (difference > 30000) {
                
                specificFrameGroup.push(Math.floor(props.analysisTimeline[i].timestamp/60000) + 1)
                i+=timesThroughLoop
                break
            } else {
                purchase.push(props.analysisTimeline[j])
                if(i > props.analysisTimeline.length - 5) {
                    console.log("I: ", i)
                }
                i+=timesThroughLoop
            }
            
        }
        purchaseGroups.push(purchase)
    }
    console.log("OOGA BOOGA: ", specificFrameGroup)
    return(
        <div>
            ITEM ANALYSIS
            <ItemTimeline allEnemyItems={allEnemyItems} playerBios={props.playerBios} purchaseGroups={purchaseGroups} itemJson={props.itemJson} championJson={props.championJson} participantId={props.participantId} gameTimeline={props.gameTimeline} specificFrameGroup={specificFrameGroup}/>
            
        </div>
    )
}

export default AnalysisShell