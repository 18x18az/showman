import { DISPLAY_STATE, IAward, IAwards } from "@18x18az/rosetta";
import { Fragment } from "react";
import { talos } from "../../../ws";
import { CurrentAward } from "./CurrentAward";

function refreshAwards() {
    talos.post(['awards'], null);
}

function selectAward(index: number) {
    talos.post(['awards', 'selected'], index);
}

function pushAward(){
    talos.post(['awards', 'push'], null)
}

interface IndividualAwardProps {
    award: IAward
    index: number
}

function IndividualAward(props: IndividualAwardProps) {
    const isDisabled = props.award.winner === null;
    return (
        <button onClick={() => selectAward(props.index)} disabled={isDisabled}>{props.award.name}</button>
    )
}

interface AwardsProps {
    awards: IAwards | null
    selected: IAward | null
    displayState: DISPLAY_STATE
}

export const Awards = (props: AwardsProps) => {
    document.title = "Awards";
    if (!props.awards) {
        return <Fragment />
    }

    const awardComponents = props.awards.map((award: IAward, index: number) =>
        <IndividualAward key={award.name} award={award} index={index}/>
    );

    return (
        <div className="displayControl">
            {awardComponents}
            <button onClick={refreshAwards}>Refresh Awards</button>
            <CurrentAward displayState={props.displayState} award={props.selected}/>
        </div>
    );
}