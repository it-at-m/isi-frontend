
# SchulstandortDto


## Properties

Name | Type
------------ | -------------
`schulnummer` | number
`schulname` | string
`multiPolygon` | [MultiPolygonGeometryDto](MultiPolygonGeometryDto.md)

## Example

```typescript
import type { SchulstandortDto } from ''

// TODO: Update the object below with actual values
const example = {
  "schulnummer": null,
  "schulname": null,
  "multiPolygon": null,
} satisfies SchulstandortDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SchulstandortDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


