
# VersorgungsquoteGruppenstaerkeRequestBody


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`gueltigAb` | Date
`infrastruktureinrichtungTyp` | string
`versorgungsquotePlanungsursaechlich` | number
`versorgungsquoteSobonUrsaechlich` | number
`gruppenstaerke` | number

## Example

```typescript
import type { VersorgungsquoteGruppenstaerkeRequestBody } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "gueltigAb": null,
  "infrastruktureinrichtungTyp": null,
  "versorgungsquotePlanungsursaechlich": null,
  "versorgungsquoteSobonUrsaechlich": null,
  "gruppenstaerke": null,
} satisfies VersorgungsquoteGruppenstaerkeRequestBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VersorgungsquoteGruppenstaerkeRequestBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


