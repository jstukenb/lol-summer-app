import React, { useState, useContext } from 'react'
import { getItemPic } from '../../RiotAPI'
import HoverCard from '../HoverCards/HoverCard'
import { RiotJsonContext } from '../Search/Search2'
const Item = props => {
    const itemJson = useContext(RiotJsonContext)["itemJson"]
    //console.log("ITEM PROPS: ", props.item)
    const [isShown, setIsShown] = useState(false)
    let blurb = ""
    if (props.item !== 0) {
        blurb = itemJson.data[props.item]?.description
    }
    //console.log(props.test)
    return (
        <div style={{ display: "inlineFlex" }}>
            <img style={{ display: "inlineFlex", flex: "left" }} className="itemImage" src={getItemPic(props.item)} alt="loading" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} />
            {isShown && <HoverCard blurb={blurb} />}
        </div>
    )


}

export default Item