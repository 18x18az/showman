import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ArrowUpFromLine, Eraser, TimerIcon } from 'lucide-react'
import { EventStage, useClearResultsMutation, useCompetitionMiniSettingsQuery, usePromoteResultsMutation, useSetAutomationEnabledMutation, useSetSkillsEnabledMutation } from '../../../__generated__/graphql'

export function Settings (): JSX.Element {
  const { data: compData } = useCompetitionMiniSettingsQuery({ pollInterval: 500 })
  const [setAutomationEnabled] = useSetAutomationEnabledMutation({ refetchQueries: ['CompetitionMiniSettings'] })
  const [setSkillsEnabled] = useSetSkillsEnabledMutation({ refetchQueries: ['CompetitionMiniSettings'] })
  const [clearResults] = useClearResultsMutation({ refetchQueries: ['CompetitionMiniSettings'] })
  const [promoteResults] = usePromoteResultsMutation({ refetchQueries: ['CompetitionMiniSettings'] })

  if (compData === undefined) {
    return <>Loading...</>
  }

  const stage = compData.stage.stage

  const automation = compData.competitionInformation.automationEnabled
  const inBlock = compData.currentBlock !== null
  const resultsShowing = compData.results.displayedResults !== null
  const resultsReady = compData.results.nextResults !== null

  const canEnableSkills = !inBlock && (stage === EventStage.Checkin || stage === EventStage.Qualifications)
  const isSkillsEnabled = compData.fields[0].canRunSkills

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
              void setAutomationEnabled({ variables: { enabled: checked } })
            }} checked={automation}
          />
        </div>
        <div className='flex align-center gap-4 justify-between'>
          <label>Skills</label>
          <Switch onCheckedChange={(checked: boolean) => { void setSkillsEnabled({ variables: { enabled: checked } }) }} checked={isSkillsEnabled} disabled={!canEnableSkills} />
        </div>
        <div className='flex justify-evenly'>
          {timeoutButton}
          <Button onClick={() => { void promoteResults() }} disabled={!resultsReady}><ArrowUpFromLine /></Button>
          <Button onClick={() => { void clearResults() }} disabled={!resultsShowing}><Eraser /></Button>
        </div>
      </div>
    </>
  )
}
