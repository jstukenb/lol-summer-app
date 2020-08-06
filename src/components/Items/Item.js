import React, { useState } from 'react'
import { getItemPic } from '../../RiotAPI'
import HoverCard from '../HoverCards/HoverCard'

const Item = props => {
    //console.log("ITEM PROPS: ", props.item)
    const [isShown, setIsShown] = useState(false)
    let blurb = ""
    if (props.item !== 0) {
        blurb = props.itemJson.data[props.item].description
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