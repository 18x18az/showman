import { COMPETITION_STAGE, DISPLAY_STATE, IAllianceSelectionStatus, IAward, IAwards, IFieldInfo, IFieldState, IInspectionStatus, MATCH_STAGE, IMatchList, IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../../ws";
import { Body } from "./Body";
import { bars, ControlMode, Navbar } from "./Navbar";

interface ControlPanelProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface ControlPanelState {
    mode: ControlMode
    stage: COMPETITION_STAGE
    inspection: IInspectionStatus | null
    allianceSelection: IAllianceSelectionStatus | null
    awards: IAwards | null
    currentAward: IAward | null
    displayState: DISPLAY_STATE
    field: IFieldState | null
    fields: Array<IFieldInfo> | null
    matchStage: MATCH_STAGE | null
    cycleTime: number | null
}
export class ControlPanel extends Component<ControlPanelProps, ControlPanelState> {
    constructor(props: ControlPanelProps) {
        super(props);
        talos.get(['stage']);
        talos.get(['inspection']);
        talos.get(['allianceSelection']);
        talos.get(['display']);
        talos.get(['field']);
        talos.get(['fields']);
        talos.get(['matchStage']);
        talos.post(['awards'], null);
        this.state = {
            mode: ControlMode.IDLE,
            stage: COMPETITION_STAGE.IDLE,
            inspection: null,
            allianceSelection: null,
            awards: null,
            currentAward: null,
            displayState: DISPLAY_STATE.NONE,
            field: null,
            fields: null,
            matchStage: null,
            cycleTime: null
        }
    }

    static getDerivedStateFromProps(nextProps: ControlPanelProps, prevState: ControlPanelState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "stage") {
                const newStage = nextProps.lastMessageBody;
                const lastStage = prevState.stage;

                if (newStage !== lastStage) {
                    const possible = bars.get(newStage);
                    let targetMode = prevState.mode;
                    if (!possible.includes(targetMode)) {
                        targetMode = possible[0];
                    }
                    return ({
                        stage: newStage,
                        mode: targetMode
                    });
                }
            }
            if (route === "inspection") {
                return ({
                    inspection: nextProps.lastMessageBody
                })
            }
            if (route === "display") {
                return ({
                    displayState: nextProps.lastMessageBody
                })
            }
            if (route === "awards") {
                if (nextProps?.lastMessagePath[1] === "selected") {
                    return ({
                        currentAward: nextProps.lastMessageBody
                    })
                } else {
                    return ({
                        awards: nextProps.lastMessageBody
                    })
                }
            }
            if (route === "allianceSelection") {
                return ({
                    allianceSelection: nextProps.lastMessageBody
                })
            }
            if (route === "matches") {
                return ({
                    matches: nextProps.lastMessageBody
                })
            }
            if (route === "fields") {
                return ({
                    fields: nextProps.lastMessageBody
                })
            }
            if (route === "field") {
                return ({
                    field: nextProps.lastMessageBody
                })
            }
            if (route === "matchStage") {
                return ({
                    matchStage: nextProps.lastMessageBody
                })
            }
            if (route === "cycleTime") {
                return ({
                    cycleTime: nextProps.lastMessageBody.rollingAvg
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
                <Navbar stage={this.state.stage} onSelect={this.changeMode.bind(this)} selected={this.state.mode} />
                <div className="contents">
                    <Body
                        displayState={this.state.displayState}
                        selectedAward={this.state.currentAward}
                        awards={this.state.awards}
                        mode={this.state.mode}
                        teams={this.props.teams}
                        inspectionState={this.state.inspection}
                        stage={this.state.stage}
                        selectionStatus={this.state.allianceSelection}
                        lastMessagePath={this.props.lastMessagePath}
                        lastMessageBody={this.props.lastMessageBody}
                        matches={this.props.matches}
                        field={this.state.field}
                        fields={this.state.fields}
                        matchStage={this.state.matchStage}
                        cycleTime={this.state.cycleTime}
                    />
                </div>
            </div>
        )
    }
};
