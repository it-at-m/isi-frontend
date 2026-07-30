
# AbfragevarianteWeiteresVerfahrenAngelegtDto


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`artAbfragevariante` | string
`abfragevariantenNr` | number
`name` | string
`satzungsbeschluss` | Date
`wesentlicheRechtsgrundlage` | Array&lt;string&gt;
`wesentlicheRechtsgrundlageFreieEingabe` | string
`wesentlicheRechtsgrundlageAngabenZurBefreiung` | string
`realisierungVon` | number
`gfWohnenGesamt` | number
`gfWohnenBaurechtlichGenehmigt` | number
`gfWohnenBaurechtlichFestgesetzt` | number
`gfWohnenSobonUrsaechlich` | number
`gfWohnenBestandswohnbaurecht` | number
`gfWohnenSonderwohnformen` | boolean
`gfWohnenStudentischesWohnen` | number
`gfWohnenSeniorinnenWohnen` | number
`gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen` | number
`gfAnmerkung` | string
`weGesamt` | number
`weBaurechtlichGenehmigt` | number
`weBaurechtlichFestgesetzt` | number
`weSonderwohnformen` | boolean
`weStudentischesWohnen` | number
`weSeniorinnenWohnen` | number
`weWeiteresNichtInfrastrukturrelevantesWohnen` | number
`weAnmerkung` | string
`bauabschnitte` | [Array&lt;BauabschnittDto&gt;](BauabschnittDto.md)

## Example

```typescript
import type { AbfragevarianteWeiteresVerfahrenAngelegtDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "artAbfragevariante": null,
  "abfragevariantenNr": null,
  "name": null,
  "satzungsbeschluss": null,
  "wesentlicheRechtsgrundlage": null,
  "wesentlicheRechtsgrundlageFreieEingabe": null,
  "wesentlicheRechtsgrundlageAngabenZurBefreiung": null,
  "realisierungVon": null,
  "gfWohnenGesamt": null,
  "gfWohnenBaurechtlichGenehmigt": null,
  "gfWohnenBaurechtlichFestgesetzt": null,
  "gfWohnenSobonUrsaechlich": null,
  "gfWohnenBestandswohnbaurecht": null,
  "gfWohnenSonderwohnformen": null,
  "gfWohnenStudentischesWohnen": null,
  "gfWohnenSeniorinnenWohnen": null,
  "gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen": null,
  "gfAnmerkung": null,
  "weGesamt": null,
  "weBaurechtlichGenehmigt": null,
  "weBaurechtlichFestgesetzt": null,
  "weSonderwohnformen": null,
  "weStudentischesWohnen": null,
  "weSeniorinnenWohnen": null,
  "weWeiteresNichtInfrastrukturrelevantesWohnen": null,
  "weAnmerkung": null,
  "bauabschnitte": null,
} satisfies AbfragevarianteWeiteresVerfahrenAngelegtDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfragevarianteWeiteresVerfahrenAngelegtDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


