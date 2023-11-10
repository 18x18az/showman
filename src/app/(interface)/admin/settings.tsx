import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EventStage } from "@/contracts/stage";
import { EmptyPost, JsonTopic, Post } from "@/utils/maestro";
import { ArrowUpFromLine, Eraser, TimerIcon } from "lucide-react";

enum AutomationState {
    ENABLED = 'ENABLED',
    CAN_ENABLE = 'CAN_ENABLE',
    DISABLED = 'DISABLED',
  }

export function Settings(): JSX.Element {

    const automation = JsonTopic<{state: AutomationState}>('automation')
    const stage = JsonTopic<{stage: EventStage}>('stage')
    if(automation === undefined || stage === undefined) {
        return <>Loading...</>
    }
    

    const isAutomated = automation.state === AutomationState.ENABLED
    const canAutomate = automation.state !== AutomationState.DISABLED

    const setAutomation = (state: boolean) => {
        void Post('fieldControl/automation', {state})
    }

    let timeoutButton = <></>
    if(stage.stage === EventStage.ELIMS) {
        timeoutButton = <Button onClick={() => {void EmptyPost('fieldControl/timeout')}} variant='secondary'><TimerIcon /></Button>
    }

  return <>
  <div className="flex flex-col gap-4 text-zinc-400">
    <div className="flex align-center gap-4 justify-between">
    <label>Automation</label>
    <Switch onCheckedChange={setAutomation} disabled={!canAutomate} checked={isAutomated}/>
  </div>
  <div className="flex align-center gap-4 justify-between w-full">
    <label>Replays</label>
    <Switch />
  </div>
  <div className="flex justify-evenly">
  {timeoutButton}
  <Button onClick={() => {void EmptyPost('stream/pushScore')}} variant='secondary'><ArrowUpFromLine /></Button>
  <Button onClick={() => {void EmptyPost('stream/clearScore')}} variant='secondary'><Eraser /></Button>
  </div>
  </div>
  </>
}