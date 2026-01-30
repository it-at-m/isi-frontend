
# EntityModelStaedtebaulicheOrientierungswert


## Properties

Name | Type
------------ | -------------
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`gueltigAb` | Date
`foerderartBezeichnung` | string
`durchschnittlicheGrundflaeche` | number
`belegungsdichte` | number
`links` | [{ [key: string]: Link; }](Link.md)

## Example

```typescript
import type { EntityModelStaedtebaulicheOrientierungswert } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "gueltigAb": null,
  "foerderartBezeichnung": null,
  "durchschnittlicheGrundflaeche": null,
  "belegungsdichte": null,
  "links": null,
} satisfies EntityModelStaedtebaulicheOrientierungswert

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityModelStaedtebaulicheOrientierungswert
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


