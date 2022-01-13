import { IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";
import { AllianceSelectionControlPanel } from "./AllianceSelectionControlPanel";
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
        talos.get(['allianceSelection']);
        this.state = {
            mode: ControlMode.NORMAL
        }
    }

    componentWillReceiveProps(props: ControlPanelProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
            if (route === "allianceSelection" && this.state.mode != ControlMode.ALLIANCE_SELECTION && props.lastMessageBody) {
                this.setState({mode: ControlMode.ALLIANCE_SELECTION});
            }
        }
    }

    render() {
        const mode = this.state.mode;

        if (mode === ControlMode.NORMAL) {
            return <NormalControlPanel
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        } else if (mode === ControlMode.ALLIANCE_SELECTION) {
            return <AllianceSelectionControlPanel
                teams={this.props.teams}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        }
    }
};
