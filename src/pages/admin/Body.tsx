import { COMPETITION_STAGE, DISPLAY_STATE, IAllianceSelectionStatus, IAward, IAwards, IFieldInfo, IFieldState, IInspectionStatus, IMatchInfo, IMatchList, IPath, ITeams, MATCH_STAGE } from "@18x18az/rosetta"
import { Component, Fragment } from "react";
import { AllianceSelection } from "./Alliance/Alliance";
import { Announcements } from "./Announce/Announce";
import { Awards } from "./Awards/Awards";
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
    awards: IAwards | null
    selectedAward: IAward | null
    displayState: DISPLAY_STATE
    lastMessagePath: IPath | null
    lastMessageBody: any
    matches: IMatchList | null
    field: IFieldState | null
    fields: Array<IFieldInfo> | null
    matchStage: MATCH_STAGE | null
    cycleTime: number | null
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
            return <MatchControl
            teams={props.teams}
            stage={props.stage}
            matches={props.matches}
            field={props.field}
            fields={props.fields}
            matchStage={props.matchStage}
            cycleTime={props.cycleTime}
            lastMessagePath={props.lastMessagePath}
            lastMessageBody={props.lastMessageBody}/>
        }
        case ControlMode.ALLIANCE: {
            return <AllianceSelection teams={props.teams} stage={props.stage} status={props.selectionStatus}/>
        }
        case ControlMode.DISPLAY: {
            return <Display/>
        }
        case ControlMode.AWARDS: {
            return <Awards stage={props.stage} displayState={props.displayState} awards={props.awards} selected={props.selectedAward}/>
        }
        case ControlMode.ANNOUNCEMENTS: {
            return <Announcements/>
        }
    }
    return <Fragment>{props.mode}</Fragment>
}

