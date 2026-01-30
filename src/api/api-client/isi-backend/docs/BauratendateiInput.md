
# BauratendateiInput


## Properties

Name | Type
------------ | -------------
`id` | string
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`grundschulsprengel` | Array&lt;string&gt;
`mittelschulsprengel` | Array&lt;string&gt;
`viertel` | Array&lt;string&gt;
`wohneinheiten` | [Array&lt;WohneinheitenProFoerderartProJahr&gt;](WohneinheitenProFoerderartProJahr.md)

## Example

```typescript
import type { BauratendateiInput } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "grundschulsprengel": null,
  "mittelschulsprengel": null,
  "viertel": null,
  "wohneinheiten": null,
} satisfies BauratendateiInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BauratendateiInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


