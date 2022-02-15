import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ControlPanel } from "./pages/ControlPanel";
import { NoPage } from './pages/NoPage';
import { Score } from "./pages/Score";
import './App.css';
import { Component } from "react";
import { IPath, Teams, IMatchList } from "@18x18az/rosetta";
import { talos } from './ws'
import { Timer } from "./pages/Timer";
import { Audience } from "./pages/Audience";
import { Upcoming } from "./pages/Upcoming";

interface IProps {
}

interface IState {
  teams: Teams | null
  matches: IMatchList | null
  lastMessagePath: IPath | null
  lastMessagePayload: any
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      teams: null,
      matches: null,
      lastMessagePath: null,
      lastMessagePayload: null
    }

    talos.postCb = this.messageHandler.bind(this);
    talos.get(['teams']);
    talos.get(['matches']);
  }

  messageHandler(path: IPath, payload: any) {
    console.log(path);
    console.log(payload);
    const route = path[0];
    if (route === "teams") {
      this.setState({
        teams: payload
      });
    } else if (route === "matches") {
      this.setState({
        matches: payload
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
              <ControlPanel
                teams={this.state.teams}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />
            </Route>
            <Route path="/audience">
              <Audience
                teams={this.state.teams}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />
            </Route>
            <Route path="/timer/:field?">
              <Timer
                teams={this.state.teams}
                matches={this.state.matches}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />
            </Route>
            <Route path="/upcoming">
              <Upcoming
                teams={this.state.teams}
                matches={this.state.matches}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />
            </Route>
            <Route path="/score">
              <Score
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
