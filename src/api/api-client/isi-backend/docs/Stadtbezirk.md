
# Stadtbezirk


## Properties

Name | Type
------------ | -------------
`nummer` | string
`name` | string
`multiPolygon` | [MultiPolygonGeometry](MultiPolygonGeometry.md)

## Example

```typescript
import type { Stadtbezirk } from ''

// TODO: Update the object below with actual values
const example = {
  "nummer": null,
  "name": null,
  "multiPolygon": null,
} satisfies Stadtbezirk

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Stadtbezirk
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


