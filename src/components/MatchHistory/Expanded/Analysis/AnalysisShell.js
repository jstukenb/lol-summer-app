import React from 'react'
import ItemTimeline from './ItemTimeline'

const AnalysisShell = props => {
    console.log("ANALYSIS PROPS: ", props)
    let purchaseGroups = []
    

    //ENEMY ITEMS AND PURCHASES
    let allEnemyItems = []

    let userItems = props.gameTimeline.frames.flatMap(frames => (
        frames.events.filter(event => (event.type === "ITEM_PURCHASED" || event.type === "ITEM_SOLD" || event.type === "ITEM_DESTROYED" || event.type === "ITEM_UNDO") && event.participantId === props.playerBios[props.participantId][4])
    ))

    console.log("COOOMING: ", userItems)
    if (props.participantId <= 5) {
        getEnemyItems("red")
    } else {
        getEnemyItems("blue")
    }
    function getEnemyItems(color) {
        if (color === "blue") {
            for (let i = 0; i < 5; i++) {
                let playerItems = props.gameTimeline.frames.flatMap(frames => (
                    frames.events.filter(event => (event.type === "ITEM_PURCHASED" || event.type === "ITEM_SOLD" || event.type === "ITEM_DESTROYED" || event.type === "ITEM_UNDO") && event.participantId === props.playerBios[i][4])
                ))
                //console.log("ENEMY ITEMS: ", playerItems)
                allEnemyItems.push(playerItems)

            }
        } else if (color === "red") {
            for (let i = 5; i < props.playerBios.length; i++) {
                let playerItems = props.gameTimeline.frames.flatMap(frames => (
                    frames.events.filter(event => (event.type === "ITEM_PURCHASED" || event.type === "ITEM_SOLD" || event.type === "ITEM_DESTROYED" || event.type === "ITEM_UNDO") && event.participantId === props.playerBios[i][4])
                ))
                //console.log("ENEMY ITEMS: ", playerItems)
                allEnemyItems.push(playerItems)

            }
        }
        console.log("ALL ENEMY ITEMS: ", allEnemyItems)
    }

    for (let i = 0; i < props.analysisTimeline.length; i++) {
        //console.log("I: " , i)
        let purchase
        if(props.analysisTimeline[i].type !== "ITEM_UNDO") {
            //console.log("FIRST PURCHASE IN GROUP: ", props.analysisTimeline[i])
            purchase = [props.analysisTimeline[i]]
        } else {
            purchase =[]
        }
        let difference = 0;
        let timesThroughLoop = -1
        for (let j = i + 1; j < props.analysisTimeline.length; j++) {
            difference = props.analysisTimeline[j].timestamp - props.analysisTimeline[i].timestamp
            timesThroughLoop++
            //console.log("i: ", i , " PLUS: " ,props.analysisTimeline[i])
            if (difference > 30000) {
                i += timesThroughLoop
                break
            } else {
                //console.log("PUSHING: ", props.analysisTimeline[j])
                if (props.analysisTimeline[j].type === "ITEM_UNDO") {
                    purchase.pop()
                } else {
                    if(props.analysisTimeline[j] === props.analysisTimeline[props.analysisTimeline.length-1]) {
                        //console.log("THIS IS THE LAST ONE IN TOTAL PURCHASES, EVBERTHING SHOULD STOP AFTER THIS IS PUSHED: ", props.analysisTimeline[j])
                        purchase.push(props.analysisTimeline[j])
                        i = props.analysisTimeline.length-1
                        break;
                    }
                    //console.log("PUSHED J: ", props.analysisTimeline[j])
                    purchase.push(props.analysisTimeline[j])
                }
                //console.log("TEST PURCHASE: ", purchase)
                //i+=timesThroughLoop
            }
            //console.log("")

        }
        if (purchase.length > 0) {
            //console.log("PUSHING: ", purchase)
            purchaseGroups.push(purchase)
        }
        
    }
    //console.log("OOGA BOOGA: ", specificFrameGroup)
    return (
        <div>
            ITEM ANALYSIS
            <ItemTimeline userItems={userItems} allEnemyItems={allEnemyItems} playerBios={props.playerBios} purchaseGroups={purchaseGroups} itemJson={props.itemJson} championJson={props.championJson} participantId={props.participantId} gameTimeline={props.gameTimeline} gameData={props.gameData}/>

        </div>
    )
}

export default AnalysisShell