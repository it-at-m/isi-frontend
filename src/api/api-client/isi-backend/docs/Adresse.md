
# Adresse


## Properties

Name | Type
------------ | -------------
`strasse` | string
`hausnummer` | string
`plz` | string
`ort` | string
`coordinate` | [Wgs84](Wgs84.md)
`coordinateUtm` | [Utm](Utm.md)
`angabeLageErgaenzendeAdressinformation` | string

## Example

```typescript
import type { Adresse } from ''

// TODO: Update the object below with actual values
const example = {
  "strasse": null,
  "hausnummer": null,
  "plz": null,
  "ort": null,
  "coordinate": null,
  "coordinateUtm": null,
  "angabeLageErgaenzendeAdressinformation": null,
} satisfies Adresse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Adresse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


