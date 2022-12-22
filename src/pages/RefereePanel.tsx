import { DISPLAY_STATE, IPath, TeamId, ITeams } from "@18x18az/rosetta";
import { Component, useEffect } from "react";
import { talos } from "../ws";

export const RefereePanel = () => {
    return (
        <div className="referee">
            <h1 className="matchtitle">match name - field name</h1>
            <h2>field timer</h2>
            <button className="bigbutton">QUEUE NEXT MATCH</button>
            <h3>red teams</h3>
            <h3>blue teams</h3>
        </div>
    )
}