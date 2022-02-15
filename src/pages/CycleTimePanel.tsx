import { IPath } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";

interface CycleTimePanelProps {
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface CycleTimePanelState {
    recentMatches: Array<string>
    recentCycleTimes: Array<number>
}

function CycleTime(match_: string, time: number){
    return match_ + ": " + time.toFixed(2) + " minutes";
}

function CycleTimes(state: CycleTimePanelState){
    let matches = [];
    for(let i = 0; i < state.recentCycleTimes.length; i++){
        matches.push(CycleTime(state.recentMatches[i], state.recentCycleTimes[i]));
    }
    let listItems = matches.map(
        (match) => <li>{match}</li>
    );
    return <div className="cycleTimes">Recent cycle times:<ul>{listItems}</ul></div>
}

export class CycleTimePanel extends Component<CycleTimePanelProps, CycleTimePanelState> {
    constructor(props: CycleTimePanelProps) {
        super(props);
        this.state = {
            recentMatches: [],
            recentCycleTimes: []
        };
    }

    static getDerivedStateFromProps(props: CycleTimePanelProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
            if(route === "cycleTime"){ // if this is the case, update state
                return {
                    recentMatches: props.lastMessageBody.recentMatches,
                    recentCycleTimes: props.lastMessageBody.recentCycleTimes
                }
            }
        }
        return null
    }

    render() {
        
        return <div>
            {CycleTimes(this.state)}
        </div>
    }
};
