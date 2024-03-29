type PRIMITIVE = string | number | boolean | null | undefined
export interface NestedJSON { [key: string]: PRIMITIVE | NestedJSON }

// Recursively find all differences between two objects and return a partial object with only the differences
export function findDifferences<Target extends NestedJSON> (existing: Target, updated: Target): Partial<Target> {
  const differences: Partial<Target> = {}
  for (const key in updated) {
    // If the key is an object, recursively find differences
    if (typeof updated[key] === 'object') {
      const nestedDifferences = findDifferences(existing[key] as NestedJSON, updated[key] as NestedJSON)
      if (Object.keys(nestedDifferences).length > 0) {
        differences[key] = nestedDifferences as Target[Extract<keyof Target, string>]
      }
      // Otherwise just check if the value is different
    } else if (existing[key] !== updated[key]) {
      differences[key] = updated[key]
    }
  }
  return differences
}
