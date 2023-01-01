import { COMPETITION_STAGE, DISPLAY_STATE, IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../../ws";
import { AllianceSelectionControlPanel } from "../tablet/AllianceSelectionControlPanel";
import { NormalControlPanel } from "./NormalControlPanel";

enum ControlMode {
    NORMAL,
    ALLIANCE_SELECTION
}
interface ControlPanelProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface ControlPanelState {
    mode: ControlMode
}
export class ControlPanel extends Component<ControlPanelProps, ControlPanelState> {
    constructor(props: ControlPanelProps) {
        super(props);
        talos.get(['display']);
        this.state = {
            mode: ControlMode.NORMAL
        }
    }

    static getDerivedStateFromProps(nextProps: ControlPanelProps, prevState: ControlPanelState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "stage") {
                if(nextProps.lastMessageBody === COMPETITION_STAGE.ALLIANCE){
                    talos.get(['allianceSelection']);
                    return {mode: ControlMode.ALLIANCE_SELECTION};
                } else {
                    return {mode: ControlMode.NORMAL};
                }
            }
        }

        return null;
    }

    render() {
        const mode = this.state.mode;

        if (mode === ControlMode.NORMAL) {
            return <NormalControlPanel
                teams={this.props.teams}
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
