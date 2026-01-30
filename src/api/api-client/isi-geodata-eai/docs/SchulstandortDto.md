
# SchulstandortDto


## Properties

Name | Type
------------ | -------------
`objectId` | number
`kreisschl` | number
`kreis` | string
`schulnummer` | number
`schulname` | string
`linkSchule` | string
`verbundname` | string
`verbundnummer` | string
`schulamt` | string
`rabl` | string
`linkRabl` | string
`schulart` | string
`postleitzahl` | number
`strasse` | string
`internetadresse` | string
`ebene` | number
`winkel` | number
`bedeutungEbene` | string

## Example

```typescript
import type { SchulstandortDto } from ''

// TODO: Update the object below with actual values
const example = {
  "objectId": null,
  "kreisschl": null,
  "kreis": null,
  "schulnummer": null,
  "schulname": null,
  "linkSchule": null,
  "verbundname": null,
  "verbundnummer": null,
  "schulamt": null,
  "rabl": null,
  "linkRabl": null,
  "schulart": null,
  "postleitzahl": null,
  "strasse": null,
  "internetadresse": null,
  "ebene": null,
  "winkel": null,
  "bedeutungEbene": null,
} satisfies SchulstandortDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SchulstandortDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


