import { COMPETITION_STAGE, IAllianceSelectionStatus, IInspectionStatus, IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../../ws";
import { Body } from "./Body";
import { ControlMode, Navbar } from "./Navbar";

interface ControlPanelProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface ControlPanelState {
    mode: ControlMode
    stage: COMPETITION_STAGE
    inspection: IInspectionStatus | null
    allianceSelection: IAllianceSelectionStatus | null
}
export class ControlPanel extends Component<ControlPanelProps, ControlPanelState> {
    constructor(props: ControlPanelProps) {
        super(props);
        talos.get(['stage']);
        talos.get(['inspection']);
        talos.get(['allianceSelection']);
        this.state = {
            mode: ControlMode.IDLE,
            stage: COMPETITION_STAGE.IDLE,
            inspection: null,
            allianceSelection: null
        }
    }

    static getDerivedStateFromProps(nextProps: ControlPanelProps, prevState: ControlPanelState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "stage") {
                const newStage = nextProps.lastMessageBody;
                const lastStage = prevState.stage;

                if (newStage !== lastStage) {
                    return ({
                        stage: newStage,
                        mode: ControlMode.IDLE
                    });
                }
            }
            if (route === "inspection") {
                return ({
                    inspection: nextProps.lastMessageBody
                })
            }
            if (route === "allianceSelection") {
                return ({
                    allianceSelection: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    changeMode(mode: ControlMode) {
        console.log(`Mode is now ${mode}`)
        this.setState({
            mode: mode
        })
    }

    render() {
        return (
            <div className="admin">
                <Navbar stage={this.state.stage} onSelect={this.changeMode.bind(this)} />
                <div className="contents">
                    <Body mode={this.state.mode} teams={this.props.teams} inspectionState={this.state.inspection} stage={this.state.stage} selectionStatus={this.state.allianceSelection} />
                </div>
            </div>
        )
    }
};
