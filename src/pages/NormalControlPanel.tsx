import { IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";

interface NormalControlPanelProps {
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface NormalControlPanelState {

}

function startAllianceSelection(){
    talos.post(['allianceSelection'], null);
}

export class NormalControlPanel extends Component<NormalControlPanelProps, NormalControlPanelState> {
    constructor(props: NormalControlPanelProps) {
        super(props);

        document.title = "Talos Control"
    }

    componentWillReceiveProps(props: NormalControlPanelProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
        }
    }

    render() {
        return <div>
            <button onClick={startAllianceSelection}>
                Start Alliance Selection
            </button>
        </div>
    }
};
