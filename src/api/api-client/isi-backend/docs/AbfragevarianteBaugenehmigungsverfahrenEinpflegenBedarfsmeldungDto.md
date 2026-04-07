
# AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`artAbfragevariante` | string
`bedarfsmeldungFachreferate` | [Array&lt;BedarfsmeldungDto&gt;](BedarfsmeldungDto.md)
`bedarfsmeldungDokumenteFachreferate` | [Array&lt;DokumentDto&gt;](DokumentDto.md)
`ausgeloesterBedarfImBaugebietBeruecksichtigenKita` | boolean
`ausgeloesterBedarfMitversorgungImBplanKita` | boolean
`ausgeloesterBedarfMitversorgungInBestEinrichtungenKita` | boolean
`ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita` | boolean
`ausgeloesterBedarfImBaugebietBeruecksichtigenSchule` | boolean
`ausgeloesterBedarfMitversorgungImBplanSchule` | boolean
`ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule` | boolean
`ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule` | boolean
`anmerkungFachreferate` | string

## Example

```typescript
import type { AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "artAbfragevariante": null,
  "bedarfsmeldungFachreferate": null,
  "bedarfsmeldungDokumenteFachreferate": null,
  "ausgeloesterBedarfImBaugebietBeruecksichtigenKita": null,
  "ausgeloesterBedarfMitversorgungImBplanKita": null,
  "ausgeloesterBedarfMitversorgungInBestEinrichtungenKita": null,
  "ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita": null,
  "ausgeloesterBedarfImBaugebietBeruecksichtigenSchule": null,
  "ausgeloesterBedarfMitversorgungImBplanSchule": null,
  "ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule": null,
  "ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule": null,
  "anmerkungFachreferate": null,
} satisfies AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


