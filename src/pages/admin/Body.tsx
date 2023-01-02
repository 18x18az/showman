import { COMPETITION_STAGE, IInspectionStatus, ITeams } from "@18x18az/rosetta"
import { Component, Fragment } from "react";
import { Inspection } from "./Inspection/Index";
import { MatchControl } from "./Match/Index";
import { ControlMode } from "./Navbar";

interface BodyProps {
    mode: ControlMode
    teams: ITeams | null
    inspectionState: IInspectionStatus | null
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
    }
    return <Fragment>{props.mode}</Fragment>
}

