import React from 'react'
import Item from '../../../Items/Item'

const List = props => {
    //console.log(props)
    var tracker = 0
    function getUniqueKey() {
        tracker += 1
        return tracker
    }
    return(
        <div>
            {props.list.map(key => (
                <div key={getUniqueKey()}>
                    <Item itemJson={props.itemJson} item={key}/>
                </div>
            ))}
        </div>
        
    )
}

export default List