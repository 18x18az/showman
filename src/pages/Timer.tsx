import { FieldControl, IAllianceTeams, IFieldState, IMatchList, IPath, Teams } from "@18x18az/rosetta";
import { Component } from "react";
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
    teams: Teams
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
    mode: FieldControl,
    time: number
}

function Clock(props: IClockProps) {
    const mode = (props.mode);
    if (mode === FieldControl.AUTONOMOUS || mode === FieldControl.DRIVER || mode === FieldControl.TIMEOUT) {
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
    mode: FieldControl
}

function Mode(props: IModeProps) {
    const modeText = makeControlText(props.mode);
    return <div className="mode">{modeText}</div>
}

interface TimerProps {
    teams: Teams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface TimerState {
    field: IFieldState | null
}

export class Timer extends Component<TimerProps, TimerState> {
    constructor(props: TimerProps) {
        super(props);
        talos.get(["field"])
        this.state = {
            field: null,
        }

    }

    static getDerivedStateFromProps(nextProps: TimerProps, prevState: TimerState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "field") {
                const current = prevState.field;

                if (current) {
                    const newField = nextProps.lastMessageBody as IFieldState;

                    if (current.control !== FieldControl.AUTONOMOUS && current.control !== FieldControl.DRIVER) {
                        if (newField.control === FieldControl.AUTONOMOUS || newField.control === FieldControl.DRIVER) {
                            play(startAudio);
                        }
                    } else {
                        if (newField.control === FieldControl.PAUSED) {
                            play(pauseAudio);
                        } else if (newField.control === FieldControl.DISABLED) {
                            play(disabledAudio);
                        }
                        else if (newField.timeRemaining === 30 && current.timeRemaining === 31) {
                            play(warningAudio);
                        }
                    }

                }

                return ({
                    field: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    render() {
        if (this.state.field && this.props.teams && this.props.matches) {
            const state = this.state.field;
            let matchName = "";
            let match;
            if(state.match === "TO") {
                matchName = "Timeout"
            } else {
                match = this.props.matches[state.match];
                matchName = makeMatchName(match);
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
                        <Alliance color="red" alliance={match.red} teams={this.props.teams} />
                        <Alliance color="blue" alliance={match.blue} teams={this.props.teams} />
                    </div>
        }
                </div>
            </div>
        } else {
            return <h1></h1>;
        }
    }
};
