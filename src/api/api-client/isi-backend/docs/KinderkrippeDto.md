
# KinderkrippeDto


## Properties

Name | Type
------------ | -------------
`einrichtungstraeger` | string
`fertigstellungsmonat` | number
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`muenchnerKitafoerderung` | [UncertainBoolean](UncertainBoolean.md)
`miniKita` | boolean
`integrationseinrichtung` | boolean
`nameTraeger` | string
`gesamtplaetzeNachBE` | number
`kinderkrippenplaetzeNachBE` | number
`ueberregionaleKinderkrippenplaetze` | number
`belegungKinderkrippenplaetze` | number
`sollBelegungKinderkrippenplaetzeKePlus` | number
`sollBelegungKinderkrippenplaetze` | number
`integrationsplaetzeKinderkrippeKePlus` | number
`integrationsplaetzeKinderkrippe` | number
`belegungIntegrationsplaetzeKinderkrippe` | number
`linkKePlus` | string

## Example

```typescript
import type { KinderkrippeDto } from ''

// TODO: Update the object below with actual values
const example = {
  "einrichtungstraeger": null,
  "fertigstellungsmonat": null,
  "sobonRelevant": null,
  "muenchnerKitafoerderung": null,
  "miniKita": null,
  "integrationseinrichtung": null,
  "nameTraeger": null,
  "gesamtplaetzeNachBE": null,
  "kinderkrippenplaetzeNachBE": null,
  "ueberregionaleKinderkrippenplaetze": null,
  "belegungKinderkrippenplaetze": null,
  "sollBelegungKinderkrippenplaetzeKePlus": null,
  "sollBelegungKinderkrippenplaetze": null,
  "integrationsplaetzeKinderkrippeKePlus": null,
  "integrationsplaetzeKinderkrippe": null,
  "belegungIntegrationsplaetzeKinderkrippe": null,
  "linkKePlus": null,
} satisfies KinderkrippeDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as KinderkrippeDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


