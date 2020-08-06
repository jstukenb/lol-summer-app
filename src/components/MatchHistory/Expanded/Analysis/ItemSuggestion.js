import React, {useState, useEffect} from 'react'
import { getDamageJson, getSpellDamageJson, getSpellBlockJson, getArmorJson } from '../../../../RiotAPI'
import List from './List'
import { set } from 'd3'

const ItemSuggestion = props => {
    //console.log("Item suggestion props: ", props)
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
                //console.log("DAMAGE: ", result)
            })
        getSpellDamageJson()
            .then(result =>{
                setSpellDamageJson(result)
                //console.log("SPELLDAMAGE: ", result)
            })
        getArmorJson()
            .then(result =>{
                setArmorJson(result)
                //console.log("ARMOR: ", result)
            })
        getSpellBlockJson()
            .then(result =>{
                setSpellBLockJson(result)
                //console.log("MAGIC RESIST: ", result)
            })
    }, [])
    useEffect(() => {
        if (spellDamageJson !== undefined && armorJson !== undefined && damageJson !== undefined && spellBlockJson !== undefined ) {
            let arrayOfSuggestion = []
            //console.log("HERHERHEHREHRH: ", spellDamageJson)
            function handleDiffTag() {
                for (let i=0; i<props.purchaseGroupTags.length; i++) {
                    if(props.purchaseGroupTags[i].includes("SpellDamage")) {
                        for (var key in spellDamageJson) {
                            arrayOfSuggestion.push(spellDamageJson[key])
                        }
                    } else if(props.purchaseGroupTags[i].includes("Damage")) {
                        for (var key in damageJson) {
                            arrayOfSuggestion.push(damageJson[key])
                        }
                        
                    } else if(props.purchaseGroupTags[i].includes("Armor")) {
                        for (var key in armorJson) {
                            arrayOfSuggestion.push(armorJson[key])
                        }
                    } else if(props.purchaseGroupTags[i].includes("SpellBlock")) {
                        for (var key in spellBlockJson) {
                            arrayOfSuggestion.push(spellBlockJson[key])
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
        <div style={{backgroundColor: '#b19cd9', display: 'inlineFlex', height:'200px', width:'200px', overflowY:'auto', float: 'right'}}>
            {isShown && <List list={list} itemJson={props.itemJson}/>}
        </div>
    )
}

export default ItemSuggestion