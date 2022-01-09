import { Teams } from "@18x18az/rosetta";

interface ControlPanelProps {
    teams: Teams | null
}

export function ControlPanel(props: ControlPanelProps) {
    return <h1>{JSON.stringify(props.teams)}</h1>;
};
