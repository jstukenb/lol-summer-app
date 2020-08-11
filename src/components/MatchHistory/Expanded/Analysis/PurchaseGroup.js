import React, { useState, useEffect } from 'react'
import Item from '../../../Items/Item'
import { getDamageJson } from '../../../../RiotAPI'
import ItemSuggestion from './ItemSuggestion'
import AnalysisItem from '../../../Items/AnalysisItem'
import Enemies from './Enemies'


const PurchaseGroup = props => {
    //console.log("PURCHASE GROUP POG: ", props)
    //console.log("HERE: ", props.purchaseGroup[0].timestamp)
    const [showResult, setShowResult] = useState(false)
    const [purchaseGroupTags, setPurchaseGroupTags] = useState()
    const [showEnemies, setShowEnemies] = useState(false)
    const [enemyInventories, setEnemyInventories] = useState()
    const [enemyResistances, setEnemyResistances] = useState()
    const [enemyItemStats, setEnemyItemStats] = useState()

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
        let frameInterval = Math.floor(props.purchaseGroup[0].timestamp / 60000 + 1)
        //console.log(props.gameTimeline.frames[frameInterval].participantFrames)
        let participantInfoKey = {
            0 : props.gameTimeline.frames[frameInterval].participantFrames[1].participantId,
            1 : props.gameTimeline.frames[frameInterval].participantFrames[2].participantId,
            2 : props.gameTimeline.frames[frameInterval].participantFrames[3].participantId,
            3 : props.gameTimeline.frames[frameInterval].participantFrames[4].participantId,
            4 : props.gameTimeline.frames[frameInterval].participantFrames[5].participantId,
            5 : props.gameTimeline.frames[frameInterval].participantFrames[6].participantId,
            6 : props.gameTimeline.frames[frameInterval].participantFrames[7].participantId,
            7 : props.gameTimeline.frames[frameInterval].participantFrames[8].participantId,
            8 : props.gameTimeline.frames[frameInterval].participantFrames[9].participantId,
            9 : props.gameTimeline.frames[frameInterval].participantFrames[10].participantId
        }
        console.log("NEW THING: ", participantInfoKey)
        let armorAndMagicResist = []
        console.log("FRAME INTERVAL OF PURCHASE : ", frameInterval)
        console.log("Participant Frames at frameinterval interval: ", props.gameTimeline.frames[frameInterval].participantFrames)
        // need to grab level of all players
        //let armorThenMagicResist = []
        let listOfResistances = []
        if (color === "blue") {
            for (let i = 0; i < 5; i++) {
                let armorThenMagicResist = []
                let level = props.gameTimeline.frames[frameInterval].participantFrames[i+1].level
                let armor = props.championJson.data[props.playerBios[participantInfoKey[i]-1][3]].stats.armor
                let armorPerLevel = props.championJson.data[props.playerBios[participantInfoKey[i]-1][3]].stats.armorperlevel
                let totalArmor = armor + (armorPerLevel * level)
                armorThenMagicResist.push(totalArmor)
                let magicResist = props.championJson.data[props.playerBios[participantInfoKey[i]-1][3]].stats.spellblock
                let magicResistPerLevel = props.championJson.data[props.playerBios[participantInfoKey[i]-1][3]].stats.spellblockperlevel
                let totalMagicResist = magicResist + (magicResistPerLevel * level)
                armorThenMagicResist.push(totalMagicResist)
                listOfResistances[participantInfoKey[i]-1] = armorThenMagicResist
            }
            console.log("ARMOR THEN MR: ", listOfResistances)
            setEnemyResistances(listOfResistances)
        } else if (color === "red") {
            for (let i = 5; i < props.playerBios.length; i++) {
                let armorThenMagicResist = []
                let level = props.gameTimeline.frames[frameInterval].participantFrames[i+1].level
                console.log("I: ", i, " Level: ", level)
                let armor = props.championJson.data[props.playerBios[participantInfoKey[i]-1][3]].stats.armor
                let armorPerLevel = props.championJson.data[props.playerBios[participantInfoKey[i]-1][3]].stats.armorperlevel
                let totalArmor = armor + (armorPerLevel * level)
                armorThenMagicResist.push(totalArmor)
                let magicResist = props.championJson.data[props.playerBios[participantInfoKey[i]-1][3]].stats.spellblock
                let magicResistPerLevel = props.championJson.data[props.playerBios[participantInfoKey[i]-1][3]].stats.spellblockperlevel
                let totalMagicResist = magicResist + (magicResistPerLevel * level)
                armorThenMagicResist.push(totalMagicResist)
                listOfResistances[participantInfoKey[i]-1] = armorThenMagicResist
            }
            console.log("ARMOR THEN MR: ", listOfResistances)
            setEnemyResistances(listOfResistances)
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
        handleItemStats(grabItemStats(enemyInventories))
        
        return enemyInventories
    }

    function grabItemStats(enemyInventories) {
        let allEnemyStatMods = []
        //console.log("CUM: ", Object.keys(props.itemJson.data[enemyInventories[3][1].itemId].stats).length)
        for (let i=0;i<enemyInventories.length; i++) {
            let enemyStatMods = []
            for( let j=0; j<enemyInventories[i].length; j++) {
                //let enemyStatMods = []
                if (Object.keys(props.itemJson.data[enemyInventories[i][j].itemId].stats).length > 0) {
                    //console.log("STATS OF ", enemyInventories[i][j].itemId, " : ", props.itemJson.data[enemyInventories[i][j].itemId].stats)
                    Object.keys(props.itemJson.data[enemyInventories[i][j].itemId].stats).forEach( key => {
                        //console.log("IN THE FOR EACH: ", key, ", Actual number: ", props.itemJson.data[enemyInventories[i][j].itemId].stats[key])
                        enemyStatMods.push(key)
                        enemyStatMods.push(props.itemJson.data[enemyInventories[i][j].itemId].stats[key])
                    })
                    //console.log("ENEMY STAT MODS ARRAY: ", enemyStatMods)
                    
                } else {
                    //console.log("Item doesn't give stats")
                    //console.log("ITEM DOESN;T GIVE STATS: ". props.itemJson.data[enemyInventories[i][j].itemId].stats)
                }
                
            }
            allEnemyStatMods.push(enemyStatMods)
        }
        console.log("FINAL THING:: ", allEnemyStatMods)
        return allEnemyStatMods
    }

    function handleItemStats (allEnemyStatMods) {
        //console.log("ENEMY STATS: ", allEnemyStatMods)
        let magicDamageCount = 0
        let physicalDamageCount = 0
        let armorCount = 0
        let spellBlockCount = 0
        
        if (allEnemyStatMods !== undefined) {
            for (let i=0; i<allEnemyStatMods.length; i++) {
                for (let j=0; j<allEnemyStatMods[i].length; j+=2) {
                    if (allEnemyStatMods[i][j] === "FlatMagicDamageMod") {
                        console.log("MAGIC PLUS: ", allEnemyStatMods[i][j+1])
                        magicDamageCount += allEnemyStatMods[i][j+1]
                    } else if (allEnemyStatMods[i][j] === "FlatPhysicalDamageMod") {
                        console.log("PHYSICAL PLUS: ", allEnemyStatMods[i][j+1])
                        physicalDamageCount += allEnemyStatMods[i][j+1]
                    } else if (allEnemyStatMods[i][j] === "FlatArmorMod") {
                        console.log("ARMOR PLUS: ", allEnemyStatMods[i][j+1])
                        armorCount += allEnemyStatMods[i][j+1]
                    } else if (allEnemyStatMods[i][j] === "FlatSpellBlockMod") {
                        console.log("SPELLBLOCK PLUS: ", allEnemyStatMods[i][j+1])
                        spellBlockCount += allEnemyStatMods[i][j+1]
                    }
                }
            }
            console.log("final magic damage count; ", magicDamageCount)
            console.log("final phsyical damage count: ", physicalDamageCount)
            console.log("final armor count; ", armorCount)
            console.log("final spellblock count: ", spellBlockCount)
        }
        
    }

    const handleButtonPress = e => {
        e.preventDefault()
        setEnemyInventories(filterEnemyItemsByTimestamp(props.purchaseGroup[0].timestamp))
        setPurchaseGroupTags(suggestItems())
    }

    useEffect(() => {
        if (purchaseGroupTags !== undefined && enemyInventories !== undefined && enemyResistances !== undefined) {
            setShowResult(!showResult)
            setShowEnemies(!showEnemies)
            handleItemStats()
        }
    }, [purchaseGroupTags, enemyInventories, enemyResistances])

    return (
        <div style={{ display: "inlineFlex" }} >
            <button className="itemButton" style={{ float: 'none' }} onClick={handleButtonPress}>{time}</button>
            {showResult && <ItemSuggestion purchaseGroupTags={purchaseGroupTags} specificFrameInterval={specificFrameInterval} itemJson={props.itemJson} />}
            {showEnemies && <div> POOP</div>}
            {showEnemies && enemyInventories.map(enemy => (
                <div key={getUniqueKey()} >
                    <Enemies enemyItems={enemy} playerBios={props.playerBios} itemJson={props.itemJson} enemyResistances={enemyResistances} enemyItemStats={enemyItemStats}/>
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