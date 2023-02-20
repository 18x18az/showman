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

function transition(transition: string){
    talos.post(['director', 'transition'], transition);
}

function sting(){
    transition('sting');
}

function cut(){
    transition('cut');
}

function overlay(overlay: string){
    talos.post(['director', 'overlay'], overlay);
}

function clean(){
    overlay('clean');
}

function audience(){
    overlay('audience');
}

function timer(){
    overlay('timer');
}

export const Display = () => {
    document.title = "Display Control"
    return (
        <div className="displayControl">
            <div>
                <button onClick={showUpcoming}>Upcoming</button>
                <button onClick={showScore}>Score</button>
                <button onClick={showNone}>None</button>
                <button onClick={showOther}>Other</button>
            </div>
            <div>
                <button onClick={sting}>Stinger</button>
                <button onClick={cut}>Cut</button>
            </div>
            <div>
                <button onClick={clean}>Clean</button>
                <button onClick={timer}>Timer</button>
                <button onClick={audience}>Audience</button>
            </div>
        </div>
    );
}
