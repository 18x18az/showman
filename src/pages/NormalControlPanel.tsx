import { IPath, Teams } from "@18x18az/rosetta";
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

function startAwards(){
    talos.post(['awards'], null);
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
            <button onClick={startAwards}>
                Start Awards
            </button>
            <CycleTimePanel lastMessageBody={this.props.lastMessageBody} lastMessagePath={this.props.lastMessagePath}></CycleTimePanel>
        </div>
    }
};
