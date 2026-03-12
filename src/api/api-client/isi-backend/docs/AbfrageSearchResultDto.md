
# AbfrageSearchResultDto


## Properties

Name | Type
------------ | -------------
`id` | string
`artAbfrage` | string
`name` | string
`stadtbezirke` | [Set&lt;StadtbezirkDto&gt;](StadtbezirkDto.md)
`statusAbfrage` | [StatusAbfrage](StatusAbfrage.md)
`fristBearbeitung` | Date
`standVerfahren` | string
`createdDateTime` | Date
`bauvorhaben` | string

## Example

```typescript
import type { AbfrageSearchResultDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "artAbfrage": null,
  "name": null,
  "stadtbezirke": null,
  "statusAbfrage": null,
  "fristBearbeitung": null,
  "standVerfahren": null,
  "createdDateTime": null,
  "bauvorhaben": null,
} satisfies AbfrageSearchResultDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfrageSearchResultDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


