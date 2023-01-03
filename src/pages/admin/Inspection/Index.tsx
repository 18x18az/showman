import { COMPETITION_STAGE, IInspectionStatus, ITeams } from "@18x18az/rosetta";
import { Fragment } from "react";
import { talos } from "../../../ws";
import { TeamList } from "./TeamList";

interface InspectionProps {
    inspectionState: IInspectionStatus | null
    teams: ITeams
}

function endInspection(){
    talos.post(["stage"], COMPETITION_STAGE.QUALS);
}

export const Inspection = (props: InspectionProps) => {
    document.title = "Inspection"

    if(props.inspectionState === null){
        return <Fragment/>
    }
    
    return(
        <Fragment>
            <div className="inspectionContainer">
                <TeamList title="No Show" teams={props.inspectionState.noShow} teamData={props.teams}/>
                <TeamList title="Not Checked In" teams={props.inspectionState.notCheckedIn} teamData={props.teams}/>
                <TeamList title="Not Started" teams={props.inspectionState.notStarted} teamData={props.teams}/>
                <TeamList title="Partial" teams={props.inspectionState.partial} teamData={props.teams}/>
                <TeamList title="Complete" teams={props.inspectionState.inspected} teamData={props.teams}/>
            </div>
            <button className="endInspection" onClick={endInspection}>End Inspection</button>
        </Fragment>
    );
}