
# FoerdermixDto


## Properties

Name | Type
------------ | -------------
`bezeichnungJahr` | string
`bezeichnung` | string
`foerderarten` | [Array&lt;FoerderartDto&gt;](FoerderartDto.md)

## Example

```typescript
import type { FoerdermixDto } from ''

// TODO: Update the object below with actual values
const example = {
  "bezeichnungJahr": null,
  "bezeichnung": null,
  "foerderarten": null,
} satisfies FoerdermixDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FoerdermixDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


