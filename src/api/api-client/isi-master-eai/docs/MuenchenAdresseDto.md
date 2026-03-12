
# MuenchenAdresseDto


## Properties

Name | Type
------------ | -------------
`adresse` | string
`adressId` | string
`hausnummer` | number
`buchstabe` | string
`ortsname` | string
`strassenname` | string
`position` | [PositionDto](PositionDto.md)
`geozuordnungen` | [MuenchenAdresseGeoZuordnungenDto](MuenchenAdresseGeoZuordnungenDto.md)

## Example

```typescript
import type { MuenchenAdresseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "adresse": null,
  "adressId": null,
  "hausnummer": null,
  "buchstabe": null,
  "ortsname": null,
  "strassenname": null,
  "position": null,
  "geozuordnungen": null,
} satisfies MuenchenAdresseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MuenchenAdresseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


