import { FIELD_CONTROL, IAllianceTeams, IFieldInfo, IFieldState, IMatchList, IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { useLocation, useParams } from "react-router-dom";
import { determineMatch } from "../utils/Field";
import { makeClockText, makeControlText, makeMatchName } from "../utils/TextGenerator";
import { talos } from '../ws'


const startAudio = new Audio("./audio/start.wav");
const pauseAudio = new Audio("./audio/pause.wav");
const disabledAudio = new Audio("./audio/stop.wav");
const warningAudio = new Audio("./audio/warning.wav");

function play(audio: HTMLAudioElement) {
    if (audio.paused || !audio.currentTime) {
        audio.play();
    }
}

interface IAllianceProps {
    color: string
    alliance: IAllianceTeams
    teams: ITeams
}

function Alliance(props: IAllianceProps) {
    const team1 = props.teams[props.alliance.team1];
    const team2 = props.teams[props.alliance.team2];

    return <div className={props.color}>
        <div className='numbers'>
            <div className='teamNumber'>{team1.number}</div>
            <div className='teamNumber'>{team2.number}</div>
        </div>
        <svg width="10" height="100%" className="stripe">
            <rect x="0" y="10%" width="10" height="80%" />
        </svg>
    </div>
}

interface IClockProps {
    mode: FIELD_CONTROL,
    time: number
}

function Clock(props: IClockProps) {
    const mode = (props.mode);
    if (mode === FIELD_CONTROL.AUTONOMOUS || mode === FIELD_CONTROL.DRIVER || mode === FIELD_CONTROL.TIMEOUT) {
        const timeText = makeClockText(props.time);
        return <div className="clock">{timeText}</div>
    } else {
        return <div className="clock"></div>
    }
}

interface IMatchLabelProps {
    matchName: string
}

function MatchLabel(props: IMatchLabelProps) {
    const matchName = String(props.matchName);
    return <div className='matchName'>{matchName}</div>
}

interface IModeProps {
    mode: FIELD_CONTROL
}

function Mode(props: IModeProps) {
    const modeText = makeControlText(props.mode);
    return <div className="mode">{modeText}</div>
}

interface TimerProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface ExtendedTimerProps extends TimerProps{
    field: string
    mute: boolean
}

interface TimerState {
    field: IFieldState | null
    fields: Array<IFieldInfo> | null
}


function handleAudio(current: IFieldState, newField: IFieldState) {
    if (current.control !== FIELD_CONTROL.AUTONOMOUS && current.control !== FIELD_CONTROL.DRIVER) {
        if (newField.control === FIELD_CONTROL.AUTONOMOUS || newField.control === FIELD_CONTROL.DRIVER) {
            play(startAudio);
        }
    } else {
        if (newField.control === FIELD_CONTROL.PAUSED) {
            play(pauseAudio);
        } else if (newField.control === FIELD_CONTROL.DISABLED) {
            play(disabledAudio);
        }
        else if (newField.timeRemaining === 10 && current.timeRemaining === 11 && current.control == FIELD_CONTROL.DRIVER) {
            // TODO: fix after spin up
            play(warningAudio);
        }
    }
}

class TimerClass extends Component<ExtendedTimerProps, TimerState> {
    constructor(props: ExtendedTimerProps) {
        super(props);
        talos.get(["field"])
        talos.get(["fields"])
        this.state = {
            field: null,
            fields: null
        }

    }

    static getDerivedStateFromProps(nextProps: ExtendedTimerProps, prevState: TimerState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "field") {
                const current = prevState.field;

                if (current) {
                    const newField = nextProps.lastMessageBody as IFieldState;

                    if(!nextProps.mute){   
                        handleAudio(current, newField);
                    }

                }

                return ({
                    field: nextProps.lastMessageBody
                })
            } else if (route === "fields") {
                console.log(nextProps.lastMessageBody);
                return({
                    fields: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    render() {
        if (this.state.field && this.props.teams && this.props.matches && this.state.fields) {
            const state = this.state.field;
            const currentField = state.field;
            const displayedField = this.props.field || currentField;

            determineMatch(displayedField, currentField, this.state.fields, state.match, this.props.matches);

            let matchName = "";
            let match;
            if(state.match === "TO") {
                matchName = "Timeout"
            } else {
                match = determineMatch(displayedField, currentField, this.state.fields, state.match, this.props.matches)
                if(match){
                    matchName = makeMatchName(match);
                }
            }

            return <div className="stream">
                <div className="timer">
                    <div className="top">
                        <Mode mode={state.control} />
                        <MatchLabel matchName={matchName} />
                        <Clock mode={state.control} time={state.timeRemaining} />
                    </div>
                    { match &&
                    <div className="bottom">
                        <Alliance color="red" alliance={match.red as IAllianceTeams} teams={this.props.teams} />
                        <Alliance color="blue" alliance={match.blue as IAllianceTeams} teams={this.props.teams} />
                    </div>
        }
                </div>
            </div>
        } else {
            return <h1></h1>;
        }
    }
};

interface TimerPathParms {
    field: string
}

export function Timer(props: TimerProps){
    const {field} = useParams<TimerPathParms>();
    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const mute = params.get('mute') === "true";
    return(
    <TimerClass mute={mute} field={field} teams={props.teams} matches={props.matches} lastMessageBody={props.lastMessageBody} lastMessagePath={props.lastMessagePath}/>
    )
}
