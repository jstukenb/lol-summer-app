import React, { useState, useEffect } from 'react'
import Item from '../../../Items/Item'
import { getDamageJson } from '../../../../RiotAPI'
import ItemSuggestion from './ItemSuggestion'
import AnalysisItem from '../../../Items/AnalysisItem'
import Enemies from './Enemies'
import Player from './Player'


const PurchaseGroup = props => {
    //console.log("PURCHASE GROUP POG: ", props)
    //console.log("HERE: ", props.purchaseGroup[0].timestamp)
    const [showResult, setShowResult] = useState(false)
    const [purchaseGroupTags, setPurchaseGroupTags] = useState()
    const [showEnemies, setShowEnemies] = useState(false)
    const [enemyInventories, setEnemyInventories] = useState()
    const [enemyResistances, setEnemyResistances] = useState()
    const [enemyItemStats, setEnemyItemStats] = useState()

    const [blurb, setBlurb] = useState()

    const [suggestionList, setSuggestionList] = useState()
    const [playerInventory, setPlayerInventory] = useState()

    const [enemyPhysicalTag, setEnemyPhysicalTag] = useState(false)
    const [enemyMagicTag, setEnemyMagicTag] = useState(false)

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
            0: props.gameTimeline.frames[frameInterval].participantFrames[1].participantId,
            1: props.gameTimeline.frames[frameInterval].participantFrames[2].participantId,
            2: props.gameTimeline.frames[frameInterval].participantFrames[3].participantId,
            3: props.gameTimeline.frames[frameInterval].participantFrames[4].participantId,
            4: props.gameTimeline.frames[frameInterval].participantFrames[5].participantId,
            5: props.gameTimeline.frames[frameInterval].participantFrames[6].participantId,
            6: props.gameTimeline.frames[frameInterval].participantFrames[7].participantId,
            7: props.gameTimeline.frames[frameInterval].participantFrames[8].participantId,
            8: props.gameTimeline.frames[frameInterval].participantFrames[9].participantId,
            9: props.gameTimeline.frames[frameInterval].participantFrames[10].participantId
        }
        //console.log("NEW THING: ", participantInfoKey)
        //let armorAndMagicResist = []
        //console.log("FRAME INTERVAL OF PURCHASE : ", frameInterval)
        //console.log("Participant Frames at frameinterval interval: ", props.gameTimeline.frames[frameInterval].participantFrames)
        // need to grab level of all players
        //let armorThenMagicResist = []
        let listOfResistances = []
        if (color === "blue") {
            for (let i = 0; i < 5; i++) {
                let armorThenMagicResist = []
                let level = props.gameTimeline.frames[frameInterval].participantFrames[i + 1].level
                let armor = props.championJson.data[props.playerBios[participantInfoKey[i] - 1][3]].stats.armor
                let armorPerLevel = props.championJson.data[props.playerBios[participantInfoKey[i] - 1][3]].stats.armorperlevel
                let totalArmor = armor + (armorPerLevel * level)
                armorThenMagicResist.push(totalArmor)
                let magicResist = props.championJson.data[props.playerBios[participantInfoKey[i] - 1][3]].stats.spellblock
                let magicResistPerLevel = props.championJson.data[props.playerBios[participantInfoKey[i] - 1][3]].stats.spellblockperlevel
                let totalMagicResist = magicResist + (magicResistPerLevel * level)
                armorThenMagicResist.push(totalMagicResist)
                listOfResistances[participantInfoKey[i] - 1] = armorThenMagicResist
            }
            //console.log("ARMOR THEN MR: ", listOfResistances)
            setEnemyResistances(listOfResistances)
        } else if (color === "red") {
            for (let i = 5; i < props.playerBios.length; i++) {
                let armorThenMagicResist = []
                let level = props.gameTimeline.frames[frameInterval].participantFrames[i + 1].level
                //console.log("I: ", i, " Level: ", level)
                let armor = props.championJson.data[props.playerBios[participantInfoKey[i] - 1][3]].stats.armor
                let armorPerLevel = props.championJson.data[props.playerBios[participantInfoKey[i] - 1][3]].stats.armorperlevel
                let totalArmor = armor + (armorPerLevel * level)
                armorThenMagicResist.push(totalArmor)
                let magicResist = props.championJson.data[props.playerBios[participantInfoKey[i] - 1][3]].stats.spellblock
                let magicResistPerLevel = props.championJson.data[props.playerBios[participantInfoKey[i] - 1][3]].stats.spellblockperlevel
                let totalMagicResist = magicResist + (magicResistPerLevel * level)
                armorThenMagicResist.push(totalMagicResist)
                listOfResistances[participantInfoKey[i] - 1] = armorThenMagicResist
            }
            //console.log("ARMOR THEN MR: ", listOfResistances)
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

    function filterUserItemsByTimestamp(timestamp) {
        let userFilteredPurchases = []
        for (let i=0; i<props.userItems.length; i++) {
            if (props.userItems[i].timestamp < timestamp) {
                userFilteredPurchases.push(props.userItems[i])
            } else {
                break
            }
        }
        let userInventory = []
        for (let i=0; i<userFilteredPurchases.length; i++) {
            if (userFilteredPurchases[i].type === "ITEM_PURCHASED") {
                userInventory.push(userFilteredPurchases[i])
            } else if (userFilteredPurchases[i].type === "ITEM_SOLD" || userFilteredPurchases[i].type === "ITEM_DESTROYED") {
                for (let k = 0; k < userInventory.length; k++) {
                    if (userFilteredPurchases[i].itemId === userInventory[k].itemId) {
                        userInventory.splice(k, 1)
                        break
                    }
                }
            } else if (userFilteredPurchases[i].type === "ITEM_UNDO") {
                userInventory.pop()
            }
        }
        console.log("PLEASE WORK: ", userInventory)

        return userInventory
    }

    function filterEnemyItemsByTimestamp(timestamp) {
        //console.log("MONEY SHOT: ", timestamp)
        let allFilteredPurchases = []
        for (let i = 0; i < props.allEnemyItems.length; i++) {
            let individualFilteredPurchases = []
            //let j = 0
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
        //console.log("FILTERED FILTERED: ", allFilteredPurchases)
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
            if (allFilteredPurchases[i][0] !== undefined) {
                console.log(props.playerBios[allFilteredPurchases[i][0].participantId - 1][3], " Inventory at: ", time, " : ", inventory)
            }

            enemyInventories.push(inventory)
        }
        handleItemStats(grabItemStats(enemyInventories))

        return enemyInventories
    }

    function grabItemStats(enemyInventories) {
        let allEnemyStatMods = []
        //console.log("CUM: ", Object.keys(props.itemJson.data[enemyInventories[3][1].itemId].stats).length)
        for (let i = 0; i < enemyInventories.length; i++) {
            let enemyStatMods = []
            for (let j = 0; j < enemyInventories[i].length; j++) {
                //let enemyStatMods = []
                if (Object.keys(props.itemJson.data[enemyInventories[i][j].itemId].stats).length > 0) {
                    //console.log("STATS OF ", enemyInventories[i][j].itemId, " : ", props.itemJson.data[enemyInventories[i][j].itemId].stats)
                    Object.keys(props.itemJson.data[enemyInventories[i][j].itemId].stats).forEach(key => {
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

    function handleItemStats(allEnemyStatMods) {
        console.log("all enemy stat mods: ", allEnemyStatMods)
        let listOfStatMods = []

        if (allEnemyStatMods !== undefined) {

            for (let i = 0; i < allEnemyStatMods.length; i++) {
                let physicalMagicArmorSpellBlock = []
                let magicDamageCount = 0
                let physicalDamageCount = 0
                let armorCount = 0
                let spellBlockCount = 0
                for (let j = 0; j < allEnemyStatMods[i].length; j += 2) {
                    if (allEnemyStatMods[i][j] === "FlatMagicDamageMod") {
                        //console.log("MAGIC PLUS: ", allEnemyStatMods[i][j+1])
                        magicDamageCount += allEnemyStatMods[i][j + 1]
                    } else if (allEnemyStatMods[i][j] === "FlatPhysicalDamageMod") {
                        //console.log("PHYSICAL PLUS: ", allEnemyStatMods[i][j+1])
                        physicalDamageCount += allEnemyStatMods[i][j + 1]
                    } else if (allEnemyStatMods[i][j] === "FlatArmorMod") {
                        //console.log("ARMOR PLUS: ", allEnemyStatMods[i][j+1])
                        armorCount += allEnemyStatMods[i][j + 1]
                    } else if (allEnemyStatMods[i][j] === "FlatSpellBlockMod") {
                        //console.log("SPELLBLOCK PLUS: ", allEnemyStatMods[i][j+1])
                        spellBlockCount += allEnemyStatMods[i][j + 1]
                    }
                }
                physicalMagicArmorSpellBlock = [physicalDamageCount, magicDamageCount, armorCount, spellBlockCount]
                listOfStatMods.push(physicalMagicArmorSpellBlock)
                console.log("LIST OF MODS: ", physicalMagicArmorSpellBlock)
                //console.log()
            }
            console.log("PHYSICAL MAGIC ARMOR SPELLBLOCK: ", listOfStatMods)
            let champsWithPhysical = 0
            let champsWithMagic = 0
            let champsWithArmor = 0
            let champsWithSpellBlock = 0
            for (let i = 0; i < listOfStatMods.length; i++) {
                if (listOfStatMods[i][0] !== 0) {
                    champsWithPhysical++
                }
                if (listOfStatMods[i][1] !== 0) {
                    champsWithMagic++
                }
                if (listOfStatMods[i][2] !== 0) {
                    champsWithArmor++
                }
                if (listOfStatMods[i][3] !== 0) {
                    champsWithSpellBlock++
                }
            }
            console.log("PHYSICAL: ", champsWithPhysical, " MAGIC: ", champsWithMagic, " ARMOR: ", champsWithArmor, " SPELLBLOCK: ", champsWithSpellBlock)
            let physicalTag = false
            let magicTag = false
            let blurb = ""
            if (champsWithPhysical >= 3) {
                blurb = blurb + "Enemy team has " + champsWithPhysical + " champions who are building physical damage. "
                physicalTag = true
            }
            if (champsWithMagic >= 3) {
                blurb = blurb + "Enemy team has " + champsWithMagic + " champions who are building magic damage. "
                magicTag = true
            }
            if (champsWithArmor >= 2) {
                blurb = blurb + "Enemy team has " + champsWithArmor + " champions who are building armor. "

            }
            if (champsWithSpellBlock >= 2) {
                blurb = blurb + "Enemy team has " + champsWithSpellBlock + " champions who are building magic resist. "
            }
            if ((champsWithPhysical && champsWithMagic) <= 2) {
                console.log("Pretty even spread of who is building what")
            }
            console.log("BLURB: ", blurb)
            //TAGS: Damage, SpellDamage, Armor, SpellBlock 
            setBlurb(blurb)
            setEnemyMagicTag(magicTag)
            setEnemyPhysicalTag(physicalTag)
            //createListOfSuggestions(enemyMagicTag, enemyPhysicalTag)
            
        }

    }
    useEffect(() => {
        if (playerInventory !== undefined) {
            if (props.userDamageType === "Tank") {
                var dict = []
            for (let key in props.itemJson.data) {
                console.log("KEY: ", key)
                //console.log("CUM: ", props.itemJson.data[key].tags.includes("Damage"))
                if (enemyMagicTag && enemyPhysicalTag) {
                    //console.log("POOP SOCK: ", props.itemJson.data[key].tags.includes("SpellBlock"))
                    if ( props.itemJson.data[key].tags.includes("SpellBlock") || (props.itemJson.data[key].tags.includes("Armor")) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                        if (checkIfSuggestionInInventory(key)) {
                            console.log("Already Own Suggestion")
                        } else {
                            dict.push({
                                key: key,
                                value: props.itemJson.data[key]
                            })
                        }
                        
                    }
                } else if (enemyMagicTag) {
                    if (props.itemJson.data[key].tags.includes("SpellBlock") && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                        //console.log("ARMOR")
                        if (checkIfSuggestionInInventory(key)) {
                            console.log("MR")
                        } else {
                            dict.push({
                                key: key,
                                value: props.itemJson.data[key]
                            })
                        }

                    }
                } else if (enemyPhysicalTag) {
                    if (props.itemJson.data[key].tags.includes("Armor") && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                        if (checkIfSuggestionInInventory(key)) {
                            console.log("ARMOR")
                        } else {
                            dict.push({
                                key: key,
                                value: props.itemJson.data[key]
                            })
                        }
                        //console.log("ARMOR")
                        
                    }
                } else {
                    //console.log("BANANA: ", props.riotRecommended[props.riotRecommendedId].items.length)
                    
                    for (let i=0; i<props.essentialBlock.items.length; i++){
                        //console.log("I: ", i)
                        if (checkIfSuggestionInInventory(props.essentialBlock.items[i].id)) {
                            console.log("ALRTEADY OWN")
                        } else {
                            dict.push({
                                key: props.essentialBlock.items[i].id,
                                value: props.itemJson.data[props.essentialBlock.items[i].id]
                            })
                        }
                        
                    }
                    break
                }
            }
            } else {
                var dict = []
                for (let key in props.itemJson.data) {
                    console.log("KEY: ", key)
                    //console.log("CUM: ", props.itemJson.data[key].tags.includes("Damage"))
                    if (enemyMagicTag && enemyPhysicalTag) {
                        //console.log("POOP SOCK: ", props.itemJson.data[key].tags.includes("SpellBlock"))
                        if ( (props.itemJson.data[key].tags.includes("SpellBlock") && props.itemJson.data[key].tags.includes(props.userDamageType) ) || (props.itemJson.data[key].tags.includes("Armor")) && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                            if (checkIfSuggestionInInventory(key)) {
                                console.log("MR AND ARMOR")
                            } else {
                                dict.push({
                                    key: key,
                                    value: props.itemJson.data[key]
                                })
                            }
                            
                        }
                    } else if (enemyMagicTag && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                        if (props.itemJson.data[key].tags.includes("SpellBlock") && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                            //console.log("ARMOR")
                            if (checkIfSuggestionInInventory(key)) {
                                console.log("MR")
                            } else {
                                dict.push({
                                    key: key,
                                    value: props.itemJson.data[key]
                                })
                            }
                            
                        }
                    } else if (enemyPhysicalTag && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                        if (props.itemJson.data[key].tags.includes("Armor")) {
                            if (checkIfSuggestionInInventory(key)) {
                                console.log("ARMOR")
                            } else {
                                dict.push({
                                    key: key,
                                    value: props.itemJson.data[key]
                                })
                            }
                            //console.log("ARMOR")
                            
                        }
                    } else {
                        //console.log("BANANA: ", props.riotRecommended[props.riotRecommendedId].items.length)
                        
                        for (let i=0; i<props.essentialBlock.items.length; i++){
                            //console.log("I: ", i)
                            if (checkIfSuggestionInInventory(props.essentialBlock.items[i].id)) {
                                console.log("ALRTEADY OWN")
                            } else {
                                dict.push({
                                    key: props.essentialBlock.items[i].id,
                                    value: props.itemJson.data[props.essentialBlock.items[i].id]
                                })
                            }
                            
                        }
                        break
                    }
                }
                
            }
            
    
            console.log("DICT: ", dict)
            setSuggestionList(dict)
        }
    }, [enemyMagicTag, enemyPhysicalTag, playerInventory])
    
    function checkIfSuggestionInInventory(itemId) {
        for (let i=0; i<playerInventory.length; i++) {
            if (itemId === playerInventory[i].itemId.toString()) {
                console.log("ALREADY PURCHASED")
                return true
            }
        }
    }

    const createListOfSuggestions = (enemyMagicTag, enemyPhysicalTag) => {
        var dict = []
        for (let key in props.itemJson.data) {
            //console.log("KEY: ", key)
            //console.log("CUM: ", props.itemJson.data[key].tags.includes("Damage"))
            if (enemyMagicTag && enemyPhysicalTag) {
                //console.log("POOP SOCK: ", props.itemJson.data[key].tags.includes("SpellBlock"))
                if ( (props.itemJson.data[key].tags.includes("SpellBlock") && props.itemJson.data[key].tags.includes(props.userDamageType) ) || (props.itemJson.data[key].tags.includes("Armor")) && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                    dict.push({
                        key: key,
                        value: props.itemJson.data[key]
                    })
                }
            } else if (enemyMagicTag && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                if (props.itemJson.data[key].tags.includes("SpellBlock") && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                    //console.log("ARMOR")
                    dict.push({
                        key: key,
                        value: props.itemJson.data[key]
                    })
                }
            } else if (enemyPhysicalTag && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].tags.includes(props.userDamageType) && props.itemJson.data[key].maps[props.gameData.mapId] === true) {
                if (props.itemJson.data[key].tags.includes("Armor")) {
                    //console.log("ARMOR")
                    dict.push({
                        key: key,
                        value: props.itemJson.data[key]
                    })
                }
            } else {
                //console.log("BANANA: ", props.riotRecommended[props.riotRecommendedId].items.length)
                for (let i=0; i<props.essentialBlock.items.length; i++){
                    //console.log("I: ", i)
                    dict.push({
                        key: props.essentialBlock.items[i].id,
                        value: props.itemJson.data[props.essentialBlock.items[i].id]
                    })
                }
                break
            }
        }

        console.log("DICT: ", dict)
        for (let item in dict) {
            console.log("KEY: ", item, " SHIT: ", dict[item].key)
            for (let i=0; i<playerInventory.length; i++) {
                if (playerInventory[i].itemId === dict[item].key) {
                    console.log("Already own suggested item: ")
                    dict.delete(dict[item])
                }
            }
        }
        console.log("NEW DICT: ", dict)
        setSuggestionList(dict)
    }
    const handleButtonPress = e => {
        e.preventDefault()
        setPurchaseGroupTags(suggestItems())
        setPlayerInventory(filterUserItemsByTimestamp(props.purchaseGroup[props.purchaseGroup.length-1].timestamp + 10))
        setEnemyInventories(filterEnemyItemsByTimestamp(props.purchaseGroup[0].timestamp))

    }

    useEffect(() => {
        console.log("SUGGESTION LIST: ", suggestionList)
        if (purchaseGroupTags !== undefined && enemyInventories !== undefined && enemyResistances !== undefined && blurb !== undefined && suggestionList !== undefined) {
            setShowResult(!showResult)
            setShowEnemies(!showEnemies)
            //handleItemStats()
        }
    }, [purchaseGroupTags, enemyInventories, enemyResistances, blurb, suggestionList])

    return (
        <div style={{display:'box'  }} >
            <button className="itemButton" style={{ float: 'none' }} onClick={handleButtonPress}>{time}</button>
            {showResult && <Player playerInventory={playerInventory} playerBios={props.playerBios} itemJson={props.itemJson}/>}
            {showResult && <ItemSuggestion suggestionList={suggestionList} purchaseGroupTags={purchaseGroupTags} specificFrameInterval={specificFrameInterval} itemJson={props.itemJson} />}
            {showEnemies && <div> {blurb}</div>}
            {showEnemies && enemyInventories.map(enemy => (
                <div key={getUniqueKey()} >
                    <Enemies enemyItems={enemy} playerBios={props.playerBios} itemJson={props.itemJson} enemyResistances={enemyResistances} enemyItemStats={enemyItemStats} />
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