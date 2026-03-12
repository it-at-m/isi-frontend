
# KindergartenDto


## Properties

Name | Type
------------ | -------------
`anzahlKindergartenPlaetze` | number
`anzahlKindergartenGruppen` | number
`wohnungsnaheKindergartenPlaetze` | number
`einrichtungstraeger` | string

## Example

```typescript
import type { KindergartenDto } from ''

// TODO: Update the object below with actual values
const example = {
  "anzahlKindergartenPlaetze": null,
  "anzahlKindergartenGruppen": null,
  "wohnungsnaheKindergartenPlaetze": null,
  "einrichtungstraeger": null,
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


