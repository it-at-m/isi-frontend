
# BebauungsplanUmgriffDto


## Properties

Name | Type
------------ | -------------
`objectId` | number
`ebene` | number
`nrVa` | string
`nrPlan` | string
`nr` | string
`flaecheQm` | number
`art` | string
`artBedeutung` | string
`ebeneBedeutung` | string

## Example

```typescript
import type { BebauungsplanUmgriffDto } from ''

// TODO: Update the object below with actual values
const example = {
  "objectId": null,
  "ebene": null,
  "nrVa": null,
  "nrPlan": null,
  "nr": null,
  "flaecheQm": null,
  "art": null,
  "artBedeutung": null,
  "ebeneBedeutung": null,
} satisfies BebauungsplanUmgriffDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BebauungsplanUmgriffDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


