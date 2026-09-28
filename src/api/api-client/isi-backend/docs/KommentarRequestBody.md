
# KommentarRequestBody


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`erstellungsdatum` | Date
`text` | string
`bauvorhaben` | string
`infrastruktureinrichtung` | string
`dokumente` | Array&lt;string&gt;
`bearbeitendePerson` | [BearbeitendePerson](BearbeitendePerson.md)

## Example

```typescript
import type { KommentarRequestBody } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "erstellungsdatum": null,
  "text": null,
  "bauvorhaben": null,
  "infrastruktureinrichtung": null,
  "dokumente": null,
  "bearbeitendePerson": null,
} satisfies KommentarRequestBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as KommentarRequestBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


