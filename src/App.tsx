import { Component, Fragment } from "react";
import { handleTopic } from "./utils/talos";

interface Props {

}

interface State {

}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    handleTopic('stage', this.messageHandler.bind(this))
    //client.on("message", this.messageHandler.bind(this))

    this.state = {
    }
  }

  messageHandler(topic: string, message: string) {
    console.log(message)
  }

  render() {
    return (
      <Fragment>
        Hello world
      </Fragment>
    );
  }
}

export default App;
