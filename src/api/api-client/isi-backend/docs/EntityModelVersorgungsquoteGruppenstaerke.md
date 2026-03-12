
# EntityModelVersorgungsquoteGruppenstaerke


## Properties

Name | Type
------------ | -------------
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`gueltigAb` | Date
`infrastruktureinrichtungTyp` | string
`versorgungsquotePlanungsursaechlich` | number
`versorgungsquoteSobonUrsaechlich` | number
`gruppenstaerke` | number
`links` | [{ [key: string]: Link; }](Link.md)

## Example

```typescript
import type { EntityModelVersorgungsquoteGruppenstaerke } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "gueltigAb": null,
  "infrastruktureinrichtungTyp": null,
  "versorgungsquotePlanungsursaechlich": null,
  "versorgungsquoteSobonUrsaechlich": null,
  "gruppenstaerke": null,
  "links": null,
} satisfies EntityModelVersorgungsquoteGruppenstaerke

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityModelVersorgungsquoteGruppenstaerke
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


