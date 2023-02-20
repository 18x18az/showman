import { COMPETITION_STAGE, DISPLAY_STATE, MATCH_STAGE, IFieldState, IMatchList, IPath, ITeams, ISimpleMatchResult } from "@18x18az/rosetta";
import { Component, Fragment } from "react";
import { talos } from "../../ws";
import { Match } from "./Match";
import { Score } from "./Score";

interface IEmceeProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface IEmceeState {
    mode: DISPLAY_STATE
    stage: COMPETITION_STAGE
    fieldState: IFieldState | null
    matchStage: MATCH_STAGE | null
    score: ISimpleMatchResult | null
}

export class Emcee extends Component<IEmceeProps, IEmceeState> {
    constructor(props: IEmceeProps) {
        super(props);
        talos.get(['display']);
        talos.get(['stage']);
        talos.get(['field']);
        talos.get(['matchStage']);
        talos.get(['score']);
        this.state = {
            mode: DISPLAY_STATE.UPCOMING,
            stage: COMPETITION_STAGE.IDLE,
            fieldState: null,
            matchStage: null,
            score: null
        }
    }

    static getDerivedStateFromProps(nextProps: IEmceeProps, prevState: IEmceeState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "field") {
                return ({
                    fieldState: nextProps.lastMessageBody
                })
            }

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
            if (route === "matchStage") {
                return ({
                    matchStage: nextProps.lastMessageBody
                })
            }
            if (route === "score") {
                return({
                    score: nextProps.lastMessageBody
                });
            }
        }

        return null;
    }

    render() {
        document.title = 'Emcee'
        let content = <Fragment />;

        if (!this.props.teams) {
            return content;
        }

        if (!this.props.matches) {
            return content;
        }

        const stage = this.state.stage;
        const matchStage = this.state.matchStage;

        if (stage === COMPETITION_STAGE.QUALS || stage === COMPETITION_STAGE.ELIMS) {
            if(matchStage === MATCH_STAGE.OUTRO || matchStage === MATCH_STAGE.STING_OUT || matchStage === MATCH_STAGE.IDLE){
                content = <Score score={this.state.score} matches={this.props.matches} teams={this.props.teams}/>
            } else {
                content = <Match teams={this.props.teams} fieldState={this.state.fieldState} matches={this.props.matches} />
            }  
        }

        return (
            <div className="mobile">
                {content}
            </div>
        )
    }
}
