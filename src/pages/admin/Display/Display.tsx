import { DISPLAY_STATE } from "@18x18az/rosetta";
import { talos } from "../../../ws";

function showUpcoming() {
    talos.post(['display'], DISPLAY_STATE.UPCOMING);
}

function showScore() {
    talos.post(['display'], DISPLAY_STATE.SCORE);
}

function showOther() {
    talos.post(['display'], DISPLAY_STATE.OTHER);
}

function showNone() {
    talos.post(['display'], DISPLAY_STATE.NONE);
}

export const Display = () => {
    document.title = "Display Control"
    return(
        <div className="displayControl">
            <button onClick={showUpcoming}>Upcoming</button>
            <button onClick={showScore}>Score</button>
            <button onClick={showNone}>None</button>
            <button onClick={showOther}>Other</button>
        </div>
    );
}