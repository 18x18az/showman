import { IMatchList } from "@18x18az/rosetta";

interface ControlPanelProps {
    matches: IMatchList | null
}

export function ControlPanel(props: ControlPanelProps) {
    return <h1>{JSON.stringify(props.matches)}</h1>;
};
