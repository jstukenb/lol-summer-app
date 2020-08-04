import React from 'react'

const HoverCard = props => {
    
    function htmlDecode(value){
        var e = document.createElement('div');
        let text = "";
        e.innerHTML = value
        let test = e.childNodes
        test.forEach(key => {
            if (key.innerText === undefined) {
                let temp = JSON.stringify(key)
                console.log("CHECK: " , temp)
                text = text + key + " "
            } else {
                text = text + key.innerText + " "
                console.log(key)
            }
            
        })
        console.log("TEXT TEXT: ", text)
        /*console.log("INNER NODES: ", e.childNodes)
        if (e.childNodes.includes("unique")) {
            console.log("FART FART")
        }*/
        return text
    }
    if (props.blurb !== "") {
        return(
            <div 
                style={{
                        display: 'box', flexDirection: 'column', position: 'absolute', zIndex: 9, 
                        backgroundColor: 'yellow', padding: '10px', borderRadius: '5%', width: '250px'
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