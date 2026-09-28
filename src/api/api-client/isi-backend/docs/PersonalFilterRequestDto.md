
# PersonalFilterRequestDto


## Properties

Name | Type
------------ | -------------
`id` | string
`filterSettings` | [FilterSettingsDto](FilterSettingsDto.md)
`filterName` | string

## Example

```typescript
import type { PersonalFilterRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "filterSettings": null,
  "filterName": null,
} satisfies PersonalFilterRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonalFilterRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


