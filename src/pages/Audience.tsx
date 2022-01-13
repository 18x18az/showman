import { IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";
import { AllianceSelectionDisplay } from "./AllianceSelectionDisplay";

enum AudienceMode {
    NORMAL,
    ALLIANCE_SELECTION
}
interface AudienceProps {
    teams: Teams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface AudienceState {
    mode: AudienceMode
}
export class Audience extends Component<AudienceProps, AudienceState> {
    constructor(props: AudienceProps) {
        super(props);
        talos.get(['allianceSelection']);
        this.state = {
            mode: AudienceMode.NORMAL
        }
    }

    static getDerivedStateFromProps(nextProps: AudienceProps, prevState: AudienceState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "allianceSelection" && prevState.mode !== AudienceMode.ALLIANCE_SELECTION && nextProps.lastMessageBody) {
                return {mode: AudienceMode.ALLIANCE_SELECTION};
            }
        }

        return null;
    }

    render() {
        const mode = this.state.mode;

        if (mode === AudienceMode.NORMAL) {
            return <div></div>
        } else if (mode === AudienceMode.ALLIANCE_SELECTION) {
            return <AllianceSelectionDisplay
                teams={this.props.teams}
                lastMessageBody={this.props.lastMessageBody}
                lastMessagePath={this.props.lastMessagePath}
            />
        }
    }
};
