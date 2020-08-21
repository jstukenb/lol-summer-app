import React from 'react'
import Item from '../../../Items/Item'

const List = props => {
    console.log("LIST PROPS: ", props)
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }
    return(
        <div>
            SUGGESTIONS
            {props.list.map(key => (
                <div key={getUniqueKey()}>
                    <Item itemJson={props.itemJson} item={key.key}/>
                </div>
            ))}
        </div>
        
    )
}

export default List