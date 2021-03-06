import { IPath } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";

interface CycleTimePanelProps {
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface CycleTimePanelState {
    recentMatches: Array<string>
    recentCycleTimes: Array<number>
    rollingAvg: number
    sctMin: number
    sctSec: number
}

let scheduledTime: string = "";

function displayTime(min: number, sec: number){
    if(sec < 10){
        return min + ":0" + sec;
    }
    else if(sec >= 60){
        let bonus = Math.floor(sec/60);
        let surplus = sec % 60;
        if(surplus < 10)
            return min+bonus + ":0" + surplus;
        else
            return min+bonus + ":" + surplus;
    }
    else return min + ":" + sec;
}
export class CycleTimePanel extends Component<CycleTimePanelProps, CycleTimePanelState> {
    constructor(props: CycleTimePanelProps) {
        super(props);
        this.state = {
            recentMatches: [],
            recentCycleTimes: [],
            rollingAvg: 0,
            sctMin: 0,
            sctSec: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    CycleTime(match_: string, time: number){
        let sec = Math.floor((time - Math.floor(time)) * 60);
        let diff = Math.abs(time - (this.state.sctMin + this.state.sctSec/60))
        let deltaMin = Math.floor(diff);
        let deltaSec = Math.round((diff - Math.floor(diff)) * 60);
        let delta = (this.state.sctMin + this.state.sctSec/60 < time ? " slower" : " faster");
        if(match_ !== "rolling average")
            return match_ + ": took " + displayTime(Math.floor(time), sec) + " to begin match; " + displayTime(Math.floor(deltaMin), deltaSec) + delta;
        else
            return "Taking " + displayTime(Math.floor(time), sec) + " on average to begin match; " + displayTime(Math.floor(deltaMin), deltaSec) + delta;
    }

    CycleTimes(state: CycleTimePanelState){
        let matches = [];
        for(let i = 0; i < state.recentCycleTimes.length; i++){
            matches.push(this.CycleTime(state.recentMatches[i], state.recentCycleTimes[i]));
        }
        let listItems = matches.map(
            (match) => <li>{match}</li>
        );
        return <div className="cycleTimes">Recent cycle times:<ul>{listItems}</ul></div>
    }

    static getDerivedStateFromProps(props: CycleTimePanelProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
            if(route === "cycleTime"){ // if this is the case, update state
                return {
                    recentMatches: props.lastMessageBody.recentMatches,
                    recentCycleTimes: props.lastMessageBody.recentCycleTimes,
                    rollingAvg: props.lastMessageBody.rollingAvg
                }
            }
        }
        return null
    }

    handleSubmit(event: any) {
        event.preventDefault();
        // check if scheduled cycle time is valid format
        let numbers = scheduledTime.split(':', 2);
        if(numbers.length < 2){
            return;
        }
        let minutes: number = parseInt(numbers[0])
        let seconds: number = parseInt(numbers[1])
        if(isNaN(minutes) || isNaN(seconds)){
            return;
        }
        this.setState({
            sctMin: minutes,
            sctSec: seconds
        });

        this.forceUpdate();
    }
    handleChange(event: any) {
        scheduledTime = event.target.value;
    }

    render() {
        
        return <div>
            {this.CycleTimes(this.state)}
            {this.CycleTime("rolling average", this.state.rollingAvg)}
            <form onSubmit={this.handleSubmit}>
            <label>
            Input scheduled cycle time (m:ss):
            <input type="text" onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
            </form>
            Scheduled Cycle Time: {displayTime(this.state.sctMin, this.state.sctSec)}
        </div>
    }
};
