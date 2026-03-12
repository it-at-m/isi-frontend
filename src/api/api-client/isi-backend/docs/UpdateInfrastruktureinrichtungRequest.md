
# UpdateInfrastruktureinrichtungRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`bearbeitendePerson` | [BearbeitendePersonDto](BearbeitendePersonDto.md)
`infrastruktureinrichtungTyp` | string
`lfdNr` | number
`bauvorhaben` | string
`adresse` | [AdresseDto](AdresseDto.md)
`verortung` | [VerortungPointDto](VerortungPointDto.md)
`nameEinrichtung` | string
`fertigstellungsjahr` | number
`status` | string
`flaecheGesamtgrundstueck` | number
`flaecheTeilgrundstueck` | number
`idKibigWeb` | string
`schule` | [SchuleDto](SchuleDto.md)
`artGsNachmittagBetreuung` | string
`anzahlHortPlaetze` | number
`anzahlHortGruppen` | number
`wohnungsnaheHortPlaetze` | number
`einrichtungstraeger` | string
`anzahlKinderkrippePlaetze` | number
`anzahlKindergartenPlaetze` | number
`anzahlKinderkrippeGruppen` | number
`anzahlKindergartenGruppen` | number
`wohnungsnaheKinderkrippePlaetze` | number
`wohnungsnaheKindergartenPlaetze` | number

## Example

```typescript
import type { UpdateInfrastruktureinrichtungRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "bearbeitendePerson": null,
  "infrastruktureinrichtungTyp": null,
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
  "schule": null,
  "artGsNachmittagBetreuung": null,
  "anzahlHortPlaetze": null,
  "anzahlHortGruppen": null,
  "wohnungsnaheHortPlaetze": null,
  "einrichtungstraeger": null,
  "anzahlKinderkrippePlaetze": null,
  "anzahlKindergartenPlaetze": null,
  "anzahlKinderkrippeGruppen": null,
  "anzahlKindergartenGruppen": null,
  "wohnungsnaheKinderkrippePlaetze": null,
  "wohnungsnaheKindergartenPlaetze": null,
} satisfies UpdateInfrastruktureinrichtungRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateInfrastruktureinrichtungRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


