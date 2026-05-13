
# Save201Response


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`artAbfrage` | string
`name` | string
`statusAbfrage` | [StatusAbfrage](StatusAbfrage.md)
`anmerkung` | string
`bauvorhaben` | string
`sub` | string
`displayName` | string
`linkEakte` | string
`bearbeitungshistorie` | [Array&lt;BearbeitungshistorieDto&gt;](BearbeitungshistorieDto.md)
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
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`sobonJahr` | string
`mitzeichnungBeschlussentwurf` | [UncertainBoolean](UncertainBoolean.md)
`abfragevariantenBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenDto&gt;](AbfragevarianteBauleitplanverfahrenDto.md)
`abfragevariantenSachbearbeitungBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenDto&gt;](AbfragevarianteBauleitplanverfahrenDto.md)
`abfragevariantenWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenDto&gt;](AbfragevarianteWeiteresVerfahrenDto.md)
`abfragevariantenSachbearbeitungWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenDto&gt;](AbfragevarianteWeiteresVerfahrenDto.md)

## Example

```typescript
import type { Save201Response } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "artAbfrage": null,
  "name": null,
  "statusAbfrage": null,
  "anmerkung": null,
  "bauvorhaben": null,
  "sub": null,
  "displayName": null,
  "linkEakte": null,
  "bearbeitungshistorie": null,
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
  "sobonRelevant": null,
  "sobonJahr": null,
  "mitzeichnungBeschlussentwurf": null,
  "abfragevariantenBauleitplanverfahren": null,
  "abfragevariantenSachbearbeitungBauleitplanverfahren": null,
  "abfragevariantenWeiteresVerfahren": null,
  "abfragevariantenSachbearbeitungWeiteresVerfahren": null,
} satisfies Save201Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Save201Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


