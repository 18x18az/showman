import { Component } from 'react'
import { handleTopic } from './utils/talos'

class App extends Component {
  constructor () {
    super({})

    handleTopic('stage', this.messageHandler.bind(this))
    // client.on("message", this.messageHandler.bind(this))

    this.state = {
    }
  }

  messageHandler (topic: string, message: string): void {
    console.log(message)
  }

  render (): JSX.Element {
    return (
      <>
        Hello world
      </>
    )
  }
}

export default App
