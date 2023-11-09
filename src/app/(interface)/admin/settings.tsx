import { Switch } from "@/components/ui/switch";
import { JsonTopic, Post } from "@/utils/maestro";

enum AutomationState {
    ENABLED = 'ENABLED',
    CAN_ENABLE = 'CAN_ENABLE',
    DISABLED = 'DISABLED',
  }

export function Settings(): JSX.Element {

    const automation = JsonTopic<{state: AutomationState}>('automation')
    if(automation === undefined) {
        return <>Loading...</>
    }

    const isAutomated = automation.state === AutomationState.ENABLED
    const canAutomate = automation.state !== AutomationState.DISABLED

    const setAutomation = (state: boolean) => {
        void Post('fieldControl/automation', {state})
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
  </div>
  </>
}