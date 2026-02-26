
# Bearbeitungshistorie


## Properties

Name | Type
------------ | -------------
`zielStatus` | [StatusAbfrage](StatusAbfrage.md)
`zeitpunkt` | Date
`bearbeitendePerson` | [BearbeitendePerson](BearbeitendePerson.md)

## Example

```typescript
import type { Bearbeitungshistorie } from ''

// TODO: Update the object below with actual values
const example = {
  "zielStatus": null,
  "zeitpunkt": null,
  "bearbeitendePerson": null,
} satisfies Bearbeitungshistorie

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Bearbeitungshistorie
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


