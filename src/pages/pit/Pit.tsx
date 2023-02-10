import { COMPETITION_STAGE, IInspectionStatus, IFieldState, IMatchList, IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../../ws";
import { Default } from "./Default";
import { Inspection } from "./Inspection/Inspection";
import { Qualification } from "./Qualification/Qualifcation";

const voice = window.speechSynthesis;
interface PitProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface PitState {
    stage: COMPETITION_STAGE
    inspectionStatus: IInspectionStatus | null
    field: IFieldState | null
    lastAnnouncement: string
}

export class Pit extends Component<PitProps, PitState> {
    constructor(props: PitProps) {
        super(props);
        talos.get(['stage']);
        talos.get(['inspection']);
        talos.get(['field']);
        this.state = {
            stage: COMPETITION_STAGE.IDLE,
            inspectionStatus: null,
            field: null,
            lastAnnouncement: ""
        }
    }

    static getDerivedStateFromProps(nextProps: PitProps, prevState: PitState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
        }

        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "stage") {
                return ({
                    stage: nextProps.lastMessageBody
                })
            }

            if (route === "inspection") {
                return ({
                    inspectionStatus: nextProps.lastMessageBody
                })
            }

            if (route === "field") {
                return ({
                    field: nextProps.lastMessageBody
                })
            }

            if (route === "announce") {
                const announcement = nextProps.lastMessageBody;
                if (announcement !== prevState.lastAnnouncement && !voice.speaking) {
                    const voices = voice.getVoices();
                    const desiredIndex = voices.findIndex((option) => option.voiceURI === "Google UK English Male");
                    const msg = new SpeechSynthesisUtterance();
                    if(desiredIndex){
                        msg.voice = voices[desiredIndex];
                    }
                    msg.text = announcement;
                    voice.speak(msg)
                    return({
                        lastAnnouncement: announcement
                    })
                }
            }
        }
        return null;
    }

    render() {
        document.title = "Pit Display"
        let content = <Default />

        const synth = window.speechSynthesis;
        const textValue = "hello world"
        const utterance = new SpeechSynthesisUtterance(textValue);

        if (this.props.teams) {
            switch (this.state.stage) {
                case COMPETITION_STAGE.INSPECTION: {
                    content = <Inspection teams={this.props.teams} inspectionState={this.state.inspectionStatus} />
                    break;
                }

                case COMPETITION_STAGE.QUALS: {
                    content = <Qualification teams={this.props.teams} matches={this.props.matches} field={this.state.field} />
                    break;
                }

                case COMPETITION_STAGE.ELIMS: {
                    content = <Qualification teams={this.props.teams} matches={this.props.matches} field={this.state.field} />
                    break;
                }

                case COMPETITION_STAGE.AWARDS: {
                    content = <Qualification teams={this.props.teams} matches={this.props.matches} field={this.state.field} />
                    break;
                }
            }
        }

        return (
            <div className="pit">
                <div className="l2">
                    <div className="l3">
                        {content}
                    </div>
                </div>
            </div>
        )
    }
};