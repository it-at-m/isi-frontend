
# InfrastruktureinrichtungRequestBody


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`bearbeitendePerson` | [BearbeitendePerson](BearbeitendePerson.md)
`lfdNr` | number
`bauvorhaben` | string
`adresse` | [Adresse](Adresse.md)
`verortung` | [VerortungPoint](VerortungPoint.md)
`nameEinrichtung` | string
`fertigstellungsjahr` | number
`status` | string
`flaecheGesamtgrundstueck` | number
`flaecheTeilgrundstueck` | number
`idKibigWeb` | string
`infrastruktureinrichtungTyp` | string
`resultType` | string
`bauvorhabenName` | string
`verortungPointJson` | [VerortungPoint](VerortungPoint.md)
`adresseJson` | [Adresse](Adresse.md)

## Example

```typescript
import type { InfrastruktureinrichtungRequestBody } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "bearbeitendePerson": null,
  "lfdNr": null,
  "bauvorhaben": null,
  "adresse": null,
  "verortung": null,
  "nameEinrichtung": null,
  "fertigstellungsjahr": null,
  "status": null,
  "flaecheGesamtgrundstueck": null,
  "flaecheTeilgrundstueck": null,
  "idKibigWeb": null,
  "infrastruktureinrichtungTyp": null,
  "resultType": null,
  "bauvorhabenName": null,
  "verortungPointJson": null,
  "adresseJson": null,
} satisfies InfrastruktureinrichtungRequestBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InfrastruktureinrichtungRequestBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


