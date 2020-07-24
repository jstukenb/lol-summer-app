import React from 'react'

const HoverCard = props => {
    
    function htmlDecode(value){
        var e = document.createElement('div');
        e.innerHTML = value
        return e.childNodes[0].innerText
    }
    if (props.blurb !== "") {
        return(
            <div 
                style={{
                        display: 'box', flexDirection: 'column', position: 'absolute', zIndex: 9, 
                        backgroundColor: 'yellow', padding: '10px', borderRadius: '5%'
                    }}>
                    {htmlDecode(props.blurb)}
            </div>
        )
    }
    
    else {
        return null
    }
}

export default HoverCard