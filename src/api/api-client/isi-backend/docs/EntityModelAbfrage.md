
# EntityModelAbfrage


## Properties

Name | Type
------------ | -------------
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`name` | string
`statusAbfrage` | [StatusAbfrage](StatusAbfrage.md)
`anmerkung` | string
`sub` | string
`linkEakte` | string
`bearbeitungshistorie` | [Array&lt;Bearbeitungshistorie&gt;](Bearbeitungshistorie.md)
`artAbfrage` | string
`bauvorhabenUuid` | string
`resultType` | string
`links` | [{ [key: string]: Link; }](Link.md)

## Example

```typescript
import type { EntityModelAbfrage } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "name": null,
  "statusAbfrage": null,
  "anmerkung": null,
  "sub": null,
  "linkEakte": null,
  "bearbeitungshistorie": null,
  "artAbfrage": null,
  "bauvorhabenUuid": null,
  "resultType": null,
  "links": null,
} satisfies EntityModelAbfrage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityModelAbfrage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


