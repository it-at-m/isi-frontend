
# HausFuerKinderDto


## Properties

Name | Type
------------ | -------------
`anzahlKinderkrippePlaetze` | number
`anzahlKindergartenPlaetze` | number
`anzahlHortPlaetze` | number
`anzahlKinderkrippeGruppen` | number
`anzahlKindergartenGruppen` | number
`anzahlHortGruppen` | number
`wohnungsnaheKinderkrippePlaetze` | number
`wohnungsnaheKindergartenPlaetze` | number
`wohnungsnaheHortPlaetze` | number
`einrichtungstraeger` | string

## Example

```typescript
import type { HausFuerKinderDto } from ''

// TODO: Update the object below with actual values
const example = {
  "anzahlKinderkrippePlaetze": null,
  "anzahlKindergartenPlaetze": null,
  "anzahlHortPlaetze": null,
  "anzahlKinderkrippeGruppen": null,
  "anzahlKindergartenGruppen": null,
  "anzahlHortGruppen": null,
  "wohnungsnaheKinderkrippePlaetze": null,
  "wohnungsnaheKindergartenPlaetze": null,
  "wohnungsnaheHortPlaetze": null,
  "einrichtungstraeger": null,
} satisfies HausFuerKinderDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HausFuerKinderDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


