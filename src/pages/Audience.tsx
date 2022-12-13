import { DISPLAY_STATE, IMatchList, IMessage, IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";
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
}
export class Audience extends Component<AudienceProps, AudienceState> {
    constructor(props: AudienceProps) {
        super(props);
        talos.get(['display']);
        this.state = {
            mode: DISPLAY_STATE.UPCOMING
        }
    }

    static getDerivedStateFromProps(nextProps: AudienceProps, prevState: AudienceState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "display") {
                const display = nextProps.lastMessageBody;
                console.log(`Display mode changed to ${display}`)

                if (display === DISPLAY_STATE.ALLIANCE) {
                    talos.get(['allianceSelection']);
                }

                return { mode: nextProps.lastMessageBody };
            }
        }

        return null;
    }

    render() {
        const mode = this.state.mode;

        if (mode === DISPLAY_STATE.UPCOMING) {
            return <Upcoming
                teams={this.props.teams}
                matches={this.props.matches}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        } else if (mode === DISPLAY_STATE.ALLIANCE) {
            return <AllianceSelectionDisplay
                teams={this.props.teams}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        } else if (mode === DISPLAY_STATE.SCORE) {
            return <Score
                teams={this.props.teams}
                matches={this.props.matches}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        } else if (mode === DISPLAY_STATE.AWARD) {
            return <Award
            teams={this.props.teams}
            lastMessageBody={this.props.lastMessageBody}
            lastMessagePath={this.props.lastMessagePath}
            />
        } else {
            return <div>
                Test
            </div>
        }
    }
};
