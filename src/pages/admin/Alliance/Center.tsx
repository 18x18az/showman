import { COMPETITION_STAGE, ITeams, TeamId } from "@18x18az/rosetta";
import { Fragment } from "react";
import { talos } from "../../../ws";

function acceptCb() {
    talos.post(['allianceSelection', 'accept'], null);
}

function declineCb() {
    talos.post(['allianceSelection', 'decline'], null);
}

function finalizeCb() {
    talos.post(['stage'], COMPETITION_STAGE.ELIMS);
}

interface CenterProps {
    teamData: ITeams
    picking: TeamId | undefined | null
    selected: TeamId | undefined | null
}

export const Center = (props: CenterProps) => {
    const picking = props.picking;

    if (!picking) {
        return <button onClick={finalizeCb}>Finalize</button>
    }

    const pickingNumber = props.teamData[picking].number;

    let titleString = pickingNumber;
    const selected = props.selected;
    if (selected) {
        const selectedNumber = props.teamData[selected].number;
        titleString = `${titleString} → ${selectedNumber}`
    }

    let actionButtons = <Fragment />

    if (selected) {
        actionButtons = <div>
            <button onClick={acceptCb}>Accept</button>
            <button onClick={declineCb}>Decline</button>
        </div>
    }

    return <div className="center">
        <p>{titleString}</p>
        {actionButtons}
    </div>
}