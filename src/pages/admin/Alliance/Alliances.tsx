import { IAlliance, ITeams } from "@18x18az/rosetta";
import { Fragment } from "react";

interface TeamInfoProps {
    alliance: IAlliance
    teamData: ITeams
}

const AllianceInfo = (props: TeamInfoProps) => {
    if(!props.alliance.team2){
        return <Fragment />
    }
    const teamNumber1 = props.teamData[props.alliance.team1].number;
    const teamNumber2 = props.teamData[props.alliance.team2].number;
    return <div className="teamSelector">{teamNumber1} - {teamNumber2}</div>
}

interface EligibleTeamsProps {
    alliances: IAlliance[] | undefined
    teamData: ITeams
}

export const Alliances = (props: EligibleTeamsProps) => {
    if(props.alliances === undefined){
        return <Fragment/>
    }

    const barComponents = props.alliances.map((alliance) =>
        <AllianceInfo key={alliance.team1} alliance={alliance} teamData={props.teamData} />
    );
    return (
        <div className="alliances">
            <div className="teams">
                {barComponents}
            </div>
        </div>
    );
}