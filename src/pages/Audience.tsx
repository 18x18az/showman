import { DisplayState, IMatchList, IMessage, IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";
import { AllianceSelectionDisplay } from "./AllianceSelectionDisplay";
import { Score } from "./Score";
import { Upcoming } from "./Upcoming";

enum AudienceMode {
    NORMAL,
    ALLIANCE_SELECTION
}
interface AudienceProps {
    teams: Teams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface AudienceState {
    mode: DisplayState
}
export class Audience extends Component<AudienceProps, AudienceState> {
    constructor(props: AudienceProps) {
        super(props);
        talos.get(['display']);
        this.state = {
            mode: DisplayState.UPCOMING
        }
    }

    static getDerivedStateFromProps(nextProps: AudienceProps, prevState: AudienceState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "display") {
                console.log(`Display mode changed to ${nextProps.lastMessageBody}`)

                if(nextProps.lastMessageBody === DisplayState.ALLIANCE){
                    talos.get(['allianceSelection']);
                }

                return { mode: nextProps.lastMessageBody };
            }
        }

        return null;
    }

    render() {
        const mode = this.state.mode;

        if (mode === DisplayState.UPCOMING) {
            return <Upcoming
                teams={this.props.teams}
                matches={this.props.matches}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        } else if (mode === DisplayState.ALLIANCE) {
            return <AllianceSelectionDisplay
                teams={this.props.teams}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        } else if (mode === DisplayState.SCORE) {
            <Score
                teams={this.props.teams}
                matches={this.props.matches}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        }
    }
};
