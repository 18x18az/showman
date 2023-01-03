import { COMPETITION_STAGE, IAllianceSelectionStatus, IInspectionStatus, ITeams } from "@18x18az/rosetta"
import { Component, Fragment } from "react";
import { AllianceSelection } from "./Alliance/Alliance";
import { Display } from "./Display/Display";
import { Inspection } from "./Inspection/Index";
import { MatchControl } from "./Match/Index";
import { ControlMode } from "./Navbar";

interface BodyProps {
    mode: ControlMode
    teams: ITeams | null
    inspectionState: IInspectionStatus | null
    stage: COMPETITION_STAGE
    selectionStatus: IAllianceSelectionStatus | null
}

export const Body = (props: BodyProps) => {
    if(props.teams === null){
        return <Fragment/>
    }
    switch(props.mode) {
        case ControlMode.INSPECTION: {
            return <Inspection inspectionState={props.inspectionState} teams={props.teams}/>
        }
        case ControlMode.MATCH: {
            return <MatchControl/>
        }
        case ControlMode.ALLIANCE: {
            return <AllianceSelection teams={props.teams} stage={props.stage} status={props.selectionStatus}/>
        }
        case ControlMode.DISPLAY: {
            return <Display/>
        }
    }
    return <Fragment>{props.mode}</Fragment>
}

