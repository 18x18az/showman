// 'use client'

// import { selectIsUnassigned, selectUserName, useSelector } from '@/lib/redux'
// import { accessRedirect } from '@/utils/AccessRedirect'

// export function LoginBody (): JSX.Element {
//   accessRedirect(selectIsUnassigned, true)

//   const name = useSelector(selectUserName)

//   let shortName = name ?? ''
//   if (shortName.length > 15) {
//     shortName = '...' + shortName.substring(shortName.length - 10)
//   }

//   return (
//     <div className='text-center my-40 mx-10 bg-slate-3 py-12 px-32 rounded-lg'>
//       <h1 className='text-slate-12 text-4xl mb-8'>Device Name</h1>
//       <h2 className='text-indigo-9 text-7xl'>{shortName}</h2>
//     </div>
//   )
// }
