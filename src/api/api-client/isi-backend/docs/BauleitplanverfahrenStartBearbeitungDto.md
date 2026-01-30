
# BauleitplanverfahrenStartBearbeitungDto


## Properties

Name | Type
------------ | -------------
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`abfragevariantenBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenSachbearbeitungStartBearbeitungDto&gt;](AbfragevarianteBauleitplanverfahrenSachbearbeitungStartBearbeitungDto.md)
`abfragevariantenSachbearbeitungBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenStartBearbeitungDto&gt;](AbfragevarianteBauleitplanverfahrenStartBearbeitungDto.md)

## Example

```typescript
import type { BauleitplanverfahrenStartBearbeitungDto } from ''

// TODO: Update the object below with actual values
const example = {
  "verortung": null,
  "abfragevariantenBauleitplanverfahren": null,
  "abfragevariantenSachbearbeitungBauleitplanverfahren": null,
} satisfies BauleitplanverfahrenStartBearbeitungDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BauleitplanverfahrenStartBearbeitungDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


