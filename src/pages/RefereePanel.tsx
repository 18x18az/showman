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
 */
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