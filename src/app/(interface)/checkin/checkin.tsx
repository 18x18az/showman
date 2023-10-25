// 'use client'

// import { useState } from 'react'
// import { Dropdown } from '@/components/primitives/Dropdown'
// import { EmptyPost, JsonTopic } from '@/utils/maestro'
// import { accessRedirect } from '@/utils/AccessRedirect'
// import { selectCanAccessCheckin } from '@/lib/redux'
// import { Button } from '@/components/ui/button'
// import { toast } from '@/components/ui/use-toast'
// import { CheckSquare } from 'lucide-react'

// interface ExpectedResult {
//   teams: string[] | undefined
// }

// export default function CheckInBody (): JSX.Element | null {
//   accessRedirect(selectCanAccessCheckin)
//   const notCheckedIn: string[] | undefined = JsonTopic<ExpectedResult>('inspection/stage/NOT_HERE', { teams: undefined }).teams

//   const [selected, setSelected] = useState<string | undefined>(undefined)

//   if (notCheckedIn === undefined) {
//     return <></>
//   }

//   if (notCheckedIn.length === 0) {
//     return (
//       <div className='text-center my-24'>
//         <h1 className='text-indigo-9 text-6xl mb-6'>Team Check-In Complete</h1>
//         <h2 className='text-slate-12 text-4xl'>Please return device to tech operator</h2>
//       </div>
//     )
//   }

//   if (selected === undefined || !(notCheckedIn.some(value => value === selected))) {
//     setSelected(notCheckedIn[0])
//   }

//   async function sendCheckIn (team: string | undefined): Promise<void> {
//     if (team === undefined) {
//       return
//     }
//     const resource = `inspection/${team}/checkedIn`
//     await EmptyPost(resource)
//     toast({
//       duration: 3000,
//       description: (
//         <div className='text-xl flex gap-4 content-center align-center'><CheckSquare size='28' /> Team {team} checked in</div>
//       )
//     })
//   }

//   return (
//     <div className='flex flex-col mt-24 mb-24 gap-8 items-center'>
//       <h1 className='text-6xl text-slate-12 mb-6 text-slate-12'>Team Check-In</h1>
//       <Dropdown size='L' value={selected ?? ''} options={notCheckedIn} onChange={(value: string) => { setSelected(value) }} />
//       <Button onClick={() => { void sendCheckIn(selected) }} size='lg'>Check In</Button>
//     </div>
//   )
// }
