import { IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";

interface AllianceSelectionControlPanelProps {
    teams: Teams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface AllianceSelectionControlPanelState {

}

export class AllianceSelectionControlPanel extends Component<AllianceSelectionControlPanelProps, AllianceSelectionControlPanelState> {
    constructor(props: AllianceSelectionControlPanelProps) {
        super(props);
    }

    componentWillReceiveProps(props: AllianceSelectionControlPanelProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
        }
    }

    render() {
        return <div>
            Selecting alliance
        </div>
    }
};
