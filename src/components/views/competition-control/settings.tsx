import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { EventStage, StageSubscription } from '@/contracts/stage'
import { ArrowUpFromLine, Eraser, TimerIcon } from 'lucide-react'
import { AutomationSubscription, setAutomation } from '@/contracts/automation'
import { callTimeout } from '@/contracts/match-control'
import { clearScore, pushScore } from '@/contracts/stream-control'

export function Settings (): JSX.Element {
  const automation = AutomationSubscription()
  const stage = StageSubscription()

  if (automation === undefined || stage === undefined) {
    return <>Loading...</>
  }

  let timeoutButton = <></>
  if (stage === EventStage.ELIMS) {
    timeoutButton = <Button onClick={() => { void callTimeout() }} variant='secondary'><TimerIcon /></Button>
  }

  return (
    <>
      <div className='flex flex-col gap-4 text-zinc-400'>
        <div className='flex align-center gap-4 justify-between'>
          <label>Automation</label>
          <Switch onCheckedChange={(checked: boolean) => { void setAutomation(checked) }} checked={automation} />
        </div>
        <div className='flex justify-evenly'>
          {timeoutButton}
          <Button onClick={() => { void pushScore() }} variant='secondary'><ArrowUpFromLine /></Button>
          <Button onClick={() => { void clearScore() }} variant='secondary'><Eraser /></Button>
        </div>
      </div>
    </>
  )
}
