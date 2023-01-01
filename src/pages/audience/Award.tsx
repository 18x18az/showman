import { IAward, IPath, TeamId, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../../ws";

interface IWinnerProps {
    teams: ITeams
    winner: TeamId | null
}

function Winner(props: IWinnerProps) {
    if (!props.winner) {
        return <div></div>
    }

    const winner = props.teams[props.winner];

    let name = winner.name;
    const max_length = 45;
    if (name.length > max_length) {
        name = name.substring(0, max_length)
    }

    return <div className="winner">
        <div>{winner.number} - {name}</div>
        <div>{winner.school}, {winner.location}</div>
    </div>
}

interface AwardProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface AwardState {
    award: IAward | null
}

export class Award extends Component<AwardProps, AwardState> {
    constructor(props: AwardProps) {
        super(props);
        talos.get(["awards", "selected"]);
        this.state = {
            award: null
        }
    }

    componentWillReceiveProps(props: AwardProps) {
        if (props.lastMessagePath) {
            console.log(props.lastMessagePath);
            if (JSON.stringify(props.lastMessagePath) === JSON.stringify(['awards', 'selected'])) {
                this.setState({
                    award: props.lastMessageBody
                })
            }
        }
    }

    render() {
        if (this.props.teams && this.state.award) {
            const award = this.state.award;
            return <div className="stream">
                <div className="award">
                    <div className="title">{award.name}</div>
                    <Winner teams={this.props.teams} winner={award.winner as TeamId} />
                </div>
            </div>
        } else {
            return <div></div>;
        }
    }
};