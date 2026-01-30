
# SearchResultDto

SearchResultDto

## Properties

Name | Type
------------ | -------------
`type` | string
`coordinate` | [Wgs84Dto](Wgs84Dto.md)

## Example

```typescript
import type { SearchResultDto } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "coordinate": null,
} satisfies SearchResultDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResultDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


