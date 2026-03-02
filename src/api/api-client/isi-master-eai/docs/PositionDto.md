
# PositionDto


## Properties

Name | Type
------------ | -------------
`utm` | [UtmDto](UtmDto.md)
`wgs` | [WgsDto](WgsDto.md)

## Example

```typescript
import type { PositionDto } from ''

// TODO: Update the object below with actual values
const example = {
  "utm": null,
  "wgs": null,
} satisfies PositionDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PositionDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


