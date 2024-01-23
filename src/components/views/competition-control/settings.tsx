import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ArrowUpFromLine, Eraser, TimerIcon } from 'lucide-react'
import { EventStage, useCompetitionMiniSettingsQuery, useSetAutomationEnabledMutation } from '../../../__generated__/graphql'

export function Settings (): JSX.Element {
  const stage = EventStage.Qualifications
  const skills = false

  const { data: compData } = useCompetitionMiniSettingsQuery({ pollInterval: 500 })
  const [setAutomationEnabled] = useSetAutomationEnabledMutation({ refetchQueries: ['CompetitionMiniSettings'] })

  if (compData === undefined) {
    return <>Loading...</>
  }

  const automation = compData.competitionInformation.automationEnabled

  const inBlock = true

  let timeoutButton = <></>
  if (stage === EventStage.Elims) {
    timeoutButton = <Button onClick={() => { }}><TimerIcon /></Button>
  }

  return (
    <>
      <div className='flex flex-col gap-4 text-slate-11'>
        <div className='flex align-center gap-4 justify-between'>
          <label>Auto-Queue</label>
          <Switch
            onCheckedChange={(checked: boolean) => {
              setAutomationEnabled({ variables: { enabled: checked } })
            }} checked={automation}
          />
        </div>
        <div className='flex align-center gap-4 justify-between'>
          <label>Skills</label>
          <Switch onCheckedChange={(checked: boolean) => { }} checked={skills} disabled={inBlock} />
        </div>
        <div className='flex justify-evenly'>
          {timeoutButton}
          <Button onClick={() => { }}><ArrowUpFromLine /></Button>
          <Button onClick={() => { }}><Eraser /></Button>
        </div>
      </div>
    </>
  )
}
