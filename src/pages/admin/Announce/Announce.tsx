import { Component } from "react";
import { talos } from "../../../ws";

interface AnnouncementsProps {

}

enum BODY {
    DRIVERS_MEETING = "Driver Meeting",
    INSPECTION = "Inspection",
    RUNNING = "No Running",
    EATING = "No Eating",
    ALLIANCE = "Alliance",
    GYM = "Gym"
}

interface AnnouncementsState {
    body: BODY
    time: number
}

interface BodyButtonProps {
    body: BODY
    onClick: (body: BODY) => void
}

function BodyButton(props: BodyButtonProps) {
    return (
        <button onClick={() => props.onClick(props.body)}>
            {props.body}
        </button>
    )
}

interface TimeButtonProps {
    time: number
    onClick: (time: number) => void
}

function TimeButton(props: TimeButtonProps) {
    let contents = `${props.time}`;
    if (props.time === 0) {
        contents = "Now";
    }
    return (
        <button onClick={() => props.onClick(props.time)}>
            {contents}
        </button>
    )
}

function formMessage(body: BODY, time: number): string {
    if (body === BODY.EATING) {
        return "Reminder, no eating or drinking in the pits"
    }
    if (body === BODY.RUNNING) {
        return "Reminder, please do not run in the pits"
    }
    if (body === BODY.GYM) {
        return "All teams please come to the main gym"
    }

    let noun = ""
    if (body === BODY.DRIVERS_MEETING) {
        noun = "The drivers meeting will begin"
    } else if (body === BODY.ALLIANCE) {
        noun = "Alliance selection will begin"
    } else if (body === BODY.INSPECTION) {
        noun = "Inspection will close"
    }

    let duration = `in ${time} minutes`
    if (time === 0) {
        duration = "shortly"
    }

    return `${noun} ${duration}`;
}

async function send(message: string) {
    console.log(message)
    talos.post(["announce"], message);
}

export class Announcements extends Component<AnnouncementsProps, AnnouncementsState> {

    constructor(props: AnnouncementsProps) {
        super(props);
        this.state = {
            body: BODY.DRIVERS_MEETING,
            time: 0
        }
        this.updateTime = this.updateTime.bind(this);
        this.updateBody = this.updateBody.bind(this);
    }

    updateTime(time: number) {
        this.setState({
            time
        })
    }

    updateBody(body: BODY) {
        this.setState({
            body
        })
    }

    render() {
        document.title = "Announcements"
        const full = formMessage(this.state.body, this.state.time);
        return (
            <div className="announcementsControl">
                <div>
                    <BodyButton onClick={this.updateBody} body={BODY.DRIVERS_MEETING} />
                    <BodyButton onClick={this.updateBody} body={BODY.INSPECTION} />
                    <BodyButton onClick={this.updateBody} body={BODY.EATING} />
                    <BodyButton onClick={this.updateBody} body={BODY.RUNNING} />
                    <BodyButton onClick={this.updateBody} body={BODY.ALLIANCE} />
                    <BodyButton onClick={this.updateBody} body={BODY.GYM} />
                </div>
                <div>
                    <TimeButton onClick={this.updateTime} time={30} />
                    <TimeButton onClick={this.updateTime} time={20} />
                    <TimeButton onClick={this.updateTime} time={15} />
                    <TimeButton onClick={this.updateTime} time={10} />
                    <TimeButton onClick={this.updateTime} time={5} />
                    <TimeButton onClick={this.updateTime} time={0} />
                </div>
                {full}
                <button onClick={() => send(full)}>Send</button>
            </div>
        );
    }
}