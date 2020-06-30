import React from 'react'
import Item from './Item'
import '../app.css'

const ItemList = props => {
    return (
        <div className="itemList">
            <div className="row1">
                <Item itemJson={props.itemJson} item={props.items[0]} />
                <Item itemJson={props.itemJson} item={props.items[1]} />
                <Item itemJson={props.itemJson} item={props.items[2]} />
            </div>
            <div className="row2">
                <Item itemJson={props.itemJson} item={props.items[3]} />
                <Item itemJson={props.itemJson} item={props.items[4]} />
                <Item itemJson={props.itemJson} item={props.items[5]} />
                <Item itemJson={props.itemJson} item={props.items[6]} />
            </div>
        </div>
    )
}

export default ItemList