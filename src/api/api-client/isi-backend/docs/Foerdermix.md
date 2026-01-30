
# Foerdermix


## Properties

Name | Type
------------ | -------------
`bezeichnungJahr` | string
`bezeichnung` | string
`foerderarten` | [Array&lt;Foerderart&gt;](Foerderart.md)

## Example

```typescript
import type { Foerdermix } from ''

// TODO: Update the object below with actual values
const example = {
  "bezeichnungJahr": null,
  "bezeichnung": null,
  "foerderarten": null,
} satisfies Foerdermix

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Foerdermix
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


