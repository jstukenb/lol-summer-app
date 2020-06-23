import React, { useEffect, useState } from 'react'
import { getRuneJson, getRuneImage } from '../../RiotAPI'

const Runes = props => {
    const [keystone, setKeystone ] = useState("")
    const [secondTree, setSecondTree ] = useState("")

    useEffect(() => {
        getRuneJson()
            .then((result) => {
                for (let i = 0; i < result.length; i++) {    
                    if (result[i].id === props.gameData.participants[props.participantId].stats.perkSubStyle) {
                        let secondHalf2 = result[i].icon
                        setSecondTree(getRuneImage(secondHalf2))
                    }
                    for (let j = 0; j < result[i].slots[0].runes.length; j++)
                    if (result[i].slots[0].runes[j].id  === props.gameData.participants[props.participantId].stats.perk0) {
                        let secondHalf = result[i].slots[0].runes[j].icon
                        setKeystone(getRuneImage(secondHalf))
                    }
                }
            })
    }, [props])
    
    return(
        <div style = {{
            position: 'relative',
            display: 'inline-flex',
            left: '.5%',
        }}>
            <img src = {keystone} alt = "loading" height = "30px" width = "30px"></img>
            <img style = {{position: 'relative', right: '30px', top: '30px'}} src = {secondTree} alt = "loading" height = "30px" width = "30px"></img>
        </div>
    )
}

export default Runes