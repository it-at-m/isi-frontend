
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
`idKibigWeb` | string
`anlassPlanung` | string
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
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`muenchnerKitafoerderung` | boolean
`miniKita` | boolean
`integrationseinrichtung` | boolean
`nameTraeger` | string
`gesamtplaetzeNachBE` | number
`kindergartenplaetzeNachBE` | number
`ueberregionaleKindergartenplaetze` | number
`belegungKindergartenplaetze` | number
`sollBelegungKindergartenplaetzeKePlus` | number
`sollBelegungKindergartenplaetze` | number
`integrationsplaetzeKindergartenKePlus` | number
`integrationsplaetzeKindergarten` | number
`belegungIntegrationsplaetzeKindergarten` | number
`linkKePlus` | string
`fertigstellungsmonat` | number
`kinderkrippenplaetzeNachBE` | number
`ueberregionaleKinderkrippenplaetze` | number
`belegungKinderkrippenplaetze` | number
`sollBelegungKinderkrippenplaetzeKePlus` | number
`sollBelegungKinderkrippenplaetze` | number
`integrationsplaetzeKinderkrippeKePlus` | number
`integrationsplaetzeKinderkrippe` | number
`belegungIntegrationsplaetzeKinderkrippe` | number
`kooperation` | string
`kooperationFreieEingabe` | string

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
  "idKibigWeb": null,
  "anlassPlanung": null,
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
  "sobonRelevant": null,
  "muenchnerKitafoerderung": null,
  "miniKita": null,
  "integrationseinrichtung": null,
  "nameTraeger": null,
  "gesamtplaetzeNachBE": null,
  "kindergartenplaetzeNachBE": null,
  "ueberregionaleKindergartenplaetze": null,
  "belegungKindergartenplaetze": null,
  "sollBelegungKindergartenplaetzeKePlus": null,
  "sollBelegungKindergartenplaetze": null,
  "integrationsplaetzeKindergartenKePlus": null,
  "integrationsplaetzeKindergarten": null,
  "belegungIntegrationsplaetzeKindergarten": null,
  "linkKePlus": null,
  "fertigstellungsmonat": null,
  "kinderkrippenplaetzeNachBE": null,
  "ueberregionaleKinderkrippenplaetze": null,
  "belegungKinderkrippenplaetze": null,
  "sollBelegungKinderkrippenplaetzeKePlus": null,
  "sollBelegungKinderkrippenplaetze": null,
  "integrationsplaetzeKinderkrippeKePlus": null,
  "integrationsplaetzeKinderkrippe": null,
  "belegungIntegrationsplaetzeKinderkrippe": null,
  "kooperation": null,
  "kooperationFreieEingabe": null,
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


