import { useState } from 'react'

interface ResourceState<ResourceType> {
  upstream: ResourceType | undefined
  local: ResourceType | undefined
}

export type ResourceStateValidator<ResourceType> = (resource: ResourceType) => boolean
export type ResourceUpdater<ResourceType> = (value: ResourceType | undefined) => void

interface SyncableResourceStateConfig<ResourceType> {
  initial: ResourceType
  onChange?: (resource: ResourceType) => void
  validator?: (resource: ResourceType) => boolean
}

interface SyncableResourceStateInterface<ResourceType> {
  value: ResourceType
  setValueLocal: ResourceUpdater<ResourceType>
  setValueUpstream: ResourceUpdater<ResourceType>
}

export function SyncableResourceState<ResourceType> (config: SyncableResourceStateConfig<ResourceType>): SyncableResourceStateInterface<ResourceType> {
  const [value, setValue] = useState<ResourceState<ResourceType>>({ upstream: undefined, local: config.initial })

  const setValueLocal: ResourceUpdater<ResourceType> = (localValue: ResourceType | undefined): void => {
    if (localValue === undefined) {
      localValue = config.initial
    }

    if (config.validator !== undefined && !config.validator(localValue)) {
      return
    }

    setValue({ upstream: value.upstream, local: localValue })
  }

  const setValueUpstream: ResourceUpdater<ResourceType> = (upstreamValue: ResourceType | undefined): void => {
    if (upstreamValue === value.upstream) {
      return
    }

    setValue({ upstream: upstreamValue, local: upstreamValue })
  }

  return { value: value.local as ResourceType, setValueLocal, setValueUpstream }
}
