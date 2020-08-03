import React, {useState, useEffect} from 'react'
import Item from '../../../Items/Item'
import {getDamageJson} from '../../../../RiotAPI'
import ItemSuggestion from './ItemSuggestion'


const PurchaseGroup = props => {
    //console.log("PURCHASE GROUP POG: ", props)
    const [showResult, setShowResult] = useState(false)
    const [purchaseGroupTags, setPurchaseGroupTags] = useState()
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }

    let time = props.purchaseGroup[0].timestamp / 1000
    if (time % 60 !== 0) {
        let seconds = "" + Math.floor(time % 60)
        if (seconds < 10 ) {
            seconds = "0"+seconds
        }
        time = time / 60
        time = Math.floor(time)
        time = time + ":" + seconds
    } else {
        time = time / 60
    }

    let specificFrameInterval = Math.floor(props.purchaseGroup[0].timestamp/60000) + 1
    let tempPurchaseGroupTags = []
    function suggestItems() {
        
        for (let i=0; i<props.purchaseGroup.length; i++) {
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

    function filterEnemyItemsByTimestamp(timestamp) {
        //console.log("MONEY SHOT: ", timestamp)
        let allFilteredPurchases = []
        for (let i=0; i<props.allEnemyItems.length; i++) {
            let individualFilteredPurchases = []
            let j=0
            for (let j=0; j<props.allEnemyItems[i].length; j++) {
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
    }
    const handleButtonPress = e => {
        e.preventDefault()
        //console.log("E: ", e)
        //console.log("PUSH")
        //suggestItems()
        filterEnemyItemsByTimestamp(props.purchaseGroup[0].timestamp)
        setPurchaseGroupTags(suggestItems())
        //setShowResult(true)
    }
    useEffect(() => {
        if(purchaseGroupTags !== undefined) {
            setShowResult(!showResult)
        }
    }, [purchaseGroupTags])

    return(
        <div>
            <button className="itemButton"  onClick={handleButtonPress}>{time}</button>
            {showResult && <ItemSuggestion purchaseGroupTags={purchaseGroupTags} specificFrameInterval={specificFrameInterval} itemJson={props.itemJson}/>}
            {props.purchaseGroup.map(purchase => (
                <div key={getUniqueKey()}>
                    <Item item={purchase.itemId} itemJson={props.itemJson}/>
                </div>
            ))}
        </div>
    )
}

export default PurchaseGroup