import React, { useEffect, useState } from 'react'
import { getRuneImage } from '../../RiotAPI'

const Runes = props => {
    const [keystone, setKeystone] = useState("")
    const [secondTree, setSecondTree] = useState("")
    const [keystoneBlurb, setKeystoneBlurb] = useState("")
    const [showBlurb, setShowBlurb] = useState(false)
    useEffect(() => {
        for (let i = 0; i < props.runeJson.length; i++) {
            if (props.runeJson[i].id === props.gameData.participants[props.participantId].stats.perkSubStyle) {
                let secondHalf2 = props.runeJson[i].icon
                setSecondTree(getRuneImage(secondHalf2))
            }
            for (let j = 0; j < props.runeJson[i].slots[0].runes.length; j++) {
                if (props.runeJson[i].slots[0].runes[j].id === props.gameData.participants[props.participantId].stats.perk0) {
                    let secondHalf = props.runeJson[i].slots[0].runes[j].icon
                    setKeystone(getRuneImage(secondHalf))
                    setKeystoneBlurb(props.runeJson[i].slots[0].runes[j].longDesc)
                }
            }
        }
    }, [props.runeJson])

    return (
        <div style={{
            position: 'relative',
            display: 'inline-flex',
            left: '.5%',
        }}>
            <img src={keystone} alt="loading" height="30px" width="30px" title={keystoneBlurb} onMouseEnter={() => setShowBlurb(true)} onMouseLeave={() => setShowBlurb(false)}></img>
            {showBlurb && (
                <div style={{ display: 'box', position: 'absolute', zIndex: 9, backgroundColor: 'yellow' }}>{keystoneBlurb}</div>
            )}
            <img style={{ position: 'relative', right: '30px', top: '30px' }} src={secondTree} alt="loading" height="30px" width="30px"></img>
        </div>
    )
}

export default Runes