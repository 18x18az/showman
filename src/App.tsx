import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ControlPanel } from "./pages/ControlPanel";
import { NoPage } from './pages/NoPage';
import { Websocket } from "@18x18az/ouija";
import './App.css';
import { Component } from "react";
import { IPath, Teams } from "@18x18az/rosetta";

const talos_url = "ws://localhost:1270"

const talos = new Websocket(talos_url);

interface IProps {
}

interface IState {
  teams: Teams
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const emptyTeams: Teams = {};
    this.state = {
      teams: emptyTeams
    }

    talos.postCb = this.messageHandler.bind(this);

    talos.get(['teams']);
  }

  messageHandler(path: IPath, payload: any) {
    const route = path[0];
    if(route === "teams") {
      this.setState({
        teams: payload
      })
    }
    
    return null
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ControlPanel teams={this.state.teams}/>}>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
