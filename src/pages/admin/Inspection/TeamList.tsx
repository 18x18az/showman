import { ITeams, TeamId } from "@18x18az/rosetta";
import { Fragment } from "react";

interface TeamInfoProps {
    team: TeamId
    teamData: ITeams
}

const TeamInfo = (props: TeamInfoProps) => {
    const teamNumber = props.teamData[props.team].number;
    return <div>{teamNumber}</div>
}

interface TeamListProps {
    title: string
    teams: TeamId[]
    teamData: ITeams
}

export const TeamList = (props: TeamListProps) => {
    const number = props.teams.length;
    if (number === 0) {
        return <Fragment />
    }
    const barComponents = props.teams.map((team) =>
        <TeamInfo key={team} team={team} teamData={props.teamData} />
    );
    return (
        <div className="teamList">
            <h2>{props.title}</h2>
            <div className="teams">
                {barComponents}
            </div>

        </div>
    );
}