import { InspectionItem } from './InspectionItem'
import { networkSynchronizer } from '../../../utils/NetworkSync'

export interface InspectionInfo {
  uuid: string
  description: string
  rules: string[]
  met: boolean
}

export interface InspectionSectionData {
  uuid: string
  title: string
  childRequirements: InspectionInfo[]
}

interface InspectionSectionProps extends InspectionSectionData {
  hideComplete: boolean
  onChange: (uuid: string, value: boolean) => void
}

export interface InspectionProps {
  sections: InspectionSectionData[]
  hideComplete: boolean
}

interface InspectionStatus {
  [key: string]: {
    [key: string]: boolean
  }
}

function InspectionSection (props: InspectionSectionProps): JSX.Element {
  // Return a fragment if all requirements are met and we're hiding complete sections
  if (props.hideComplete && props.childRequirements.every((req) => req.met)) {
    return <></>
  }

  const children = props.childRequirements.map((requirement) => {
    return (
      <InspectionItem
        key={requirement.uuid}
        hideComplete={props.hideComplete}
        description={requirement.description}
        rules={requirement.rules} met={requirement.met}
        onChange={value => { props.onChange(requirement.uuid, value) }}
      />
    )
  })

  return (
    <>
      <div className='flex px-4 py-2 mb-2 text-slate-12 font-extrabold'>{props.title}</div>
      {children}
    </>
  )
}

export function Inspection (props: InspectionProps): JSX.Element {
  const valuesFromNetwork: InspectionStatus = props.sections.reduce<InspectionStatus>((acc, section) => {
    acc[section.uuid] = section.childRequirements.reduce<{ [key: string]: boolean }>((acc, req) => {
      acc[req.uuid] = req.met
      return acc
    }, {})
    return acc
  }
  , {})

  const { output: status, updateFromLocal } = networkSynchronizer<InspectionStatus>(valuesFromNetwork)

  const reconciled: InspectionSectionData[] = props.sections.map((section) => {
    return {
      ...section,
      childRequirements: section.childRequirements.map((req) => {
        return {
          ...req,
          met: status[section.uuid][req.uuid]
        }
      })
    }
  })

  return (
    <div className='flex flex-col bg-slate-2'>
      {reconciled.flatMap((section) => {
        return (
          <InspectionSection
            uuid={section.uuid}
            hideComplete={props.hideComplete}
            key={section.uuid}
            title={section.title}
            childRequirements={section.childRequirements}
            onChange={(uuid, value) => { updateFromLocal({ [section.uuid]: { [uuid]: value } }) }}
          />
        )
      })}
    </div>
  )
}
