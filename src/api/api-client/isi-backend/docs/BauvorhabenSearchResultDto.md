
# BauvorhabenSearchResultDto


## Properties

Name | Type
------------ | -------------
`id` | string
`nameVorhaben` | string
`stadtbezirke` | [Set&lt;StadtbezirkDto&gt;](StadtbezirkDto.md)
`grundstuecksgroesse` | number
`standVerfahren` | string
`umgriff` | [MultiPolygonGeometryDto](MultiPolygonGeometryDto.md)

## Example

```typescript
import type { BauvorhabenSearchResultDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "nameVorhaben": null,
  "stadtbezirke": null,
  "grundstuecksgroesse": null,
  "standVerfahren": null,
  "umgriff": null,
} satisfies BauvorhabenSearchResultDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BauvorhabenSearchResultDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


