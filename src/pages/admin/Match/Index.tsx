import { IFieldInfo, IFieldState, IMatchInfo, IMatchList, IPath, ITeams, MATCH_STAGE } from "@18x18az/rosetta";
import { CycleTime } from "../../../assets/Cycle";
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
}

export const MatchControl = (props: MatchControlProps) => {
    document.title = "Match Control"
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