import React from 'react'
import Item from './Item'
import '../app.css'

const ItemList = props => {
    return(
        <div className = "itemList">
            <Item className = "itemRow1" item = {props.items[0]} />
            <Item className = "itemRow1" item = {props.items[1]} />
            <Item className = "itemRow1" item = {props.items[2]} />
            <Item className = "itemRow2" item = {props.items[3]} />
            <Item className = "itemRow2" item = {props.items[4]} />
            <Item className = "itemRow2" item = {props.items[5]} />
            <Item className = "itemRow2" item = {props.items[6]} />
        </div>
    )
}

export default ItemList