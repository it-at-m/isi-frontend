
# AbfragevarianteBauleitplanverfahrenStartBearbeitungDto


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`artAbfragevariante` | string
`abfragevariantenNr` | number
`name` | string
`satzungsbeschluss` | Date
`planart` | Array&lt;string&gt;
`planartFreieEingabe` | string
`realisierungVon` | number
`gfWohnenGesamt` | number
`gfWohnenSobonUrsaechlich` | number
`gfWohnenBestandswohnbaurecht` | number
`gfWohnenSonderwohnformen` | boolean
`gfWohnenStudentischesWohnen` | number
`gfWohnenSeniorinnenWohnen` | number
`gfWohnenGenossenschaftlichesWohnen` | number
`gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen` | number
`gfAnmerkung` | string
`weGesamt` | number
`weSonderwohnformen` | boolean
`weStudentischesWohnen` | number
`weSeniorinnenWohnen` | number
`weGenossenschaftlichesWohnen` | number
`weWeiteresNichtInfrastrukturrelevantesWohnen` | number
`weAnmerkung` | string
`bauabschnitte` | [Array&lt;BauabschnittDto&gt;](BauabschnittDto.md)
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
import type { AbfragevarianteBauleitplanverfahrenStartBearbeitungDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "artAbfragevariante": null,
  "abfragevariantenNr": null,
  "name": null,
  "satzungsbeschluss": null,
  "planart": null,
  "planartFreieEingabe": null,
  "realisierungVon": null,
  "gfWohnenGesamt": null,
  "gfWohnenSobonUrsaechlich": null,
  "gfWohnenBestandswohnbaurecht": null,
  "gfWohnenSonderwohnformen": null,
  "gfWohnenStudentischesWohnen": null,
  "gfWohnenSeniorinnenWohnen": null,
  "gfWohnenGenossenschaftlichesWohnen": null,
  "gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen": null,
  "gfAnmerkung": null,
  "weGesamt": null,
  "weSonderwohnformen": null,
  "weStudentischesWohnen": null,
  "weSeniorinnenWohnen": null,
  "weGenossenschaftlichesWohnen": null,
  "weWeiteresNichtInfrastrukturrelevantesWohnen": null,
  "weAnmerkung": null,
  "bauabschnitte": null,
  "sobonOrientierungswertJahrPlanungsursaechlich": null,
  "sobonBerechnung": null,
  "stammdatenGueltigAb": null,
  "anmerkung": null,
  "hasBauratendateiInput": null,
  "anmerkungBauratendateiInput": null,
  "bauratendateiInputBasis": null,
  "bauratendateiInput": null,
  "dokumente": null,
} satisfies AbfragevarianteBauleitplanverfahrenStartBearbeitungDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfragevarianteBauleitplanverfahrenStartBearbeitungDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


