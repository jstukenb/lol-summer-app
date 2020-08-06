import React from 'react'

const HoverCard = props => {
    
    function htmlDecode(value){
        var e = document.createElement('div');
        let text = "";
        e.innerHTML = value
        let test = e.childNodes
        test.forEach(key => {
            //console.log("FART: ", key.textContent)
            if (key.innerText === undefined) {
                //console.log("TYPE: ", key.substringData(0,key.length))
                let temp = key.substringData(0,key.length)
                text = text + temp + " "
            } else {
                text = text + key.innerText + " "
            }
            
        })
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