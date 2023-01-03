import { COMPETITION_STAGE, IInspectionStatus, ITeams } from "@18x18az/rosetta"
import { Component, Fragment } from "react";
import { AllianceSelection } from "./Alliance/Alliance";
import { Inspection } from "./Inspection/Index";
import { MatchControl } from "./Match/Index";
import { ControlMode } from "./Navbar";

interface BodyProps {
    mode: ControlMode
    teams: ITeams | null
    inspectionState: IInspectionStatus | null
    stage: COMPETITION_STAGE
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
            return <AllianceSelection teams={props.teams} stage={props.stage}/>
        }
    }
    return <Fragment>{props.mode}</Fragment>
}

