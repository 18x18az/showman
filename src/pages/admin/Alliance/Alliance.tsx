import { COMPETITION_STAGE, IAllianceSelectionStatus, ITeams } from "@18x18az/rosetta";
import { Fragment } from "react";
import { talos } from "../../../ws";
import { Alliances } from "./Alliances";
import { Center } from "./Center";
import { EligibleTeams } from "./Eligible";

function undoCb(){
    talos.post(['allianceSelection', 'undo'], null);
}

interface AllianceSelectionProps {
    teams: ITeams
    stage: COMPETITION_STAGE
    status: IAllianceSelectionStatus | null;
}

function startAllianceSelection() {
    talos.post(['allianceSelection'], null);
}

export const AllianceSelection = (props: AllianceSelectionProps) => {
    document.title = "Alliance Selection"
    if (props.stage !== COMPETITION_STAGE.ALLIANCE) {
        return (
            <Fragment>
                <button className="bigButton" onClick={startAllianceSelection}>Start Alliance Selection</button>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <EligibleTeams teams={props.status?.eligible} teamData={props.teams}/>
            <div className="center"><Center teamData={props.teams} picking={props.status?.picking} selected={props.status?.selected}/></div>
            <Alliances teamData={props.teams} alliances={props.status?.alliances}/>
            <button onClick={undoCb} className="undoButton">UNDO</button>
        </Fragment>
    );
}