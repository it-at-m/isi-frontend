
# FlurstueckDto


## Properties

Name | Type
------------ | -------------
`objectId` | number
`oid1` | string
`gemarkung` | number
`fluerstueckNummerZ` | number
`fluerstueckNummerN` | number
`afl` | number
`lage` | string
`gemeinde` | number
`objektart` | number
`nutzungsart` | number
`eigentumsart` | number
`flaecheQm` | number
`gemarkungName` | string
`flurstueckId` | number
`eigentumsartBedeutung` | string
`gemeindeBedeutung` | string
`nutzungsartBedeutung` | string

## Example

```typescript
import type { FlurstueckDto } from ''

// TODO: Update the object below with actual values
const example = {
  "objectId": null,
  "oid1": null,
  "gemarkung": null,
  "fluerstueckNummerZ": null,
  "fluerstueckNummerN": null,
  "afl": null,
  "lage": null,
  "gemeinde": null,
  "objektart": null,
  "nutzungsart": null,
  "eigentumsart": null,
  "flaecheQm": null,
  "gemarkungName": null,
  "flurstueckId": null,
  "eigentumsartBedeutung": null,
  "gemeindeBedeutung": null,
  "nutzungsartBedeutung": null,
} satisfies FlurstueckDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FlurstueckDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


