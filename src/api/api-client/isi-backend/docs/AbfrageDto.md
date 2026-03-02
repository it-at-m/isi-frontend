
# AbfrageDto

AbfrageDto

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

## Example

```typescript
import type { AbfrageDto } from ''

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
} satisfies AbfrageDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfrageDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


