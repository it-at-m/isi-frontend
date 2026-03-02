
# Bauabschnitt


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`bezeichnung` | string
`baugebiete` | [Array&lt;Baugebiet&gt;](Baugebiet.md)
`technical` | boolean

## Example

```typescript
import type { Bauabschnitt } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "bezeichnung": null,
  "baugebiete": null,
  "technical": null,
} satisfies Bauabschnitt

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Bauabschnitt
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


