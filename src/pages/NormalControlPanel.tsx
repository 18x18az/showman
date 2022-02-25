import { DisplayState, IAward, IAwards, IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";
import { CycleTimePanel } from "./CycleTimePanel";

interface IAwardProps {
    index: number
    award: IAward
}

function selectAward(index: number) {
    console.log(index);
    talos.post(['awards', 'selected'], index);
}

function Award(props: IAwardProps) {
    const disabled = props.award.winner === null
    return <div key={props.index} className="awardSelector">
        <button disabled={disabled} onClick={() => selectAward(props.index)}>
            {props.award.name}
        </button>
    </div>
}
interface AwardPanelProps {
    teams: Teams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

function pushAward(){
    talos.post(['awards', 'push'], null)
}
interface AwardPanelState {
    awards: IAwards | null
    selected: IAward | null
}
class AwardPanel extends Component<AwardPanelProps, AwardPanelState> {
    constructor(props: NormalControlPanelProps) {
        super(props);
        this.state = {
            selected: null,
            awards: null
        }
    }

    static getDerivedStateFromProps(nextProps: AwardPanelProps, prevState: AwardPanelState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "awards" && nextProps.lastMessageBody) {
                if (nextProps.lastMessagePath[1] === "selected") {

                } else {
                    return {
                        awards: nextProps.lastMessageBody
                        
                    }
                }
            }
        }

        return null;
    }

    render() {
        if (this.state.awards && this.props.teams) {
            const awards = this.state.awards
            let awardItems = [];

            for (let i = 0; i < awards.length; i++) {
                const award = awards[i];
                const awardItem = <Award index={i} award={award} />
                awardItems.push(awardItem);
            }

            return <div>
                {awardItems}
                <button onClick={pushAward}>Push</button>
            </div>
        } else {
            return <div>

            </div>
        }
    }
}

interface NormalControlPanelProps {
    teams: Teams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface NormalControlPanelState {

}

function startAllianceSelection() {
    talos.post(['allianceSelection'], null);
}

function refreshAwards() {
    talos.post(['awards'], null);
}

function showScores() {
    talos.post(['display'], DisplayState.SCORE);
}

function showUpcoming() {
    talos.post(['display'], DisplayState.UPCOMING);
}

export class NormalControlPanel extends Component<NormalControlPanelProps, NormalControlPanelState> {
    constructor(props: NormalControlPanelProps) {
        super(props);

        document.title = "Talos Control"
    }

    render() {
        return <div>
            <button onClick={startAllianceSelection}>
                Start Alliance Selection
            </button>
            <button onClick={showScores}>
                Scores
            </button>
            <button onClick={showUpcoming}>
                Upcoming
            </button>
            <button onClick={refreshAwards}>
                Refresh Awards
            </button>
            <AwardPanel teams={this.props.teams} lastMessageBody={this.props.lastMessageBody} lastMessagePath={this.props.lastMessagePath} />
            <CycleTimePanel lastMessageBody={this.props.lastMessageBody} lastMessagePath={this.props.lastMessagePath}></CycleTimePanel>
        </div>
    }
};
