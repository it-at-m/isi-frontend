
# AbfragevarianteBauleitplanverfahrenSachbearbeitungStartBearbeitungDto


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`artAbfragevariante` | string
`sobonOrientierungswertJahrPlanungsursaechlich` | string
`sobonBerechnung` | [SobonBerechnungDto](SobonBerechnungDto.md)
`stammdatenGueltigAb` | Date
`anmerkung` | string
`hasBauratendateiInput` | boolean
`anmerkungBauratendateiInput` | string
`bauratendateiInputBasis` | [BauratendateiInputDto](BauratendateiInputDto.md)
`bauratendateiInput` | [Array&lt;BauratendateiInputDto&gt;](BauratendateiInputDto.md)
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)

## Example

```typescript
import type { AbfragevarianteBauleitplanverfahrenSachbearbeitungStartBearbeitungDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "artAbfragevariante": null,
  "sobonOrientierungswertJahrPlanungsursaechlich": null,
  "sobonBerechnung": null,
  "stammdatenGueltigAb": null,
  "anmerkung": null,
  "hasBauratendateiInput": null,
  "anmerkungBauratendateiInput": null,
  "bauratendateiInputBasis": null,
  "bauratendateiInput": null,
  "dokumente": null,
} satisfies AbfragevarianteBauleitplanverfahrenSachbearbeitungStartBearbeitungDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfragevarianteBauleitplanverfahrenSachbearbeitungStartBearbeitungDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


