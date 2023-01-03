import { DISPLAY_STATE, IAward } from "@18x18az/rosetta"
import { Fragment } from "react"
import { talos } from "../../../ws";

interface CurrentAwardProps {
    award: IAward | null
    displayState: DISPLAY_STATE;
}

function makeVisible() {
    console.log("Making display visible")
    talos.post(['display'], DISPLAY_STATE.OTHER)
}

function showWinner(){
    console.log("Show the winner");
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

    let cueCb = showWinner;

    if(props.displayState === DISPLAY_STATE.NONE){
        cueCb = makeVisible;
    } else if(props.award.winner) {
        cueCb = hide;
    }
    
    return(
        <div>
            <h2>{props.award.name}</h2>
            <button onClick={cueCb}>Cue</button>
        </div>
    )
}