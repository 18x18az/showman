import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ControlPanel } from "./pages/ControlPanel";
import { NoPage } from './pages/NoPage';
import { Score } from "./pages/Score";
import './App.css';
import { Component } from "react";
import { IPath, Teams } from "@18x18az/rosetta";
import {talos} from './ws'

interface IProps {
}

interface IState {
  teams: Teams | null
  lastMessagePath: IPath | null
  lastMessagePayload: any
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      teams: null,
      lastMessagePath: null,
      lastMessagePayload: null
    }

    talos.postCb = this.messageHandler.bind(this);
    talos.get(['teams']);
  }

  messageHandler(path: IPath, payload: any) {
    console.log(path);
    console.log(payload);
    const route = path[0];
    if (route === "teams") {
      this.setState({
        teams: payload
      });
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
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ControlPanel teams={this.state.teams} />} />
            <Route path="score" element={<Score
              teams={this.state.teams}
              lastMessagePath={this.state.lastMessagePath}
              lastMessageBody={this.state.lastMessagePayload}
            />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
