
# PointGeometryDto

Die GEOJSON-Repräsentation einer Punktkoordinate.

## Properties

Name | Type
------------ | -------------
`coordinates` | Array&lt;number&gt;

## Example

```typescript
import type { PointGeometryDto } from ''

// TODO: Update the object below with actual values
const example = {
  "coordinates": null,
} satisfies PointGeometryDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PointGeometryDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


