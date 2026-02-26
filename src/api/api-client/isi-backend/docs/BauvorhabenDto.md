
# BauvorhabenDto


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`bearbeitendePerson` | [BearbeitendePersonDto](BearbeitendePersonDto.md)
`nameVorhaben` | string
`grundstuecksgroesse` | number
`standVerfahren` | string
`standVerfahrenFreieEingabe` | string
`bauvorhabenNummer` | string
`adresse` | [AdresseDto](AdresseDto.md)
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`bebauungsplannummer` | string
`fisNummer` | string
`anmerkung` | string
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`sobonJahr` | string
`wesentlicheRechtsgrundlage` | Array&lt;string&gt;
`wesentlicheRechtsgrundlageFreieEingabe` | string
`artFnp` | Array&lt;string&gt;
`artFnpFreieEingabe` | string
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)
`relevanteAbfragevariante` | string

## Example

```typescript
import type { BauvorhabenDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "bearbeitendePerson": null,
  "nameVorhaben": null,
  "grundstuecksgroesse": null,
  "standVerfahren": null,
  "standVerfahrenFreieEingabe": null,
  "bauvorhabenNummer": null,
  "adresse": null,
  "verortung": null,
  "bebauungsplannummer": null,
  "fisNummer": null,
  "anmerkung": null,
  "sobonRelevant": null,
  "sobonJahr": null,
  "wesentlicheRechtsgrundlage": null,
  "wesentlicheRechtsgrundlageFreieEingabe": null,
  "artFnp": null,
  "artFnpFreieEingabe": null,
  "dokumente": null,
  "relevanteAbfragevariante": null,
} satisfies BauvorhabenDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BauvorhabenDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


