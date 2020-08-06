import React, { useState, useEffect } from 'react'
import Item from '../../../Items/Item'
import { getDamageJson } from '../../../../RiotAPI'
import ItemSuggestion from './ItemSuggestion'
import AnalysisItem from '../../../Items/AnalysisItem'
import Enemies from './Enemies'


const PurchaseGroup = props => {
    console.log("PURCHASE GROUP POG: ", props)
    //console.log("HERE: ", props.purchaseGroup[0].timestamp)
    const [showResult, setShowResult] = useState(false)
    const [purchaseGroupTags, setPurchaseGroupTags] = useState()
    const [showEnemies, setShowEnemies] = useState(false)
    const [enemyStuff, setEnemyStuff] = useState()

    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }

    let time = props.purchaseGroup[0].timestamp / 1000
    let frameInterval
    if (time % 60 !== 0) {
        let seconds = "" + Math.floor(time % 60)
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        time = time / 60
        time = Math.floor(time)
        time = time + ":" + seconds
    } else {
        time = time / 60
    }

    let specificFrameInterval = Math.floor(props.purchaseGroup[0].timestamp / 60000) + 1
    let tempPurchaseGroupTags = []
    function suggestItems() {

        for (let i = 0; i < props.purchaseGroup.length; i++) {
            //console.log("THING THING THING: ", props.purchaseGroup[i])
            tempPurchaseGroupTags.push(props.itemJson.data[props.purchaseGroup[i].itemId].tags)
            //purchaseGroupTags.push(props.purchaseGroup[i].tags)
        }
        return tempPurchaseGroupTags/*
        let arrayOfTags = []
        let arrayOfKeys = []
        for (var key in props.itemJson.data) {
            //console.log("BAZINGA: ", props.itemJson.data[key])
            if(props.itemJson.data[key].tags.includes("Armor")) {
                arrayOfTags.push(props.itemJson.data[key])
                arrayOfKeys.push(key)
            }
        }
        var test = {arrayOfTags}
        var test2 = {arrayOfKeys}
        var test2String = JSON.stringify(test2)
        var testString = JSON.stringify(test)
        console.log("TEST: ", test)
        console.log("SHIT: ", test2)
        //fs.writeFile("test.json", testString)
        //fs.writeFileSync("test.json", arrayOfTags)
        //console.log("FART: " , arrayOfTags)
        */
    }

    //props.analysisTimeline[i].timestamp / 60000) + 1

    function analyzeEnemyTeam(color) {
        if (color === "blue") {
            for (let i = 0; i < 5; i++) {
                let armor = props.championJson.data[props.playerBios[i][3]].stats.armor
                let armorPerLevel = props.championJson.data[props.playerBios[i][3]].stats.armorperlevel
                let magicResist = props.championJson.data[props.playerBios[i][3]].stats.spellblock
                let magicResistPerLevel = props.championJson.data[props.playerBios[i][3]].stats.spellblockperlevel
                //console.log("NAME: ", props.playerBios[i][3], " ARMOR: ", armor, " armorperlevel: ", armorPerLevel, " magic resist: ", magicResist, " magic resist per level: ", magicResistPerLevel)
            }
        } else if (color === "red") {
            for (let i = 5; i < props.playerBios.length; i++) {
                let armor = props.championJson.data[props.playerBios[i][3]].stats.armor
                let armorPerLevel = props.championJson.data[props.playerBios[i][3]].stats.armorperlevel
                let magicResist = props.championJson.data[props.playerBios[i][3]].stats.spellblock
                let magicResistPerLevel = props.championJson.data[props.playerBios[i][3]].stats.spellblockperlevel
                //console.log("NAME: ", props.playerBios[i][3], " ARMOR: ", armor, " armorperlevel: ", armorPerLevel, " magic resist: ", magicResist, " magic resist per level: ", magicResistPerLevel)
            }
        }
    }
    useEffect(() => {
        if (props.participantId <= 5) {
            analyzeEnemyTeam("red")
        } else {
            analyzeEnemyTeam("blue")
        }
    }, [])


    function filterEnemyItemsByTimestamp(timestamp) {
        console.log("MONEY SHOT: ", timestamp)
        let allFilteredPurchases = []
        for (let i = 0; i < props.allEnemyItems.length; i++) {
            let individualFilteredPurchases = []
            let j = 0
            for (let j = 0; j < props.allEnemyItems[i].length; j++) {
                //console.log("I: ", i, " PURCHASE TIMESTAMP: ", props.allEnemyItems[i][j].timestamp, " PASASED IN STAMP: ", timestamp)
                if (props.allEnemyItems[i][j].timestamp < timestamp) {
                    individualFilteredPurchases.push(props.allEnemyItems[i][j])
                } else {
                    break
                }
            }
            allFilteredPurchases.push(individualFilteredPurchases)
        }
        console.log("FILTERED FILTERED: ", allFilteredPurchases)
        //We have all of their purchases and sellings
        //We now have to go through see which are sold purchased and destroyed by that timestamp
        //Iterate through all our filteredpurchases
        //if purchase just add it like normal
        //else if ItemSold we remove that one item
        //else if undo we just use pop
        //else if item destroyed we know its becauseit was built into bigger item

        //this is the array that will hold all the inventories
        let enemyInventories = []
        //goes through each player on enemy team
        for (let i = 0; i < allFilteredPurchases.length; i++) {
            //this will be the array that stores the inventory of each champ
            let inventory = []
            //goes through all item events for each enemy
            for (let j = 0; j < allFilteredPurchases[i].length; j++) {
                if (allFilteredPurchases[i][j].type === "ITEM_PURCHASED") {
                    inventory.push(allFilteredPurchases[i][j])
                } else if (allFilteredPurchases[i][j].type === "ITEM_SOLD" || allFilteredPurchases[i][j].type === "ITEM_DESTROYED") {
                    for (let k = 0; k < inventory.length; k++) {
                        if (allFilteredPurchases[i][j].itemId === inventory[k].itemId) {
                            inventory.splice(k, 1)
                            break
                        }
                    }
                } else if (allFilteredPurchases[i][j].type === "ITEM_UNDO") {
                    inventory.pop()
                }
                //console.log("INEVENTORY IN LOOP: ", inventory)
            }
            console.log(props.playerBios[allFilteredPurchases[i][0].participantId - 1][3], " Inventory at: ", time, " : ", inventory)
            enemyInventories.push(inventory)
        }
        return enemyInventories
    }

    const handleButtonPress = e => {
        e.preventDefault()
        //console.log("E: ", e)
        //console.log("PUSH")
        //suggestItems()
        setEnemyStuff(filterEnemyItemsByTimestamp(props.purchaseGroup[0].timestamp))
        setPurchaseGroupTags(suggestItems())
        //setShowResult(true)
    }
    useEffect(() => {
        if (purchaseGroupTags !== undefined && enemyStuff !== undefined) {
            setShowResult(!showResult)
            setShowEnemies(!showEnemies)
        }
    }, [purchaseGroupTags, enemyStuff])

    return (
        <div style={{ display: "inlineFlex" }} >
            <button className="itemButton" style={{ float: 'none' }} onClick={handleButtonPress}>{time}</button>
            {showResult && <ItemSuggestion purchaseGroupTags={purchaseGroupTags} specificFrameInterval={specificFrameInterval} itemJson={props.itemJson} />}
            {showEnemies && enemyStuff.map(enemy => (
                <div key={getUniqueKey()} >
                    <Enemies enemyItems={enemy} playerBios={props.playerBios} itemJson={props.itemJson} />
                </div>
            ))}
            {props.purchaseGroup.map(purchase => (
                <div key={getUniqueKey()} style={{ display: "inlineFlex", float: 'none' }}>
                    <AnalysisItem item={purchase.itemId} itemJson={props.itemJson} test={purchase.type} />
                </div>
            ))}
        </div>
    )
}

export default PurchaseGroup