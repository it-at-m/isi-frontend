
# BauvorhabenRequestBody


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`bearbeitendePerson` | [BearbeitendePerson](BearbeitendePerson.md)
`nameVorhaben` | string
`grundstuecksgroesse` | number
`verfahrensstand` | string
`verfahrensstandFreieEingabe` | string
`bauvorhabenNummer` | string
`adresse` | [Adresse](Adresse.md)
`verortung` | [VerortungMultiPolygon](VerortungMultiPolygon.md)
`bebauungsplannummer` | string
`fisNummer` | string
`anmerkung` | string
`sobonRelevant` | [UncertainBoolean](UncertainBoolean.md)
`sobonJahr` | string
`wesentlicheRechtsgrundlage` | Array&lt;string&gt;
`wesentlicheRechtsgrundlageFreieEingabe` | string
`artFnp` | Array&lt;string&gt;
`artFnpFreieEingabe` | string
`dokumente` | Array&lt;string&gt;
`relevanteAbfragevariante` | string
`resultType` | string
`adresseJson` | [Adresse](Adresse.md)
`verortungJson` | [VerortungMultiPolygon](VerortungMultiPolygon.md)

## Example

```typescript
import type { BauvorhabenRequestBody } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "bearbeitendePerson": null,
  "nameVorhaben": null,
  "grundstuecksgroesse": null,
  "verfahrensstand": null,
  "verfahrensstandFreieEingabe": null,
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
  "resultType": null,
  "adresseJson": null,
  "verortungJson": null,
} satisfies BauvorhabenRequestBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BauvorhabenRequestBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


