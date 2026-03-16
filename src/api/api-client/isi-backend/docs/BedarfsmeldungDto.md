
# BedarfsmeldungDto


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`anzahlEinrichtungen` | number
`infrastruktureinrichtungTyp` | string
`anzahlKinderkrippengruppen` | number
`anzahlKindergartengruppen` | number
`anzahlHortgruppen` | number
`anzahlGrundschulzuege` | number
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)

## Example

```typescript
import type { BedarfsmeldungDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "anzahlEinrichtungen": null,
  "infrastruktureinrichtungTyp": null,
  "anzahlKinderkrippengruppen": null,
  "anzahlKindergartengruppen": null,
  "anzahlHortgruppen": null,
  "anzahlGrundschulzuege": null,
  "dokumente": null,
} satisfies BedarfsmeldungDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BedarfsmeldungDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


