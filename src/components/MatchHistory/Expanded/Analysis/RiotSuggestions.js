import React, { useEffect, useState } from 'react'
import Item from '../../../Items/Item'
const RiotSuggestions = props => {
    const [hasSmite, setHasSmite] = useState()
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        if (props.gameData.participants[props.participantId].spell1Id === 11 || props.gameData.participants[props.participantId].spell2Id === 11) {
            setHasSmite(true)
        } else {
            setHasSmite(false)
        }
    }, [])
    //console.log("RIOT SUGGESTION PROPS: ", props)

    useEffect(() => {
        if (hasSmite !== undefined) {
            setShowResults(true)
        }
    }, [hasSmite])
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }


    if (props.showIfSummonerSpell === "SummonerSmite") {
        if (hasSmite) {
            return (
                <div style={{}}>
                    <br></br>
                    <br></br>
                    {props.type}
                    {props.items.map(item => (
                        <div style={{ display: 'inlineFlex', float: 'left' }} key={getUniqueKey()}>
                            <Item item={item.id} itemJson={props.itemJson} />
                        </div>
                    ))}
                </div>
            )
        } else {
            return <div></div>
        }
        
    } else if (props.showIfSummonerSpell !== "SummonerSmite") {
        if(!hasSmite) { 
            return (
                <div style={{}}>
                    <br></br>
                    <br></br>
                    {props.type}
                    {props.items.map(item => (
                        <div style={{ display: 'inlineFlex', float: 'left' }} key={getUniqueKey()}>
                            <Item item={item.id} itemJson={props.itemJson} />
                        </div>
                    ))}
                </div>
            )
        } else {
            return <div></div>
        }
    }
    else {
        return <div></div>
    }

}

export default RiotSuggestions