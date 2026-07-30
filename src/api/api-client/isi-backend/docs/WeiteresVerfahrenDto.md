
# WeiteresVerfahrenDto


## Properties

Name | Type
------------ | -------------
`aktenzeichenProLbk` | string
`bebauungsplannummer` | string
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`sobonJahr` | string
`verfahrensstand` | string
`verfahrensstandFreieEingabe` | string
`adresse` | [AdresseDto](AdresseDto.md)
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)
`fristBearbeitung` | Date
`mitzeichnungBeschlussentwurf` | [UncertainBoolean](UncertainBoolean.md)
`abfragevariantenWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenDto&gt;](AbfragevarianteWeiteresVerfahrenDto.md)
`abfragevariantenSachbearbeitungWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenDto&gt;](AbfragevarianteWeiteresVerfahrenDto.md)

## Example

```typescript
import type { WeiteresVerfahrenDto } from ''

// TODO: Update the object below with actual values
const example = {
  "aktenzeichenProLbk": null,
  "bebauungsplannummer": null,
  "sobonRelevant": null,
  "sobonJahr": null,
  "verfahrensstand": null,
  "verfahrensstandFreieEingabe": null,
  "adresse": null,
  "verortung": null,
  "dokumente": null,
  "fristBearbeitung": null,
  "mitzeichnungBeschlussentwurf": null,
  "abfragevariantenWeiteresVerfahren": null,
  "abfragevariantenSachbearbeitungWeiteresVerfahren": null,
} satisfies WeiteresVerfahrenDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WeiteresVerfahrenDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


