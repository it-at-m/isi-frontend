
# KindergartenDto


## Properties

Name | Type
------------ | -------------
`einrichtungstraeger` | string
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

## Example

```typescript
import type { KindergartenDto } from ''

// TODO: Update the object below with actual values
const example = {
  "einrichtungstraeger": null,
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
} satisfies KindergartenDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as KindergartenDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


