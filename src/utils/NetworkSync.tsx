import { NestedJSON, findDifferences } from './findDifferences'
import { useState } from 'react'
import { merge } from 'lodash'

type PartialCallback<T extends NestedJSON> = (value: Partial<T>) => void
type FullCallback<T extends NestedJSON> = (value: T) => void

interface NetworkSynchronizerResults<T extends NestedJSON> {
  output: T
  updateFromNetwork: FullCallback<T>
  updateFromLocal: PartialCallback<T>
}

export function NetworkSynchronizer<T extends NestedJSON> (initialValue: T, onLocalChange?: PartialCallback<T>, onAnyChange?: PartialCallback<T>): NetworkSynchronizerResults<T> {
  const [output, setOutput] = useState<T>(initialValue)
  const [networkState, updateNetworkState] = useState<T>(initialValue)

  // on update from local, check if anything has changed, if so update the output and call onChange
  const updateFromLocal = (updates: Partial<T>): void => {
    const updated = {}
    merge(updated, output, updates)
    const changes = findDifferences(output, updated)
    if (Object.keys(changes).length > 0) {
      setOutput(updated as T)
      onAnyChange?.(changes)
      onLocalChange?.(changes)
    }
  }

  // on update from network, check what has changed from previous network state, and update just the parts that have changed
  const updateFromNetwork = (value: T): void => {
    const updates = findDifferences(networkState, value)
    // See if the network state has changed
    if (Object.keys(updates).length > 0) {
      updateNetworkState(value)
      const updated = {}
      merge(updated, output, updates)
      const changes = findDifferences(output, updated)
      // See if these changes should modify the output
      if (Object.keys(changes).length > 0) {
        setOutput(updated as T)
        onAnyChange?.(changes)
      }
    }
  }

  return {
    output,
    updateFromNetwork,
    updateFromLocal
  }
}
