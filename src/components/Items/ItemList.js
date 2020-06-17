import React from 'react'
import Item from './Item'

const ItemList = props => {
    console.log("ITEM PROPS: ", props)
    
    return(
        <div
            style = {{
                backgroundColor: 'gray',
            }}
        >
            <Item item = {props.items[0]} />
            <Item item = {props.items[1]} />
            <Item item = {props.items[2]} />
            <Item item = {props.items[3]} />
            <Item item = {props.items[4]} />
            <Item item = {props.items[5]} />
            <Item item = {props.items[6]} />

            {/*props.items.map(item => (
                <div style = {{
                    float: 'left'
                }}>
                    <Item item = {item} />
                </div>
            ))*/}
        </div>
    )
}

export default ItemList