import { Fragment } from "react";
import { talos } from "../ws";
import { COMPETITION_STAGE } from "@18x18az/rosetta";

async function startStage(stage: COMPETITION_STAGE){
    talos.post(["stage"], stage);
}

interface IStartStateProps {
    stage: COMPETITION_STAGE
    children: React.ReactNode
}

export const StartState = (props: IStartStateProps) => {
    return (
        <Fragment>
            <button className="bigButton" onClick={() => startStage(props.stage)}>{props.children}</button>
        </Fragment>
    )
}