import React, {useState} from 'react'
import Item from '../../../Items/Item'

const ItemTimeline = props => {
    console.log("ITEM TIMELINE PROPS: ", props)
    return(
        <div>
            this is going to be the timeline that draws the items, gotta do some math to space out when you bought items
            {props.analysisTimeline.map(itemPurchase => (
                <div key={itemPurchase.timestamp}>
                    <Item itemJson={props.itemJson} item={itemPurchase.itemId}/>
                </div>
            ))}
        </div>
    )
}

export default ItemTimeline