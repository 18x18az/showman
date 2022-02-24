import { DisplayState, IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";
import { CycleTimePanel } from "./CycleTimePanel";

interface NormalControlPanelProps {
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface NormalControlPanelState {

}

function startAllianceSelection(){
    talos.post(['allianceSelection'], null);
}

function refreshAwards(){
    talos.post(['awards'], null);
}

function showScores(){
    talos.post(['display'], DisplayState.SCORE);
}

function showUpcoming(){
    talos.post(['display'], DisplayState.UPCOMING);
}

export class NormalControlPanel extends Component<NormalControlPanelProps, NormalControlPanelState> {
    constructor(props: NormalControlPanelProps) {
        super(props);

        document.title = "Talos Control"
    }

    componentWillReceiveProps(props: NormalControlPanelProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
        }
    }

    render() {
        return <div>
            <button onClick={startAllianceSelection}>
                Start Alliance Selection
            </button>
            <button onClick={showScores}>
                Scores
            </button>
            <button onClick={showUpcoming}>
                Upcoming
            </button>
            <button onClick={refreshAwards}>
                Refresh Awards
            </button>
            <CycleTimePanel lastMessageBody={this.props.lastMessageBody} lastMessagePath={this.props.lastMessagePath}></CycleTimePanel>
        </div>
    }
};
