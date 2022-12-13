import { DISPLAY_STATE, IAllianceSelectionStatus, IPath, TeamId, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { talos } from "../ws";

function chooseCb(team: TeamId) {
    talos.post(['allianceSelection', 'pick'], team);
}

function cancelCb() {
    talos.post(['allianceSelection', 'cancel'], null);
}

function acceptCb() {
    talos.post(['allianceSelection', 'accept'], null);
}

function declineCb() {
    talos.post(['allianceSelection', 'decline'], null);
}

function undoCb() {
    talos.post(['allianceSelection', 'undo'], null);
}

function noShowCb() {
    talos.post(['allianceSelection', 'noShow'], null);
}

function finalizeCb() {
    talos.post(['display'], DISPLAY_STATE.UPCOMING);
}

interface PopupProps {
    picker: TeamId
    picked: TeamId
    teams: ITeams
}

function Popup(props: PopupProps) {
    const picked = props.teams[props.picked].number;
    const picker = props.teams[props.picker].number;
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <h1>{picker} → {picked}</h1>
                <div className='buttonRow'>
                    <button className="popupButton" onClick={cancelCb}>Cancel</button>
                    <button className="popupButton" onClick={acceptCb}>Accept</button>
                    <button className="popupButton" onClick={declineCb}>Decline</button>
                </div>
            </div>
        </div>
    );
}
interface IChoiceProps {
    teams: ITeams
    choice: TeamId
}

function Choice(props: IChoiceProps) {
    const choice = props.choice;
    const choiceName = props.teams[choice].number;
    return <button onClick={() => chooseCb(choice)} key={choice} className="team">{choiceName}</button>
}
interface IChoicesProps {
    teams: ITeams
    choices: Array<TeamId>
}

function Choices(props: IChoicesProps) {
    const choices = props.choices;
    if (!choices) {
        return <div></div>
    }
    let choiceItems = [];

    for (let i = 0; i < choices.length; i++) {
        const choice = choices[i];
        const choiceItem = <Choice teams={props.teams} choice={choice} />
        choiceItems.push(choiceItem);
    }

    return <div className="teams">{choiceItems}</div>
}
interface IPickingProps {
    picking: TeamId | null
    teams: ITeams
}

function Picking(props: IPickingProps) {
    if (props.picking) {
        const picking = props.teams[props.picking].number;
        return <div className="picking">{picking}</div>
    } else {
        return <div></div>
    }
}
interface AllianceSelectionControlPanelProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}
interface AllianceSelectionControlPanelState {
    status: IAllianceSelectionStatus | null
}

export class AllianceSelectionControlPanel extends Component<AllianceSelectionControlPanelProps, AllianceSelectionControlPanelState> {
    constructor(props: AllianceSelectionControlPanelProps) {
        super(props);

        document.title = "Alliance Selection";

        this.state = {
            status: null
        }
    }

    static getDerivedStateFromProps(nextProps: AllianceSelectionControlPanelProps) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "allianceSelection") {
                return { status: nextProps.lastMessageBody }
            }
        }

        return null;
    }

    render() {
        if (this.props.teams && this.state.status) {
            const picking = this.state.status.picking;
            const remaining = this.state.status.eligible;
            const picked = this.state.status.selected;
            const teams = this.props.teams;

            return <div className="mobile">
                <Picking teams={teams} picking={picking} />
                <Choices teams={teams} choices={remaining} />
                <div className="footer">
                    <button className="undoButton" onClick={undoCb}>Undo</button>
                    <button className="noShowButton" onClick={noShowCb}>No Show</button>
                    <button className="finalizeButton" onClick={finalizeCb}>Finalize</button>
                </div>
                {picked && picking ?
                    <Popup
                        teams={teams}
                        picker={picking}
                        picked={picked}
                    />
                    : null
                }
            </div>
        } else {
            return <div></div>
        }

    }
};
