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

    function analyzeEnemyTeam(color) {
        if(color==="blue") {
            for (let i=0; i<5; i++) {
                let armor = props.championJson.data[props.playerBios[i][3]].stats.armor
                let armorPerLevel = props.championJson.data[props.playerBios[i][3]].stats.armorperlevel
                let magicResist = props.championJson.data[props.playerBios[i][3]].stats.spellblock
                let magicResistPerLevel = props.championJson.data[props.playerBios[i][3]].stats.spellblockperlevel
                console.log("NAME: ", props.playerBios[i][3], " ARMOR: ", armor, " armorperlevel: ", armorPerLevel, " magic resist: ", magicResist, " magic resist per level: ", magicResistPerLevel)
            }
        } else if(color==="red") {
            for(let i=5; i<props.playerBios.length; i++) {
                let armor = props.championJson.data[props.playerBios[i][3]].stats.armor
                let armorPerLevel = props.championJson.data[props.playerBios[i][3]].stats.armorperlevel
                let magicResist = props.championJson.data[props.playerBios[i][3]].stats.spellblock
                let magicResistPerLevel = props.championJson.data[props.playerBios[i][3]].stats.spellblockperlevel
                console.log("NAME: ", props.playerBios[i][3], " ARMOR: ", armor, " armorperlevel: ", armorPerLevel, " magic resist: ", magicResist, " magic resist per level: ", magicResistPerLevel)
            }
        }
    }
    if(props.participantId <= 5) {
        analyzeEnemyTeam("red")
    } else {
        analyzeEnemyTeam("blue")
    }
    return(
        <div>
            this is going to be the timeline that draws the items, gotta do some math to space out when you bought items
            {props.purchaseGroups.map(purchaseGroup => (
                <div key={getUniqueKey()}>
                    <PurchaseGroup allEnemyItems={props.allEnemyItems}playerBios={props.playerBios} purchaseGroup={purchaseGroup} itemJson={props.itemJson} championJson={props.championJson} participantId={props.participantId}/>
                </div>
            ))}
        </div>
    )
}

export default ItemTimeline