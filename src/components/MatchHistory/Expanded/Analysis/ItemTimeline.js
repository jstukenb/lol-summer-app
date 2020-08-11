import React, {useState} from 'react'
import Item from '../../../Items/Item'
import PurchaseGroup from './PurchaseGroup'

const ItemTimeline = props => {
    console.log("ITEM TIMELINE PROPS: ", props)

    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }
    
    for(let i=0; i<props.purchaseGroups.length; i++) {
        if (props.purchaseGroups[i][0] !== undefined) {
            let timeOfPurchase = props.purchaseGroups[i][0].timestamp / 1000
            if (timeOfPurchase % 60 !== 0) {
                let seconds = "" + Math.floor(timeOfPurchase % 60)
                if (seconds < 10 ) {
                    seconds = "0"+seconds
                }
                timeOfPurchase = timeOfPurchase / 60
                timeOfPurchase = Math.ceil(timeOfPurchase)
                timeOfPurchase = timeOfPurchase + ":" + seconds
            } else {
                timeOfPurchase = timeOfPurchase / 60
            }
        }
        
    }

    return(
        <div>
            this is going to be the timeline that draws the items, gotta do some math to space out when you bought items
            {props.purchaseGroups.map(purchaseGroup => (
                <div key={getUniqueKey()}>
                    <PurchaseGroup gameTimeline={props.gameTimeline} specificFrameGroups={props.specificFrameGroup} allEnemyItems={props.allEnemyItems}playerBios={props.playerBios} purchaseGroup={purchaseGroup} itemJson={props.itemJson} championJson={props.championJson} participantId={props.participantId}/>
                </div>
            ))}
        </div>
    )
}

export default ItemTimeline