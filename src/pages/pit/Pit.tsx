import { COMPETITION_STAGE, IInspectionStatus, IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../../ws";
import { Default } from "./Default";
import { Inspection } from "./Inspection/Inspection";

interface PitProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface PitState {
    stage: COMPETITION_STAGE
    inspectionStatus: IInspectionStatus | null
}

export class Pit extends Component<PitProps, PitState> {
    constructor(props: PitProps) {
        super(props);
        talos.get(['stage']);
        talos.get(['inspection']);
        this.state = {
            stage: COMPETITION_STAGE.IDLE,
            inspectionStatus: null
        }
    }

    static getDerivedStateFromProps(nextProps: PitProps, prevState: PitState) {
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
            
            if (route === "inspection") {
                return ({
                    inspectionStatus: nextProps.lastMessageBody
                })
            }
        }
        return null;
    }

    render() {
        document.title = "Pit Display"
        let content = <Default />

        if (this.props.teams) {
            switch (this.state.stage) {
                case COMPETITION_STAGE.INSPECTION: {
                    content = <Inspection teams={this.props.teams} inspectionState={this.state.inspectionStatus} />
                }
            }
        }

        return (
            <div className="pit">
                <div className="l2">
                    <div className="l3">
                        {content}
                    </div>
                </div>
            </div>
        )
    }
};