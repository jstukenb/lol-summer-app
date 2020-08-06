import React, { useState } from 'react'
import { getItemPic } from '../../RiotAPI'
import HoverCard from '../HoverCards/HoverCard'

const AnalysisItem = props => {
    //console.log("ANALYSIS ITEM PROPS: ", props)
    const [ isShown, setIsShown ] = useState(false)
    let blurb = ""
    if(props.test !== "ITEM_UNDO") {
        blurb = props.itemJson.data[props.item].description
    } else {
        //blurb = props.itemJson.data[props.]
    }
    //console.log(props.test)
    if (props.test === "ITEM_SOLD" || props.test === "ITEM_DESTROYED" ) {
        return(
            <div style={{display: "inlineFlex"}}>
                <img style={{display:"inlineFlex", flex:"left"}} className="itemImage" src = {getItemPic(props.item)} alt = "loading" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} />
                <img style={{display:"inlineFlex", flex:"left"}} src = {'/Assets/redX.png'} alt = "loaading" height="30px" width="30px"/>
                {isShown && <HoverCard blurb={props.test}/>}
            </div>
        )
    } else {
        return(
            <div style={{display: "inlineFlex"}}>
                <img style={{display:"inlineFlex", flex:"left"}} className="itemImage" src = {getItemPic(props.item)} alt = "loading" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} />
                {isShown && <HoverCard blurb={blurb}/>}
            </div>
        )
    }
    
}

export default AnalysisItem