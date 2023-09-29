import React, {useState, useEffect} from 'react'
import List from './List'

const ItemSuggestion = props => {
    const [isShown, setIsShown] = useState(false)
    const [list, setList] = useState()
    useEffect(() => {
        setList(props.suggestionList)
    }, [])

    useEffect(() => {
        if(list !== undefined) {
            setIsShown(true)
        }
    }, [list])    

    return(
        <div style={{backgroundColor: '#b19cd9', display: 'inlineFlex', height:'200px', width:'200px', overflowY:'auto', float: 'right'}}>
            {isShown && <List list={props.suggestionList} itemJson={props.itemJson}/>}
        </div>
    )
}

export default ItemSuggestion