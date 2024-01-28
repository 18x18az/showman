import { Switch } from '@/components/ui/switch'
import { ArrowUpFromLine, Eraser, TimerIcon } from 'lucide-react'
import { EventStage, useCancelTimeoutMutation, useClearResultsMutation, useCompetitionMiniSettingsQuery, usePromoteResultsMutation, useSetAutomationEnabledMutation, useSetSkillsEnabledMutation, useStartTimeoutMutation } from '../../../__generated__/graphql'
import { StopIcon } from '@radix-ui/react-icons'
import ErrorableButton from '../../errorable-button/ErrorableButton'

export function Settings (): JSX.Element {
  const { data: compData } = useCompetitionMiniSettingsQuery({ pollInterval: 500 })
  const [setAutomationEnabled] = useSetAutomationEnabledMutation({ refetchQueries: ['CompetitionMiniSettings'] })
  const [setSkillsEnabled] = useSetSkillsEnabledMutation({ refetchQueries: ['CompetitionMiniSettings'] })

  const refetch = { refetchQueries: ['CompetitionMiniSettings'] }

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
    if (compData.timeout.endTime === null) {
      timeoutButton = <ErrorableButton tooltip='Start Timeout' mutation={useStartTimeoutMutation} options={refetch}> <TimerIcon /></ErrorableButton>
    } else {
      timeoutButton = <ErrorableButton tooltip='End Timeout' mutation={useCancelTimeoutMutation} options={refetch}><StopIcon /></ErrorableButton>
    }
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
          <ErrorableButton tooltip='Display Results' mutation={usePromoteResultsMutation} options={refetch} disabled={!resultsReady}><ArrowUpFromLine /></ErrorableButton>
          <ErrorableButton tooltip='Clear Results' mutation={useClearResultsMutation} options={refetch} disabled={!resultsShowing}><Eraser /></ErrorableButton>
        </div>
      </div>
    </>
  )
}
