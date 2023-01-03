import { IInspectionStatus, ITeams } from "@18x18az/rosetta";
import { Fragment } from "react"
import { TeamList } from "./TeamList";

interface InspectionProps {
    teams: ITeams
    inspectionState: IInspectionStatus | null
}

export const Inspection = (props: InspectionProps) => {
    if(props.inspectionState === null){
        return <Fragment/>
    }

    return(
        <div className="inspection">
            <TeamList title="NOT STARTED" teams={props.inspectionState.notStarted} teamData={props.teams}/>
            <TeamList title="PARTIAL" teams={props.inspectionState.partial} teamData={props.teams}/>
            <TeamList title="COMPLETE" teams={props.inspectionState.inspected} teamData={props.teams}/>
        </div>
    )
};