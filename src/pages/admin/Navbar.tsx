import { COMPETITION_STAGE } from "@18x18az/rosetta";

export enum ControlMode {
    IDLE = "Idle",
    INSPECTION = "Inspection",
    DISPLAY = "Display",
    MATCH = "Match",
    ALLIANCE = "Alliance Selection",
    AWARDS = "Awards",
    ANNOUNCEMENTS = "Announce"
}

export const bars = new Map();

bars.set(COMPETITION_STAGE.INSPECTION, [ControlMode.ANNOUNCEMENTS, ControlMode.INSPECTION, ControlMode.DISPLAY])
bars.set(COMPETITION_STAGE.QUALS, [ControlMode.ANNOUNCEMENTS, ControlMode.MATCH, ControlMode.DISPLAY, ControlMode.ALLIANCE])
bars.set(COMPETITION_STAGE.IDLE, [ControlMode.ANNOUNCEMENTS, ControlMode.DISPLAY])
bars.set(COMPETITION_STAGE.ALLIANCE, [ControlMode.ANNOUNCEMENTS, ControlMode.DISPLAY, ControlMode.ALLIANCE])
bars.set(COMPETITION_STAGE.ELIMS, [ControlMode.ANNOUNCEMENTS, ControlMode.MATCH, ControlMode.DISPLAY, ControlMode.AWARDS])
bars.set(COMPETITION_STAGE.AWARDS, [ControlMode.ANNOUNCEMENTS, ControlMode.MATCH, ControlMode.DISPLAY, ControlMode.AWARDS])

interface NavbarProps {
    stage: COMPETITION_STAGE
    selected: ControlMode
    onSelect: (selected: ControlMode) => void
}

export const Navbar = (props: NavbarProps) => {
    const barItems = bars.get(props.stage);
    const barComponents = barItems.map((item: ControlMode) => 
        <button className={String(item==props.selected)} key={item} onClick={() => props.onSelect(item)}>{item}</button>
    );
    return(
        <div className="nav">{barComponents}</div>
    );
};