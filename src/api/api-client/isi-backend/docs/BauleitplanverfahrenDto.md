
# BauleitplanverfahrenDto


## Properties

Name | Type
------------ | -------------
`bebauungsplannummer` | string
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`sobonJahr` | string
`standVerfahren` | string
`standVerfahrenFreieEingabe` | string
`adresse` | [AdresseDto](AdresseDto.md)
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)
`fristBearbeitung` | Date
`mitzeichnungBeschlussentwurf` | [UncertainBoolean](UncertainBoolean.md)
`abfragevariantenBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenDto&gt;](AbfragevarianteBauleitplanverfahrenDto.md)
`abfragevariantenSachbearbeitungBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenDto&gt;](AbfragevarianteBauleitplanverfahrenDto.md)

## Example

```typescript
import type { BauleitplanverfahrenDto } from ''

// TODO: Update the object below with actual values
const example = {
  "bebauungsplannummer": null,
  "sobonRelevant": null,
  "sobonJahr": null,
  "standVerfahren": null,
  "standVerfahrenFreieEingabe": null,
  "adresse": null,
  "verortung": null,
  "dokumente": null,
  "fristBearbeitung": null,
  "mitzeichnungBeschlussentwurf": null,
  "abfragevariantenBauleitplanverfahren": null,
  "abfragevariantenSachbearbeitungBauleitplanverfahren": null,
} satisfies BauleitplanverfahrenDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BauleitplanverfahrenDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


