import React from 'react'
import {
    getChampionPic,
} from '../../../../RiotAPI'
import Item from '../../../Items/Item'



const Enemies = props => {
    console.log("ENEMY PROPS: ", props)
    
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }


    return (
        <div style={{display: "inlineFlex", float: 'right', backgroundColor: '#add8e6', height: '200px', width:'200px'}} >
            ASDF
            <img className="championImage" src={getChampionPic(props.playerBios[props.enemyItems[0].participantId-1][3])} alt="loading" />
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