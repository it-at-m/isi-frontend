
# AbfrageRequestBody


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`name` | string
`statusAbfrage` | [StatusAbfrage](StatusAbfrage.md)
`anmerkung` | string
`bauvorhaben` | string
`sub` | string
`linkEakte` | string
`bearbeitungshistorie` | [Array&lt;Bearbeitungshistorie&gt;](Bearbeitungshistorie.md)
`resultType` | string
`artAbfrage` | string
`bauvorhabenUuid` | string

## Example

```typescript
import type { AbfrageRequestBody } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "name": null,
  "statusAbfrage": null,
  "anmerkung": null,
  "bauvorhaben": null,
  "sub": null,
  "linkEakte": null,
  "bearbeitungshistorie": null,
  "resultType": null,
  "artAbfrage": null,
  "bauvorhabenUuid": null,
} satisfies AbfrageRequestBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbfrageRequestBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


