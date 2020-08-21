import React from 'react'
import Item from '../../../Items/Item'
import {getChampionPic} from '../../../../RiotAPI'

const Player = props => {

    console.log("PLAYER PROPS: ", props)

    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }



    return(
        <div style={{display: "inlineFlex", float: 'right', backgroundColor: '#add8e6', height: '330px', width:'200px'}} >
                YOUR CURRENT INVENTORY
            <img className="championImage" src={getChampionPic(props.playerBios[props.playerInventory[0].participantId-1][3])} alt="loading" />
            
            {props.playerInventory.map(item => (
                <div key={getUniqueKey()}>
                    <Item item={item.itemId} itemJson={props.itemJson}/>
                </div>
            ))}
        </div>
    )
}

export default Player