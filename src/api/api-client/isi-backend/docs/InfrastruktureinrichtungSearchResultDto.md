
# InfrastruktureinrichtungSearchResultDto


## Properties

Name | Type
------------ | -------------
`id` | string
`nameEinrichtung` | string
`infrastruktureinrichtungTyp` | string
`zugehoerigesBauvorhaben` | string

## Example

```typescript
import type { InfrastruktureinrichtungSearchResultDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "nameEinrichtung": null,
  "infrastruktureinrichtungTyp": null,
  "zugehoerigesBauvorhaben": null,
} satisfies InfrastruktureinrichtungSearchResultDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InfrastruktureinrichtungSearchResultDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


