import { IFieldInfo, IFieldState, IMatchList, IPath, ITeams, IAllianceTeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";
import { determineMatch, isPreMatch, isInMatch, isMatchPaused, isMatchEnded} from "../utils/Field";
import { makeClockText, makeMatchName } from "../utils/TextGenerator";

interface RefereeProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface RefereeState {
    field: IFieldState | null
    fields: Array<IFieldInfo> | null
    disableQueue: boolean
    disableStart: boolean
}



export class RefereePanel extends Component<RefereeProps, RefereeState> {
    constructor(props: RefereeProps) {
        super(props);
        talos.get(['field'])
        talos.get(['fields'])

        this.onStartClick = this.onStartClick.bind(this);
        this.onQueueClick = this.onQueueClick.bind(this);

        this.state = {
            disableQueue: false,
            disableStart: false,
            field: null,
            fields: null
        }
    }

    onQueueClick() {
        // lock out queue button after queuing the next match
        this.setState({ disableQueue: true });
        setTimeout(() => this.setState({ disableQueue: false }), 1000);

        // send queue action
        talos.post(["fieldcontrol"], {"type": "QUEUE", "action": "NextMatch", "fieldID": "brrr"})
        talos.get(['field'])
        talos.get(['fields'])
    }

    onStartClick() {
        // TODO: since we lock the button in the HTML, is this if statement needed?
        if (this.state.field && (this.state.field.timeRemaining !== 0 || this.state.field.control === "PAUSED")) {
            let fieldID = this.state.field.field;
            talos.post(["fieldcontrol"], {"type": "MATCH", "action": "start", "fieldID": fieldID});
        }
        talos.get(['field'])
        talos.get(['fields'])
    }

    static getDerivedStateFromProps(nextProps: RefereeProps, prevState: RefereeState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "field") {
                return ({
                    field: nextProps.lastMessageBody,
                    disableStart: isInMatch(nextProps.lastMessageBody) || isMatchEnded(nextProps.lastMessageBody)
                })
            }
            else if (route === "fields") {
                return({
                    fields: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    render() {
        let fieldName = "field name";
        let matchName = "match name";
        let control = "mode";
        let time = "time";
        let redTeam1 = "RED1", redTeam2 = "RED2", blueTeam1 = "BLUE1", blueTeam2 = "BLUE2";
        let queueButtonName = this.state.disableQueue ? "LOCKED" : "QUEUE NEXT MATCH";
        let controlButtonName = this.state.disableStart ? "LOCKED" : "START MATCH";
        if (this.state && this.state.fields && this.state.field && this.props.teams && this.props.matches) {

            // get field name
            this.state.fields.forEach((field) => {
                if (field.field === (this.state.field?.field as string)) {
                    fieldName = field.name;
                }
            })

            // get field state
            control = this.state.field.control;
            time = makeClockText(this.state.field.timeRemaining);
            if (control === "PAUSED") {
                controlButtonName = "RESUME MATCH";
            }

            // get match name + teams
            let match = determineMatch(this.state.field.field, this.state.field.field, this.state.fields, this.state.field.match, this.props.matches)
            if (match) {
                matchName = makeMatchName(match);
                redTeam1 = this.props.teams[(match.red as IAllianceTeams).team1].number;
                redTeam2 = this.props.teams[(match.red as IAllianceTeams).team2].number;
                blueTeam1 = this.props.teams[(match.blue as IAllianceTeams).team1].number;
                blueTeam2 = this.props.teams[(match.blue as IAllianceTeams).team2].number;
            }
        }
        
        return (
            <div className="referee">
                <h1 className="matchtitle">{matchName} - {fieldName}</h1>
                <h2>{control} - {time}</h2>
                <button className="button" onClick={this.onQueueClick} disabled={this.state.disableQueue}>
                    {queueButtonName}</button>
                <br></br>
                <button className="button" onClick={this.onStartClick} disabled={this.state.disableStart}>
                    {controlButtonName}</button>
                <div className="redteams">
                    <p>{redTeam1}</p>
                    <p>{redTeam2}</p>
                </div>
                <div className="blueteams">
                    <p>{blueTeam1}</p>
                    <p>{blueTeam2}</p>
                </div>
            </div>
        )
    }
}