import { IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";

interface PitProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface PitState {
}

export class Pit extends Component<PitProps, PitState> {
    constructor(props: PitProps) {
        super(props);
    }

    static getDerivedStateFromProps(nextProps: PitProps, prevState: PitState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
        }

        return null;
    }

    render() {
        return <div>Hi</div>
    }
};