import React from 'react'
import Image from '../Image'
import { getItemPic } from '../../RiotAPI'

const Item = props => {
    return(
        <div
            style = {{
                float: 'left'
            }}
        >
            <Image imageLink = {getItemPic(props.item)} width = "20" height = "20"/>
        </div>
    )
}

export default Item