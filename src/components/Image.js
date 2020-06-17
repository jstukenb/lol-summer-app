import React from 'react'

const Image = (props) => {
    return(
            <img 
                src = {props.imageLink}
                alt = "Loading..."
                width = {props.width}
                height = {props.height}
            ></img>
    )
}

export default Image