
# EntityModelAbfragevarianteBauleitplanverfahren


## Properties

Name | Type
------------ | -------------
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
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
`sobonOrientierungswertJahrPlanungsursaechlich` | string
`sobonBerechnung` | [SobonBerechnung](SobonBerechnung.md)
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
`artAbfragevariante` | string
`links` | [{ [key: string]: Link; }](Link.md)

## Example

```typescript
import type { EntityModelAbfragevarianteBauleitplanverfahren } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
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
  "sobonOrientierungswertJahrPlanungsursaechlich": null,
  "sobonBerechnung": null,
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
  "artAbfragevariante": null,
  "links": null,
} satisfies EntityModelAbfragevarianteBauleitplanverfahren

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityModelAbfragevarianteBauleitplanverfahren
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


