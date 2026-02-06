
# SobonBerechnung


## Properties

Name | Type
------------ | -------------
`isASobonBerechnung` | boolean
`sobonFoerdermix` | [Foerdermix](Foerdermix.md)
`sobonOrientierungswertJahrSobonUrsaechlich` | string
`versorgungsquoteHortSobon` | string

## Example

```typescript
import type { SobonBerechnung } from ''

// TODO: Update the object below with actual values
const example = {
  "isASobonBerechnung": null,
  "sobonFoerdermix": null,
  "sobonOrientierungswertJahrSobonUrsaechlich": null,
  "versorgungsquoteHortSobon": null,
} satisfies SobonBerechnung

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SobonBerechnung
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


