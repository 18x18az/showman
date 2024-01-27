// import { InspectionItem } from './InspectionItem'

// interface InspectionSectionProps extends InspectionSectionDataBroadcast {
//   readonly hideComplete: boolean
//   readonly onChange: (uuid: number, value: boolean) => void
// }

// export interface InspectionProps {
//   readonly sections: InspectionSectionDataBroadcast[]
//   readonly hideComplete: boolean
//   readonly onChange: (uuid: number, value: boolean) => void
// }

// function InspectionSection (props: InspectionSectionProps): JSX.Element {
//   if (props.hideComplete && props.childRequirements.every((req) => req.isMet)) {
//     return <></>
//   }

//   const children = props.childRequirements.map((requirement) => {
//     return (
//       <InspectionItem
//         key={requirement.uuid}
//         hideComplete={props.hideComplete}
//         description={requirement.description}
//         met={requirement.isMet}
//         onChange={value => { props.onChange(requirement.uuid, value) }}
//       />
//     )
//   })

//   return (
//     <>
//       <div className='flex px-4 py-2 mb-2 text-slate-12 font-extrabold'>{props.title}</div>
//       {children}
//     </>
//   )
// }

export function Inspection (): JSX.Element {
  return <></>
  // return (
  //   <div className='flex flex-col'>
  //     {props.sections.map(section => {
  //       return (
  //         <InspectionSection
  //           hideComplete={props.hideComplete}
  //           key={section.title}
  //           title={section.title}
  //           childRequirements={section.childRequirements}
  //           onChange={(uuid, value) => { props.onChange(uuid, value) }}
  //         />
  //       )
  //     })}
  //   </div>
  // )
}
