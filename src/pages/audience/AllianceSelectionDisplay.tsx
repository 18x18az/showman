import { IAllianceSelectionStatus, IAllianceTeams, IPath, TeamId, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../../ws";

interface IRemainingTeamProps {
    team: TeamId
    teams: ITeams
}

function RemainingTeam(props: IRemainingTeamProps) {
    const teamNumber = props.teams[props.team].number;
    return <div className="rTeam">
        {teamNumber}
    </div>
}

interface IRemainingProps {
    remaining: Array<TeamId>
    teams: ITeams
}

function Remaining(props: IRemainingProps) {
    const remaining = props.remaining;
    if (!remaining) {
        return <div></div>
    }

    let remainingItems = [];

    for (let i = 0; i < remaining.length && i < 15; i++) {
        const remainingTeam = remaining[i];
        const remainingItem = <RemainingTeam team={remainingTeam} teams={props.teams} />
        remainingItems.push(remainingItem);
    }

    return <div className="remaining">{remainingItems}</div>
}

interface IPickingProps {
    picking: TeamId | null
    teams: ITeams
}

function Picking(props: IPickingProps) {
    const picking = props.picking;
    if (!picking) {
        return <div></div>
    }

    const pickingNumber = props.teams[picking].number;

    return <div className="picking">
        <div className="title">Currently Picking</div>
        {pickingNumber}
    </div>
}

interface IAllianceProps {
    alliance: IAllianceTeams
    number: number
    teams: ITeams
}

function Alliance(props: IAllianceProps) {
    const teams = props.teams;
    const alliance = props.alliance;
    const captain = teams[alliance.team1].number;
    const picked = teams[alliance.team2].number;
    return <div className="alliance"><div className="number">{props.number}</div><div className="captain">{captain}</div>-<div className="picked">{picked}</div></div>
}

interface IAlliancesProps {
    alliances: Array<IAllianceTeams>
    teams: ITeams
}

function Alliances(props: IAlliancesProps) {
    const alliances = props.alliances;
    if (!alliances) {
        return <div></div>
    }
    let allianceItems = [];

    for (let i = 0; i < alliances.length; i++) {
        const alliance = alliances[i];
        const allianceItem = <Alliance alliance={alliance} teams={props.teams} number={i + 1} />
        allianceItems.push(allianceItem);
    }

    return <div className="alliances">{allianceItems}</div>
}

interface AllianceSelectionDisplayProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface AllianceSelectionDisplayState {
    status: IAllianceSelectionStatus | null
}

export class AllianceSelectionDisplay extends Component<AllianceSelectionDisplayProps, AllianceSelectionDisplayState> {
    constructor(props: AllianceSelectionDisplayProps) {
        super(props);
        talos.get(['allianceSelection']);
        this.state = {
            status: null
        }
    }

    static getDerivedStateFromProps(nextProps: AllianceSelectionDisplayProps) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "allianceSelection") {
                return { status: nextProps.lastMessageBody }
            }
        }

        return null;
    }

    render() {
        if (this.props.teams && this.state.status) {
            const status = this.state.status;
            const alliances = status.alliances;
            const picking = status.picking;
            const remaining = status.eligible;
            const teams = this.props.teams;

            return <div className="stream">
                <div className="allianceSelection">
                    {alliances.length ?
                        <Alliances alliances={alliances} teams={teams} />
                        : null
                    }
                    <Picking picking={picking} teams={teams} />
                    {picking ?
                        <Remaining remaining={remaining} teams={teams} />
                        : null
                    }
                </div>
            </div>
        } else {
            return <div></div>
        }

    }
};