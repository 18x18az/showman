import { DisplayState, IPath, TeamId, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";

/**
 * info we need from talos:
 * match list
 * 
 * controls we need:
 * viewing match list
 * viewing team list (for skills)
 * 
 * selecting a match to score
 * spin boxes for scoring
 * assign auto bonus, assign auto WP
 * mark a team as dq, or no show
 * 
 * 
 * notes on autonomous: since it can either be 10 (win) or 5 (tie)
 * autonomous should be set to 10 or 5, ie not a boolean
 */
interface IVRCSpinUpScore {
    highGoals: number
    lowGoals: number
    rollers: number
    tiles: number
    autonomous: number
}

interface IVRCSpinUpMatch {
    name: string
    teamsBlue: Teams
    teamsRed: Teams

    scoreBlue: IVRCSpinUpScore
    scoreRed: IVRCSpinUpScore

    autoBonus: number // 0 if none, 1 if red only, 2 if blue only, 3 if both
    teamStatus: number // bit arithmetic for this. this is for stuff like DQ, no show, etc

}

interface ISpinBoxProps {
    gameObj: string
    team: string
    points: number
    value: number
}

function SpinBox(props: ISpinBoxProps){
    return <div>
        <button className="Button">-</button>{v}
        <button className="Button">+</button>
    </div>
}

let v: number = 0
export class RefereePanel extends Component {
    render() {
        return <div className="mobile">
            <SpinBox points={3} team="red" gameObj="discs" value={v}/>
        </div>
    }
};