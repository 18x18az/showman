import { IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { NormalControlPanel } from "./NormalControlPanel";

enum ControlMode {
    NORMAL,
    ALLIANCE_SELECTION
}
interface ControlPanelProps {
    teams: Teams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface ControlPanelState {
    mode: ControlMode
}
export class ControlPanel extends Component<ControlPanelProps, ControlPanelState> {
    constructor(props: ControlPanelProps) {
        super(props);
        this.state = {
            mode: ControlMode.NORMAL
        }
    }

    componentWillReceiveProps(props: ControlPanelProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
            if (route === "state") {
                console.log("hi there");
            }
        }
    }

    render() {
        const mode = this.state.mode;

        if(mode === ControlMode.NORMAL){
            return <NormalControlPanel 
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        }
    }
};
