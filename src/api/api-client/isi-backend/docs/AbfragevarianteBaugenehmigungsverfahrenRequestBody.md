
# AbfragevarianteBaugenehmigungsverfahrenRequestBody


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`abfragevariantenNr` | number
`name` | string
`wesentlicheRechtsgrundlage` | Array&lt;string&gt;
`wesentlicheRechtsgrundlageFreieEingabe` | string
`realisierungVon` | number
`gfWohnenGesamt` | number
`gfWohnenBaurechtlichGenehmigt` | number
`gfWohnenBaurechtlichFestgesetzt` | number
`gfWohnenBestandswohnbaurecht` | number
`gfWohnenSonderwohnformen` | boolean
`gfWohnenStudentischesWohnen` | number
`gfWohnenSeniorinnenWohnen` | number
`gfWohnenGenossenschaftlichesWohnen` | number
`gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen` | number
`gfAnmerkung` | string
`weGesamt` | number
`weBaurechtlichGenehmigt` | number
`weBaurechtlichFestgesetzt` | number
`weSonderwohnformen` | boolean
`weStudentischesWohnen` | number
`weSeniorinnenWohnen` | number
`weGenossenschaftlichesWohnen` | number
`weWeiteresNichtInfrastrukturrelevantesWohnen` | number
`weAnmerkung` | string
`sobonOrientierungswertJahrPlanungsursaechlich` | string
`stammdatenGueltigAb` | Date
`anmerkung` | string
`hasBauratendateiInput` | boolean
`anmerkungBauratendateiInput` | string
`bauratendateiInputBasis` | [BauratendateiInput](BauratendateiInput.md)
`bauratendateiInput` | [Array&lt;BauratendateiInput&gt;](BauratendateiInput.md)
`bedarfsmeldungFachreferate` | [Array&lt;Bedarfsmeldung&gt;](Bedarfsmeldung.md)
`bedarfsmeldungAbfrageersteller` | [Array&lt;Bedarfsmeldung&gt;](Bedarfsmeldung.md)
`bauabschnitte` | [Array&lt;Bauabschnitt&gt;](Bauabschnitt.md)
`ausgeloesterBedarfImBaugebietBeruecksichtigenKita` | boolean
`ausgeloesterBedarfMitversorgungImBplanKita` | boolean
`ausgeloesterBedarfMitversorgungInBestEinrichtungenKita` | boolean
`ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita` | boolean
`ausgeloesterBedarfImBaugebietBeruecksichtigenSchule` | boolean
`ausgeloesterBedarfMitversorgungImBplanSchule` | boolean
`ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule` | boolean
`ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule` | boolean
`anmerkungFachreferate` | string
`anmerkungAbfrageersteller` | string
`dokumente` | Array&lt;string&gt;
`artAbfragevariante` | string

## Example

```typescript
import type { AbfragevarianteBaugenehmigungsverfahrenRequestBody } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "abfragevariantenNr": null,
  "name": null,
  "wesentlicheRechtsgrundlage": null,
  "wesentlicheRechtsgrundlageFreieEingabe": null,
  "realisierungVon": null,
  "gfWohnenGesamt": null,
  "gfWohnenBaurechtlichGenehmigt": null,
  "gfWohnenBaurechtlichFestgesetzt": null,
  "gfWohnenBestandswohnbaurecht": null,
  "gfWohnenSonderwohnformen": null,
  "gfWohnenStudentischesWohnen": null,
  "gfWohnenSeniorinnenWohnen": null,
  "gfWohnenGenossenschaftlichesWohnen": null,
  "gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen": null,
  "gfAnmerkung": null,
  "weGesamt": null,
  "weBaurechtlichGenehmigt": null,
  "weBaurechtlichFestgesetzt": null,
  "weSonderwohnformen": null,
  "weStudentischesWohnen": null,
  "weSeniorinnenWohnen": null,
  "weGenossenschaftlichesWohnen": null,
  "weWeiteresNichtInfrastrukturrelevantesWohnen": null,
  "weAnmerkung": null,
  "sobonOrientierungswertJahrPlanungsursaechlich": null,
  "stammdatenGueltigAb": null,
  "anmerkung": null,
  "hasBauratendateiInput": null,
  "anmerkungBauratendateiInput": null,
  "bauratendateiInputBasis": null,
  "bauratendateiInput": null,
  "bedarfsmeldungFachreferate": null,
  "bedarfsmeldungAbfrageersteller": null,
  "bauabschnitte": null,
  "ausgeloesterBedarfImBaugebietBeruecksichtigenKita": null,
  "ausgeloesterBedarfMitversorgungImBplanKita": null,
  "ausgeloesterBedarfMitversorgungInBestEinrichtungenKita": null,
  "ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita": null,
  "ausgeloesterBedarfImBaugebietBeruecksichtigenSchule": null,
  "ausgeloesterBedarfMitversorgungImBplanSchule": null,
  "ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule": null,
  "ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule": null,
  "anmerkungFachreferate": null,
  "anmerkungAbfrageersteller": null,
  "dokumente": null,
  "artAbfragevariante": null,
} satisfies AbfragevarianteBaugenehmigungsverfahrenRequestBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfragevarianteBaugenehmigungsverfahrenRequestBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


