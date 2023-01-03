import { COMPETITION_STAGE, IAllianceSelectionStatus, IInspectionStatus, IPath, ITeams } from "@18x18az/rosetta";
import { Component, Fragment } from "react";
import { talos } from "../../ws";
import { AllianceSelection } from "./AllianceSelectionControlPanel";

interface TabletProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface TabletState {
    stage: COMPETITION_STAGE
    allianceSelection: IAllianceSelectionStatus | null
}

export class Tablet extends Component<TabletProps, TabletState> {
    constructor(props: TabletProps) {
        super(props);
        talos.get(['stage']);
        talos.get(['allianceSelection']);
        this.state = {
            stage: COMPETITION_STAGE.IDLE,
            allianceSelection: null
        }
    }

    static getDerivedStateFromProps(nextProps: TabletProps, prevState: TabletState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
        }

        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "stage") {
                return ({
                    stage: nextProps.lastMessageBody
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

    render() {
        document.title = "Referee"
        let content = <Fragment />

        if (this.props.teams) {
            console.log("Have teams")
            switch (this.state.stage) {
                case COMPETITION_STAGE.ALLIANCE: {
                    console.log("Have alliance")
                    content = <AllianceSelection teams={this.props.teams} status={this.state.allianceSelection}/>
                }
            }
        }

        return (
            <div className="tablet">
                {content}
            </div>
        )
    }
};