import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ControlPanel } from "./pages/admin/Index";
import { NoPage } from './pages/NoPage';
import { Score } from "./pages/audience/Score";
import './App.css';
import { Component } from "react";
import { IPath, ITeams, IMatchList, COMPETITION_STAGE } from "@18x18az/rosetta";
import { talos } from './ws'
import { Timer } from "./pages/timer/Timer";
import { Audience } from "./pages/audience/Audience";
import { Upcoming } from "./pages/audience/Upcoming";
import { RefereePanel } from "./pages/tablet/RefereePanel";
import { Pit } from "./pages/pit/Pit";
import { DebugPanel } from "./pages/Debug";
import { Tablet } from "./pages/tablet/Tablet";

interface IProps {
}

interface IState {
  teams: ITeams | null
  matches: IMatchList | null
  stage: COMPETITION_STAGE
  lastMessagePath: IPath | null
  lastMessagePayload: any
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      teams: null,
      matches: null,
      stage: COMPETITION_STAGE.IDLE,
      lastMessagePath: null,
      lastMessagePayload: null
    }

    talos.postCb = this.messageHandler.bind(this);
    talos.get(['teams']);
    talos.get(['matches']);
    talos.get(['stage']);
  }

  messageHandler(path: IPath, payload: any) {
    const route = path[0];
    if (route === "teams") {
      this.setState({
        teams: payload
      });
    } else if (route === "matches") {
      this.setState({
        matches: payload
      })
    } else if (route === "stage") {
      this.setState({
        stage: payload,
        lastMessagePath: path,
        lastMessagePayload: payload
      })
    } else {
      this.setState({
        lastMessagePath: path,
        lastMessagePayload: payload
      });
    }

    return null
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Pit
                teams={this.state.teams}
                matches={this.state.matches}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />
            </Route>
            <Route exact path="/admin">
              <ControlPanel
                teams={this.state.teams}
                matches={this.state.matches}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />
            </Route>
            <Route exact path="/debug">
              <DebugPanel stage={this.state.stage} />
            </Route>
            <Route path="/audience">
              <Audience
                teams={this.state.teams}
                matches={this.state.matches}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />
            </Route>
            <Route path="/timer">
              <Timer
                teams={this.state.teams}
                matches={this.state.matches}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />
            </Route>
            <Route path="/referee">
              <Tablet
                teams={this.state.teams}
                matches={this.state.matches}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload} />
            </Route>
            <Route path="*">
              <NoPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
