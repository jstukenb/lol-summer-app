import React, {useState, useEffect} from 'react'
import ItemTimeline from './ItemTimeline'

const AnalysisShell = props => {
    console.log("ANALYSIS PROPS: ", props)
    let purchaseGroups = []
    for (let i=0; i<props.analysisTimeline.length; i++) {
        let purchase = [props.analysisTimeline[i]]
        let difference = 0;
        let timesThroughLoop = -1
        for (let j=i+1; j<props.analysisTimeline.length; j++) {
            difference = props.analysisTimeline[j].timestamp - props.analysisTimeline[i].timestamp
            timesThroughLoop++
            if (difference > 10000) {
                i+=timesThroughLoop
                break
            } else {
                purchase.push(props.analysisTimeline[j])
            }
            
        }
        purchaseGroups.push(purchase)
    }
    return(
        <div>
            ITEM ANALYSIS
            <ItemTimeline purchaseGroups={purchaseGroups} itemJson={props.itemJson}/>
            
            
        </div>
    )
}

export default AnalysisShell