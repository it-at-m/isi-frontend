
# SaveRequest


## Properties

Name | Type
------------ | -------------
`version` | number
`artAbfrage` | string
`name` | string
`anmerkung` | string
`bauvorhaben` | string
`linkEakte` | string
`aktenzeichenProLbk` | string
`bebauungsplannummer` | string
`verfahrensstand` | string
`verfahrensstandFreieEingabe` | string
`adresse` | [AdresseDto](AdresseDto.md)
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)
`fristBearbeitung` | Date
`abfragevariantenBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenAngelegtDto&gt;](AbfragevarianteBaugenehmigungsverfahrenAngelegtDto.md)
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`sobonJahr` | string
`mitzeichnungBeschlussentwurf` | [UncertainBoolean](UncertainBoolean.md)
`start42Verfahren` | Date
`start42VerfahrenDatumUnbekannt` | boolean
`abfragevariantenBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenAngelegtDto&gt;](AbfragevarianteBauleitplanverfahrenAngelegtDto.md)
`abfragevariantenWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenAngelegtDto&gt;](AbfragevarianteWeiteresVerfahrenAngelegtDto.md)

## Example

```typescript
import type { SaveRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "artAbfrage": null,
  "name": null,
  "anmerkung": null,
  "bauvorhaben": null,
  "linkEakte": null,
  "aktenzeichenProLbk": null,
  "bebauungsplannummer": null,
  "verfahrensstand": null,
  "verfahrensstandFreieEingabe": null,
  "adresse": null,
  "verortung": null,
  "dokumente": null,
  "fristBearbeitung": null,
  "abfragevariantenBaugenehmigungsverfahren": null,
  "sobonRelevant": null,
  "sobonJahr": null,
  "mitzeichnungBeschlussentwurf": null,
  "start42Verfahren": null,
  "start42VerfahrenDatumUnbekannt": null,
  "abfragevariantenBauleitplanverfahren": null,
  "abfragevariantenWeiteresVerfahren": null,
} satisfies SaveRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SaveRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


