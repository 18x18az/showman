import { TextInput } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { useDeleteFieldMutation, useEditFieldMutation, usePresetsQuery, useScenesQuery, useSetFieldEnabledMutation, useSetFieldIsCompetitionMutation, useUpdateFieldNameMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { Switch } from '@/primitives/switch/Switch'
import { useErrorableMutation } from '@/hooks/useErrorableMutation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Field {
  readonly id: number
  readonly name: string
  readonly isCompetition: boolean
  readonly isEnabled: boolean
  readonly scene: {
    readonly id: number
    readonly name: string
  } | null
  readonly preset: {
    readonly id: number
    readonly name: string
  } | null
}

export const Columns: Array<ColumnDef<Field>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const update = useErrorableMutation(useUpdateFieldNameMutation, { refetchQueries: ['Fields'] })
      return (
        <TextInput value={row.original.name} updateValue={(name) => { void update({ variables: { fieldId: row.original.id, name } }) }} />
      )
    }
  },
  {
    accessorKey: 'isEnabled',
    header: 'Enabled',
    cell: ({ row }) => {
      const setEnabled = useErrorableMutation(useSetFieldEnabledMutation, { refetchQueries: ['Fields'] })
      return (
        <div>
          <Switch checked={row.original.isEnabled} onCheckedChange={(checked: boolean) => { void setEnabled({ variables: { isEnabled: checked, fieldId: row.original.id } }) }} />
        </div>
      )
    }
  },
  {
    accessorKey: 'isCompetition',
    header: 'Competition',
    cell: ({ row }) => {
      const setIsCompetition = useErrorableMutation(useSetFieldIsCompetitionMutation, { refetchQueries: ['Fields'] })
      return (
        <div>
          <Switch checked={row.original.isCompetition} onCheckedChange={(checked: boolean) => { void setIsCompetition({ variables: { isCompetition: checked, fieldId: row.original.id } }) }} />
        </div>
      )
    }
  },
  {
    accessorKey: 'scene',
    header: 'Scene',
    cell: ({ row }) => {
      if (!row.original.isCompetition) return <></>

      const { data } = useScenesQuery({ pollInterval: 500 })
      const editField = useErrorableMutation(useEditFieldMutation, { refetchQueries: ['Fields'] })

      if (data === undefined) return <></>

      const scene = row.original.scene
      const name = scene === null ? 'None' : scene.name

      const dropDownMenuItems = [<DropdownMenuItem key={0} onClick={() => { void editField({ variables: { fieldId: row.original.id, update: { sceneId: null } } }) }}>None</DropdownMenuItem>]

      data.scenes.forEach(option => {
        dropDownMenuItems.push(<DropdownMenuItem key={option.id} onClick={() => { void editField({ variables: { fieldId: row.original.id, update: { sceneId: option.id } } }) }}>{option.name}</DropdownMenuItem>)
      })

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>{name}</DropdownMenuTrigger>
          <DropdownMenuContent>
            {dropDownMenuItems}
          </DropdownMenuContent>
        </DropdownMenu>

      )
    }
  },
  {
    accessorKey: 'preset',
    header: 'Preset',
    cell: ({ row }) => {
      if (!row.original.isCompetition) return <></>

      const selectedScene = row.original.scene

      if (selectedScene === null) return <></>

      const { data } = usePresetsQuery({ pollInterval: 500, variables: { sceneId: selectedScene.id } })
      const editField = useErrorableMutation(useEditFieldMutation, { refetchQueries: ['Fields'] })

      if (data === undefined) return <></>

      const options = data.scene.camera?.presets ?? []

      if (options.length === 0) return <></>

      if (data === undefined) return <></>

      const preset = row.original.preset
      const name = preset === null ? 'None' : preset.name

      const dropDownMenuItems = [<DropdownMenuItem key={0} onClick={() => { void editField({ variables: { fieldId: row.original.id, update: { presetId: null } } }) }}>None</DropdownMenuItem>]

      options.forEach(option => {
        dropDownMenuItems.push(<DropdownMenuItem key={option.id} onClick={() => { void editField({ variables: { fieldId: row.original.id, update: { presetId: option.id } } }) }}>{option.name}</DropdownMenuItem>)
      })

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>{name}</DropdownMenuTrigger>
          <DropdownMenuContent>
            {dropDownMenuItems}
          </DropdownMenuContent>
        </DropdownMenu>

      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ErrorableButton tooltip='Delete Field' variant='ghost' mutation={useDeleteFieldMutation} options={{ variables: { fieldId: row.original.id }, refetchQueries: ['Fields'] }}><Trash2 /></ErrorableButton>
    }
  }
]
