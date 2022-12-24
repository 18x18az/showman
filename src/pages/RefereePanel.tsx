import { FIELD_CONTROL, IAllianceTeams, IFieldInfo, IFieldState, IMatchList, IPath, ITeams } from "@18x18az/rosetta";
import { useEffect } from "react";
import { talos } from "../ws";
import { determineMatch } from "../utils/Field";
import { makeClockText, makeControlText, makeMatchName } from "../utils/TextGenerator";

export const RefereePanel = () => {
    useEffect(() => {
        
    });

    function onClick() {
        talos.post(["fieldcontrol"], {"type": "QUEUE", "action": "NextMatch"})
    }

    return (
        <div className="referee">
            <h1 className="matchtitle">match name - field name</h1>
            <h2>mode - field timer</h2>
            <button className="bigbutton" onClick={onClick}>QUEUE NEXT MATCH</button>
            <div className="redteams">
                <p>2114Z</p>
                <p>8800X</p>
            </div>
            <div className="blueteams">
                <p>6030J</p>
                <p>127C</p>
            </div>
        </div>
    )
}