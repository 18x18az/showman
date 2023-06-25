import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StringTopic } from './utils/talos'
import { EventStage } from '@18x18az/rosetta'
import { AdminRoot } from './Pages/Admin/AdminRoot'

export default function App (): JSX.Element {
  const stage = StringTopic('stage', EventStage.LOADING)

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
