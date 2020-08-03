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
        getDamageJson()
            .then(result =>{
                setDamageJson(result)
            })
        getSpellDamageJson()
            .then(result =>{
                setSpellDamageJson(result)
                console.log("SPELLDAMAGE: ", result)
            })
        getArmorJson()
            .then(result =>{
                setArmorJson(result)
            })
        getSpellBlockJson()
            .then(result =>{
                setSpellBLockJson(result)
            })
    }, [])
    useEffect(() => {
        if (spellDamageJson !== undefined && armorJson !== undefined && damageJson !== undefined && spellBlockJson !== undefined ) {
            let arrayOfSuggestion = []
            console.log("HERHERHEHREHRH: ", spellDamageJson)
            function handleDiffTag() {
                for (let i=0; i<props.purchaseGroupTags.length; i++) {
                    if(props.purchaseGroupTags[i].includes("SpellDamage")) {
                        for (var key in spellDamageJson) {
                            arrayOfSuggestion.push(spellDamageJson[key])
                        }
                    }
                    
                }
            }
            handleDiffTag()
            //console.log(props.purchaseGroupTags[0].includes("SpellDamage"))
            setList(arrayOfSuggestion)
        }
        
    }, [damageJson, spellDamageJson, armorJson, spellBlockJson])
    useEffect(() => {
        if(list !== undefined) {
            setIsShown(true)
        }
    },[list])    

    return(
        <div style={{backgroundColor: '#b19cd9', display: 'inlineFlex', height:'100px', position: 'relative', overflowY:'auto'}}>
            {isShown && <List list={list} itemJson={props.itemJson}/>}
        </div>
    )
}

export default ItemSuggestion