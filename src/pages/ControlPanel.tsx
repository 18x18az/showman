import { Teams } from "@18x18az/rosetta";

interface ControlPanelProps {
    teams: Teams
}

export function ControlPanel(props: ControlPanelProps) {
    return <h1>{JSON.stringify(props.teams)}</h1>;
};
