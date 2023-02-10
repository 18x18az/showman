import { IFieldInfo, IFieldState, COMPETITION_STAGE, IMatchList, IPath, ITeams, MATCH_STAGE } from "@18x18az/rosetta";
import { CycleTime } from "../../../assets/Cycle";
import { StartState } from "../../../assets/StartState";
import { MatchDisplay } from "./MatchDisplay";
import OBSControlPanel from "./OBSControlPanel";

interface MatchControlProps {
    teams: ITeams
    matches: IMatchList | null
    field: IFieldState | null
    fields: Array<IFieldInfo> | null
    matchStage: MATCH_STAGE | null
    cycleTime: number | null
    lastMessagePath: IPath | null
    lastMessageBody: any
    stage: COMPETITION_STAGE
}

export const MatchControl = (props: MatchControlProps) => {
    document.title = "Match Control"

    if(props.stage !== COMPETITION_STAGE.QUALS && props.stage !== COMPETITION_STAGE.ELIMS){
        return <StartState stage={COMPETITION_STAGE.ELIMS}>Resume Elims</StartState>
    }

    return (
        <div className="match">
            <MatchDisplay
                teams={props.teams}
                matches={props.matches}
                field={props.field}
                fields={props.fields}
                matchStage={props.matchStage}
                />
            <OBSControlPanel
                lastMessageBody={props.lastMessageBody}
                lastMessagePath={props.lastMessagePath}
            />
            <CycleTime cycleTime={props.cycleTime}/>
        </div>
    );
}