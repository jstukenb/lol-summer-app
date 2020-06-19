import React from 'react'
import { getItemPic } from '../../RiotAPI'

const Item = props => {
    return(
        <img className = {props.className} src = {getItemPic(props.item)} alt = "loading"/>
    )
}

export default Item