import { IAward, IPath, TeamId, Teams } from "@18x18az/rosetta";
import { Component } from "react";

interface IWinnerProps {
    teams: Teams
    winner: TeamId | null
}

function Winner(props: IWinnerProps) {
    if(!props.winner){
        return <div></div>
    }

    const winner = props.teams[props.winner];

    let name = winner.name;
    const max_length = 45;
    if (name.length > max_length) {
        name = name.substring(0, max_length)
    }

    return <div>
        <div>{winner.number} - {name}</div>
        <div>{winner.school}, {winner.location}</div>
    </div>
}

interface AwardProps {
    teams: Teams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface AwardState {
    award: IAward | null
}

export class Award extends Component<AwardProps, AwardState> {
    constructor(props: AwardProps) {
        super(props);
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
            return <div className="award">
                {award.name}
                <Winner teams={this.props.teams} winner={award.winner}/>
            </div>
        } else {
            return <div></div>;
        }
    }
};