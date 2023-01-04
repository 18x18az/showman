import { COMPETITION_STAGE, DISPLAY_STATE, IMatchList, IMessage, IPath, ITeams } from "@18x18az/rosetta";
import { Component, Fragment } from "react";
import { talos } from "../../ws";
import { AllianceSelectionDisplay } from "./AllianceSelectionDisplay";
import { Award } from "./Award";
import { Score } from "./Score";
import { Upcoming } from "./Upcoming";

enum AudienceMode {
    NORMAL,
    ALLIANCE_SELECTION
}
interface AudienceProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface AudienceState {
    mode: DISPLAY_STATE
    stage: COMPETITION_STAGE
}
export class Audience extends Component<AudienceProps, AudienceState> {
    constructor(props: AudienceProps) {
        super(props);
        talos.get(['display']);
        talos.get(['stage']);
        this.state = {
            mode: DISPLAY_STATE.UPCOMING,
            stage: COMPETITION_STAGE.IDLE
        }
    }

    static getDerivedStateFromProps(nextProps: AudienceProps, prevState: AudienceState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "display") {
                const display = nextProps.lastMessageBody;
                console.log(`Display mode changed to ${display}`)
                return { mode: nextProps.lastMessageBody };
            }
            if (route === "stage") {
                const stage = nextProps.lastMessageBody;
                console.log(`Stage changed to ${stage} `);
                return { stage: nextProps.lastMessageBody };
            }
        }

        return null;
    }

    render() {
        const mode = this.state.mode;
        const stage = this.state.stage;
        document.title = "Audience Display"

        if (mode === DISPLAY_STATE.NONE) {
            return <Fragment />
        }

        if (stage === COMPETITION_STAGE.QUALS || stage === COMPETITION_STAGE.ELIMS) {
            if (mode === DISPLAY_STATE.UPCOMING) {
                return <Upcoming
                    teams={this.props.teams}
                    matches={this.props.matches}
                    lastMessageBody={this.props.lastMessageBody}
                    lastMessagePath={this.props.lastMessagePath}
                />
            }

            if (mode === DISPLAY_STATE.SCORE) {
                return <Score
                    teams={this.props.teams}
                    matches={this.props.matches}
                    lastMessageBody={this.props.lastMessageBody}
                    lastMessagePath={this.props.lastMessagePath}
                />
            }
        }

        if (stage === COMPETITION_STAGE.ALLIANCE) {
            return <AllianceSelectionDisplay
                teams={this.props.teams}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        }

        if (stage === COMPETITION_STAGE.AWARDS) {
            return <Award
                teams={this.props.teams}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        }

        return <Fragment />
    }
};
