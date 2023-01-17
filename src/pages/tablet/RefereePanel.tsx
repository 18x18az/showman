import { IFieldInfo, IFieldState, IMatchList, IPath, ITeams, IAllianceTeams, FIELD_COMMAND, FIELD_CONTROL, REF_COMMAND, MATCH_STAGE } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../../ws";
import { determineMatch, isInMatch, isMatchEnded } from "../../utils/Field";
import { makeClockText, makeMatchName } from "../../utils/TextGenerator";
import { CycleTime } from "../../assets/Cycle";

interface RefereeProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface RefereeState {
    field: IFieldState | null
    fields: Array<IFieldInfo> | null
    matchStage: MATCH_STAGE | null
    cycleTime: number | null
}

export class RefereePanel extends Component<RefereeProps, RefereeState> {
    constructor(props: RefereeProps) {
        super(props);
        talos.get(['field'])
        talos.get(['fields'])
        talos.get(['matchStage'])

        this.onStartClick = this.onStartClick.bind(this);
        this.onShowClick = this.onShowClick.bind(this);

        this.state = {
            matchStage: null,
            field: null,
            fields: null,
            cycleTime: null
        }
    }

    onShowClick() {
        talos.post(["refCommand"], REF_COMMAND.DISPLAY);
    }

    onStartClick() {
        // TODO: since we lock the button in the HTML, is this if statement needed?
        if (this.state.field && (this.state.field.timeRemaining !== 0 || this.state.field.control === "PAUSED")) {
            talos.post(["refCommand"], REF_COMMAND.START);
        }
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
                return ({
                    fields: nextProps.lastMessageBody
                })
            }
            else if (route === "cycleTime") {
                return ({
                    cycleTime: nextProps.lastMessageBody.rollingAvg
                })
            }
            else if (route === "matchStage") {
                return ({
                    matchStage: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    render() {
        const stage = this.state.matchStage;
        console.log("Here");
        console.log(stage);
        if (this.state && this.state.fields && this.state.field && this.state.matchStage && this.props.teams && this.props.matches) {
            let showMatchLocked = true;
            if (stage === MATCH_STAGE.IDLE) {
                showMatchLocked = false;
            }
            let startMatchLocked = true;
            if (stage === MATCH_STAGE.INTRO || stage === MATCH_STAGE.PAUSED) {
                startMatchLocked = false;
            }

            let fieldName = "field name";
            let matchName = "match name";
            let control = "mode";
            let time = "time";
            let redTeam1 = "RED1", redTeam2 = "RED2", blueTeam1 = "BLUE1", blueTeam2 = "BLUE2";
            let queueButtonName = showMatchLocked ? "LOCKED" : "SHOW NEXT MATCH";
            let controlButtonName = startMatchLocked ? "LOCKED" : "START MATCH";

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

            return (
                <div className="referee">
                    <h1 className="matchtitle">{matchName} - {fieldName}</h1>
                    <h2>{control} - {time}</h2>
                    <button className="button" onClick={this.onShowClick} disabled={showMatchLocked}>
                        {queueButtonName}</button>
                    <br></br>
                    <button className="button" onClick={this.onStartClick} disabled={startMatchLocked}>
                        {controlButtonName}</button>
                    <div className="redteams">
                        <p>{redTeam1}</p>
                        <p>{redTeam2}</p>
                    </div>
                    <div className="blueteams">
                        <p>{blueTeam1}</p>
                        <p>{blueTeam2}</p>
                    </div>
                    <CycleTime cycleTime={this.state.cycleTime}/>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}