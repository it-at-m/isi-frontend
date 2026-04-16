
# AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`artAbfragevariante` | string
`bedarfsmeldungAbfrageersteller` | [Array&lt;BedarfsmeldungDto&gt;](BedarfsmeldungDto.md)
`bedarfsmeldungDokumenteAbfrageersteller` | [Array&lt;DokumentDto&gt;](DokumentDto.md)
`anmerkungAbfrageersteller` | string

## Example

```typescript
import type { AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "artAbfragevariante": null,
  "bedarfsmeldungAbfrageersteller": null,
  "bedarfsmeldungDokumenteAbfrageersteller": null,
  "anmerkungAbfrageersteller": null,
} satisfies AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


