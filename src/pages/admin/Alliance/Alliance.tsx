import { COMPETITION_STAGE, ITeams } from "@18x18az/rosetta";
import { Fragment } from "react";
import { talos } from "../../../ws";

interface AllianceSelectionProps {
    teams: ITeams
    stage: COMPETITION_STAGE
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
            Hullo
        </Fragment>
    );
}