import { COMPETITION_STAGE } from "@18x18az/rosetta";
import { talos } from "../ws";

function changeStage(stage: COMPETITION_STAGE){
    talos.post(["stage"], stage);
}

interface StageChangerProps {
    value: COMPETITION_STAGE
}

const StageChanger = (props: StageChangerProps) => {
    return <button onClick={() => changeStage(props.value)}>{props.value}</button>
}

interface DebugPanelProps {
    stage: COMPETITION_STAGE
}

export const DebugPanel = (props: DebugPanelProps) => {
    document.title = "Debug Menu"
    return <div>
        <h1>{props.stage}</h1>
        <StageChanger value={COMPETITION_STAGE.IDLE}/>
        <StageChanger value={COMPETITION_STAGE.INSPECTION}/>
        <StageChanger value={COMPETITION_STAGE.QUALS}/>
        <StageChanger value={COMPETITION_STAGE.ALLIANCE}/>
        <StageChanger value={COMPETITION_STAGE.ELIMS}/>
        <StageChanger value={COMPETITION_STAGE.AWARDS}/>
    </div>
};
