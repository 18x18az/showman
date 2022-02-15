import { IPath } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";

interface CycleTimePanelProps {
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface CycleTimePanelState {
    recentMatches: string[]
    recentCycleTimes: number[]
}

export class CycleTimePanel extends Component<CycleTimePanelProps, CycleTimePanelState> {
    constructor(props: CycleTimePanelProps) {
        super(props);
        this.state = {
            recentMatches: [],
            recentCycleTimes: []
        };
        console.log("brrr");
    }

    static getDerivedStateFromProps(props: CycleTimePanelProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
            if(route == "cycleTimes"){ // if this is the case, update state
                console.log("need to update state");
            }
        }
        return null
    }

    render() {
        return <div>
            hello ther
        </div>
    }
};
