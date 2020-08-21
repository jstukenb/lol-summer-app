import React, {useState, useEffect} from 'react'
import Item from '../../../Items/Item'
import RiotSuggestions from './RiotSuggestions'
import PurchaseGroup from './PurchaseGroup'

const ItemTimeline = props => {
    //console.log("ITEM TIMELINE PROPS: ", props)
    const [userDamageType, setUserDamageType] = useState()
    const [showNextComponent, setShowNextComponent] = useState(false)
    const [essentialBlock, setEssentialBlock] = useState()
    //const [summonersRiftRecommendedId, setSummonersRiftRecommendedId] = useState()

    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }
    let hasSmite
    if (props.gameData.participants[props.participantId].spell1Id === 11 || props.gameData.participants[props.participantId].spell2Id === 11) {
        hasSmite = true
    } else {
        hasSmite = false
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
    let riotRecommendedId
    for (let i=0; i<props.championJson.data[props.playerBios[props.participantId][3]].recommended.length; i++) {
        if (props.championJson.data[props.playerBios[props.participantId][3]].recommended[i].map === "SR" && props.championJson.data[props.playerBios[props.participantId][3]].recommended[i].mode === "CLASSIC") {
            riotRecommendedId = i
        }
    }
    //console.log("TEST: ", props.championJson.data[props.playerBios[props.participantId][3]].recommended)
    
    let riotRecommended = props.championJson.data[props.playerBios[props.participantId][3]].recommended[riotRecommendedId].blocks
    useEffect(() => {
        if (hasSmite) {
            for (let i=0; i<riotRecommended.length; i++) {
                if (riotRecommended[i].type === "essentialjungle" ){
                    console.log("No Smite")
                    setEssentialBlock(riotRecommended[i])
                }
            }
        } else {
            for (let i=0; i<riotRecommended.length; i++) {
                if (riotRecommended[i].type === "essential" ){
                    console.log("No Smite")
                    setEssentialBlock(riotRecommended[i])
                }
            }
        }
        //console.log("RIOT RECOMMENDED: ", essentialBlock)
    })
    useEffect(() => { 
        if (essentialBlock !== undefined) {
            let physicalCount = 0
            let magicCount = 0
            let armorCount = 0
            let spellBlockCount = 0
            let criticalStrike = false
            for (let i=0; i<props.purchaseGroups.length; i++ ) {
                //console.log("CUM: ", props.purchaseGroups[i])
                let endIt = false
                for (let j=0; j<props.purchaseGroups[i].length; j++) {
                    //console.log("SHART: ", props.itemJson.data[props.purchaseGroups[i][j].itemId].tags.includes("SpellDamage"))
                    if(props.itemJson.data[props.purchaseGroups[i][j].itemId].tags.includes("Damage") ) {
                        //console.log("PHYSICAL")
                        physicalCount++
                    } else if (props.itemJson.data[props.purchaseGroups[i][j].itemId].tags.includes("SpellDamage")) {
                        //console.log("MAGICAL")
                        magicCount++
                    } else if (props.itemJson.data[props.purchaseGroups[i][j].itemId].tags.includes("Armor")) {
                        //console.log("ARMOR")
                        armorCount++
                    } else if (props.itemJson.data[props.purchaseGroups[i][j].itemId].tags.includes("SpellBlock")) {
                        //console.log("SPELLBLOCK")
                        spellBlockCount++
                    }
                }
            }
            //criticalStrike
            console.log("PHYSICAL: ", physicalCount, " Magic: ", magicCount, " Armor: ", armorCount, " SpellBlock: ", spellBlockCount)
            if (armorCount > (magicCount || spellBlockCount || physicalCount)) {
                //console.log("BAZINGA")
                setUserDamageType("Armor")
            } else if (magicCount > (armorCount || spellBlockCount || physicalCount)) {
                //console.log("MAGIC MAGIC")
                setUserDamageType("SpellDamage")
            } else if (physicalCount > (armorCount || spellBlockCount || magicCount)) {
                //console.log("PHYSICAL PHYSICAL")
                setUserDamageType("Damage")
            } else if (spellBlockCount > (armorCount || magicCount || physicalCount)) {
                //console.log("CUYM CUM CUM")
                setUserDamageType("SpellBlock")
            } else if ((armorCount === spellBlockCount) && armorCount > (magicCount || physicalCount)) {
                //console.log("TANKYBOI")
                setUserDamageType("Tank")
            }
        }
    }, [essentialBlock])

    useEffect(() => {
        if(userDamageType !== undefined) {
            console.log("USER DAMAGE TYPE: ", userDamageType)
            setShowNextComponent(true)
        }
    }, [userDamageType])
    
    

    return(
        <div>
            this is going to be the timeline that draws the items, gotta do some math to space out when you bought items
            Normal Recommended items: 
            {props.championJson.data[props.playerBios[props.participantId][3]].recommended[riotRecommendedId].blocks.map(recommended => (
                <div key = {getUniqueKey()}>
                    <RiotSuggestions {...recommended} itemJson={props.itemJson} participantId={props.participantId} playerBios={props.playerBios} gameData={props.gameData}/>
                </div>
            ))}
            <br></br>
            <h1></h1>
            {props.purchaseGroups.map(purchaseGroup => (
                <div key={getUniqueKey()}>
                    <PurchaseGroup userItems={props.userItems} essentialBlock={essentialBlock} userDamageType={userDamageType} gameTimeline={props.gameTimeline} allEnemyItems={props.allEnemyItems}playerBios={props.playerBios} purchaseGroup={purchaseGroup} itemJson={props.itemJson} championJson={props.championJson} participantId={props.participantId} gameData={props.gameData}/>
                </div>
            ))}
        </div>
    )
}

export default ItemTimeline