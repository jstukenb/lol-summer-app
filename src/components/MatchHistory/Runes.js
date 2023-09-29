import React, { useEffect, useState, useContext } from 'react'
import { getRuneImage } from '../../RiotAPI'
import HoverCard from '../HoverCards/HoverCard'
import { RiotJsonContext } from '../Search/Search2'

const Runes = props => {
    const runeJson = useContext(RiotJsonContext)["runeJson"]
    const [keystone, setKeystone] = useState("")
    const [secondTree, setSecondTree] = useState("")
    const [keystoneBlurb, setKeystoneBlurb] = useState("")
    const [showBlurb, setShowBlurb] = useState(false)
    const [isShowing, setIsShowing] = useState(false)

    function handleMouseOver() {
        setIsShowing(true)
    }

    function handleMouseExit() {
        setIsShowing(false)
    }

    useEffect(() => {

        let participantRuneSection = props.gameData.info.participants[props.participantId].perks.styles[0].selections[0].perk
        let primaryRune = props.gameData.info.participants[props.participantId].perks.styles[0].style
        let subRune = props.gameData.info.participants[props.participantId].perks.styles[1].style
        for (let i = 0; i < runeJson.length; i++) {
            if (runeJson[i].id === subRune) {
                let secondHalf2 = runeJson[i].icon
                setSecondTree(getRuneImage(secondHalf2))
            }
            for (let j = 0; j < runeJson[i].slots[0].runes.length; j++) {
                if (runeJson[i].slots[0].runes[j].id ===  participantRuneSection) {
                    let secondHalf = runeJson[i].slots[0].runes[j].icon
                    setKeystone(getRuneImage(secondHalf))
                    setKeystoneBlurb(runeJson[i].slots[0].runes[j].longDesc)
                }
            }
        }
    }, [props.gameData.info.participants, props.participantId])

    return (
        <div width='30px' style={{
            position: 'relative',
            display: 'inline-flex',
            left: '.5%',
        }}>
            <img src={keystone} alt="loading" height="30px" width="30px" onMouseEnter={() => handleMouseOver()} onMouseLeave={() => handleMouseExit()}></img>
            {isShowing && <HoverCard blurb = {keystoneBlurb}/>}
            <img style={{ position: 'relative', right: '30px', top: '30px' }} src={secondTree} alt="loading" height="30px" width="30px"></img>
        </div>
    )
}

export default Runes