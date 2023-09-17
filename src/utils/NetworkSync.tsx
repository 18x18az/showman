import { NESTED_JSON, findDifferences } from './findDifferences'
import { useState } from 'react'
import { merge } from 'lodash'

type PartialCallback<T extends NESTED_JSON> = (value: Partial<T>) => void
type FullCallback<T extends NESTED_JSON> = (value: T) => void

interface NetworkSynchronizer<T extends NESTED_JSON> {
  output: T
  updateFromNetwork: FullCallback<T>
  updateFromLocal: PartialCallback<T>
}

export function networkSynchronizer<T extends NESTED_JSON> (initialValue: T, onLocalChange?: PartialCallback<T>, onAnyChange?: PartialCallback<T>): NetworkSynchronizer<T> {
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
