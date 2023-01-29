import { COMPETITION_STAGE, DISPLAY_STATE, IFieldState, IMatchList, IPath, ITeams } from "@18x18az/rosetta";
import { Component, Fragment } from "react";
import { talos } from "../../ws";
import { Match } from "./Match";

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
}

export class Emcee extends Component<IEmceeProps, IEmceeState> {
    constructor(props: IEmceeProps) {
        super(props);
        talos.get(['display']);
        talos.get(['stage']);
        talos.get(['field']);
        this.state = {
            mode: DISPLAY_STATE.UPCOMING,
            stage: COMPETITION_STAGE.IDLE,
            fieldState: null
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
        }

        return null;
    }

    render() {
        if (!this.props.teams) {
            return <Fragment />
        }

        if(!this.props.matches) {
            return <Fragment />
        }

        const stage = this.state.stage;

        if(stage === COMPETITION_STAGE.QUALS || stage === COMPETITION_STAGE.ELIMS){
            return <Match teams={this.props.teams} fieldState={this.state.fieldState} matches={this.props.matches}/>
        }

        return <Fragment />
    }
}