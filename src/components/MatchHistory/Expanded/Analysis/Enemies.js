import React from 'react'
import {
    getChampionPic,
} from '../../../../RiotAPI'
import Item from '../../../Items/Item'



const Enemies = props => {
    //console.log("ENEMY PROPS: ", props)
    
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }
    let armor
    let magicResist
    if (props.enemyItems[0] !== undefined) {
        let playerId = props.playerBios[props.enemyItems[0].participantId-1][4]
        //console.log("Player ID: ", playerId)
        armor = props.enemyResistances[playerId - 1][0]
        magicResist = props.enemyResistances[playerId - 1][1]
    } else {
        return(
            <div>

            </div>
        )
    }
    
    

    return (
        <div style={{display: "inlineFlex", float: 'right', backgroundColor: 'red', height: '330px', width:'200px'}} >
            
            <img className="championImage" src={getChampionPic(props.playerBios[props.enemyItems[0].participantId-1][3])} alt="loading" />
            No Item Armor: {armor} No Item Magic Resist: {magicResist}
            
            {props.enemyItems.map(item => (
                <div key={getUniqueKey()}>
                    <Item item={item.itemId} itemJson={props.itemJson}/>
                </div>
            ))}
        </div>
    )
}

export default Enemies

/*



*/