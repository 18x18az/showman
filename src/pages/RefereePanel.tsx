import { IFieldInfo, IFieldState, IMatchList, IPath, ITeams, IAllianceTeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";
import { determineMatch } from "../utils/Field";
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
}

export class RefereePanel extends Component<RefereeProps, RefereeState> {
    constructor(props: RefereeProps) {
        super(props);
        talos.get(['field'])
        talos.get(['fields'])

        this.onStartClick = this.onStartClick.bind(this);
    }
    onQueueClick() {
        talos.post(["fieldcontrol"], {"type": "QUEUE", "action": "NextMatch", "fieldID": "brrr"})
        talos.get(['field'])
        talos.get(['fields'])
    }

    onStartClick() {
        if (this.state.field) {
            console.log("asdfasdfasdfasdf")
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
                    field: nextProps.lastMessageBody
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
        let controlButtonName = "ABORT MATCH";
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
            if (control === "DISABLED") {
                controlButtonName = "START MATCH";
            }
            else if (control === "PAUSED") {
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
                <button className="button" onClick={this.onQueueClick}>QUEUE NEXT MATCH</button>
                <button className="button" onClick={this.onStartClick}>{controlButtonName}</button>
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