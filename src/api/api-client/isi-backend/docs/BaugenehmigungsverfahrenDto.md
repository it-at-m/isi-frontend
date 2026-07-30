
# BaugenehmigungsverfahrenDto


## Properties

Name | Type
------------ | -------------
`aktenzeichenProLbk` | string
`bebauungsplannummer` | string
`verfahrensstand` | string
`verfahrensstandFreieEingabe` | string
`adresse` | [AdresseDto](AdresseDto.md)
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)
`fristBearbeitung` | Date
`abfragevariantenBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenDto&gt;](AbfragevarianteBaugenehmigungsverfahrenDto.md)
`abfragevariantenSachbearbeitungBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenDto&gt;](AbfragevarianteBaugenehmigungsverfahrenDto.md)

## Example

```typescript
import type { BaugenehmigungsverfahrenDto } from ''

// TODO: Update the object below with actual values
const example = {
  "aktenzeichenProLbk": null,
  "bebauungsplannummer": null,
  "verfahrensstand": null,
  "verfahrensstandFreieEingabe": null,
  "adresse": null,
  "verortung": null,
  "dokumente": null,
  "fristBearbeitung": null,
  "abfragevariantenBaugenehmigungsverfahren": null,
  "abfragevariantenSachbearbeitungBaugenehmigungsverfahren": null,
} satisfies BaugenehmigungsverfahrenDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BaugenehmigungsverfahrenDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


