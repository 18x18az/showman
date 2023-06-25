import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useState } from 'react'
import { handleTopic } from './utils/talos'
import { EventStage } from '@18x18az/rosetta'
import { AdminRoot } from './Pages/Admin/AdminRoot'

export default function App (): JSX.Element {
  const [stage, setStage] = useState(EventStage.LOADING)
  const stageHandler = (topic: string, raw: string): void => (setStage(raw as EventStage))
  handleTopic('stage', stageHandler)
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            Test
          </Route>
          <Route exact path='/admin'>
            <AdminRoot stage={stage} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}
