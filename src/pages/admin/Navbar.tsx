import { COMPETITION_STAGE } from "@18x18az/rosetta";

export enum ControlMode {
    IDLE = "Idle",
    INSPECTION = "Inspection",
    DISPLAY = "Display",
    MATCH = "Match",
    ALLIANCE = "Alliance Selection"
}

const bars = new Map();

bars.set(COMPETITION_STAGE.INSPECTION, [ControlMode.INSPECTION, ControlMode.DISPLAY])
bars.set(COMPETITION_STAGE.QUALS, [ControlMode.MATCH, ControlMode.DISPLAY])
bars.set(COMPETITION_STAGE.IDLE, [ControlMode.DISPLAY])

interface NavbarProps {
    stage: COMPETITION_STAGE
    onSelect: (selected: ControlMode) => void
}

export const Navbar = (props: NavbarProps) => {
    const barItems = bars.get(props.stage);
    const barComponents = barItems.map((item: ControlMode) => 
        <button key={item} onClick={() => props.onSelect(item)}>{item}</button>
    );
    return(
        <div className="nav">{barComponents}</div>
    );
};