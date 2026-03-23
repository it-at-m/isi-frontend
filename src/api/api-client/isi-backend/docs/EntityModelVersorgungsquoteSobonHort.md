
# EntityModelVersorgungsquoteSobonHort


## Properties

Name | Type
------------ | -------------
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`beschreibung` | string
`versorgungsquoteSobon` | number
`links` | [{ [key: string]: Link; }](Link.md)

## Example

```typescript
import type { EntityModelVersorgungsquoteSobonHort } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "beschreibung": null,
  "versorgungsquoteSobon": null,
  "links": null,
} satisfies EntityModelVersorgungsquoteSobonHort

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityModelVersorgungsquoteSobonHort
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


