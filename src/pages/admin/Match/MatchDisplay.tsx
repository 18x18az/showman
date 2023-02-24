import { FIELD_CONTROL, IFieldInfo, IFieldState, IMatchInfo, IMatchList, ITeams, MATCH_STAGE, REF_COMMAND } from "@18x18az/rosetta";
import { determineMatch } from "../../../utils/Field";
import { makeClockText, makeMatchName } from "../../../utils/TextGenerator";
import { talos } from "../../../ws";

interface MatchDisplayProps {
    teams: ITeams
    matches: IMatchList | null
    field: IFieldState | null
    fields: Array<IFieldInfo> | null
    matchStage: MATCH_STAGE | null
}

interface IClockProps {
    mode: FIELD_CONTROL,
    time: number
}

function Clock(props: IClockProps) {
    const timeText = makeClockText(props.time);
    return (<div className="clock">
        <h1>{timeText}</h1>
        <h3>{props.mode}</h3>
    </div>
    )
}

const nullCb = () => {

}

function onShowClick() {
    talos.post(["refCommand"], REF_COMMAND.DISPLAY);
}

function onStartClick() {
    talos.post(["refCommand"], REF_COMMAND.START);
}

export const MatchDisplay = (props: MatchDisplayProps) => {
    if (!props.field || !props.fields || !props.matchStage || !props.matches) {
        console.log(props);
        return <div />
    }

    const match = determineMatch(props.field.field, props.field.field, props.fields, props.field.match, props.matches)

    if (!match) {
        return <div />
    }

    const fullMatchName = makeMatchName(match);

    let buttonDisabled = true;
    let buttonText = ""
    let cb = nullCb;

    switch (props.matchStage) {
        case MATCH_STAGE.IDLE: {
            buttonDisabled = false;
            buttonText = "SHOW";
            cb = onShowClick;
            break;
        }
        case MATCH_STAGE.INTRO: {
            buttonDisabled = false;
            buttonText = "START"
            cb = onStartClick;
            break;
        }
        case MATCH_STAGE.PAUSED: {
            buttonDisabled = false;
            buttonText = "RESUME";
            cb = onStartClick;
            break;
        }
        case MATCH_STAGE.HOLD_FOR_SCORE: {
            buttonDisabled = false;
            buttonText = "REVEAL";
            cb = onShowClick;
            break;
        }
    }

    return (
        <div className="matchDisplay">
            <h3>Field {props.field.field}</h3>
            <h2>{fullMatchName}</h2>
            <Clock mode={props.field.control} time={props.field.timeRemaining} />
            <button disabled={buttonDisabled} onClick={cb}>{buttonText}</button>
        </div>
    );
}