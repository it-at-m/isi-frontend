
# AdresseDto


## Properties

Name | Type
------------ | -------------
`plz` | string
`ort` | string
`strasse` | string
`hausnummer` | string
`coordinate` | [Wgs84Dto](Wgs84Dto.md)
`coordinateUtm` | [UtmDto](UtmDto.md)
`angabeLageErgaenzendeAdressinformation` | string

## Example

```typescript
import type { AdresseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "plz": null,
  "ort": null,
  "strasse": null,
  "hausnummer": null,
  "coordinate": null,
  "coordinateUtm": null,
  "angabeLageErgaenzendeAdressinformation": null,
} satisfies AdresseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdresseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


