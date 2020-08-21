import React, {useState, useEffect} from 'react'
import { getDamageJson, getSpellDamageJson, getSpellBlockJson, getArmorJson } from '../../../../RiotAPI'
import List from './List'
import { set } from 'd3'

const ItemSuggestion = props => {
    console.log("Item suggestion props: ", props)
    const [damageJson, setDamageJson] = useState()
    const [spellDamageJson, setSpellDamageJson] = useState()
    const [armorJson, setArmorJson] = useState()
    const [spellBlockJson, setSpellBLockJson] = useState()
    const [isShown, setIsShown] = useState(false)
    const [list, setList] = useState()
    useEffect(() => {
        console.log("SETTING LIST")
        setList(props.suggestionList)
        console.log("LIST: ", list)
    }, [])

    useEffect(() => {
        //console.log("MADE IT HERE")
        //console.log("LIST: ", list)
        if(list !== undefined) {
            //console.log("CUM CUM CUM")
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