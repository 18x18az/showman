import { DISPLAY_STATE, IAward } from "@18x18az/rosetta"
import { Fragment } from "react"
import { talos } from "../../../ws";

interface CurrentAwardProps {
    award: IAward | null
    displayState: DISPLAY_STATE;
}

function cue(){
    console.log("Cuing next step");
    talos.post(['awards', 'push'], null)
}

function hide() {
    console.log("Hiding the award");
    talos.post(['awards', 'selected'], null);
}

export const CurrentAward = (props: CurrentAwardProps) => {
    if(!props.award){
        return <Fragment/>
    }
    
    return(
        <div>
            <h2>{props.award.name}</h2>
            <button onClick={cue}>Cue</button>
        </div>
    )
}