// import { Button } from '@/components/ui/button'
// import { Switch } from '@/components/ui/switch'
// import { ArrowUpFromLine, Eraser, TimerIcon } from 'lucide-react'

export function Settings (): JSX.Element {
  return <div>foo</div>
  // if (automation === undefined || stage === undefined || block === undefined) {
  //   return <>Loading...</>
  // }

  // const inBlock = block !== null

  // let timeoutButton = <></>
  // if (stage === EventStage.ELIMS) {
  //   timeoutButton = <Button onClick={() => { void callTimeout() }} variant='secondary'><TimerIcon /></Button>
  // }

  // return (
  //   <>
  //     <div className='flex flex-col gap-4 text-zinc-400'>
  //       <div className='flex align-center gap-4 justify-between'>
  //         <label>Automation</label>
  //         <Switch onCheckedChange={(checked: boolean) => { void setAutomation(checked) }} checked={automation} />
  //       </div>
  //       <div className='flex align-center gap-4 justify-between'>
  //         <label>Skills</label>
  //         <Switch onCheckedChange={(checked: boolean) => { void enableSkills(checked) }} checked={skills} disabled={inBlock} />
  //       </div>
  //       <div className='flex justify-evenly'>
  //         {timeoutButton}
  //         <Button onClick={() => { void pushScore() }} variant='secondary'><ArrowUpFromLine /></Button>
  //         <Button onClick={() => { void clearScore() }} variant='secondary'><Eraser /></Button>
  //       </div>
  //     </div>
  //   </>
  // )
}
