
# BaugenehmigungsverfahrenStartBearbeitungDto


## Properties

Name | Type
------------ | -------------
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`abfragevariantenBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungStartBearbeitungDto&gt;](AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungStartBearbeitungDto.md)
`abfragevariantenSachbearbeitungBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto&gt;](AbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto.md)

## Example

```typescript
import type { BaugenehmigungsverfahrenStartBearbeitungDto } from ''

// TODO: Update the object below with actual values
const example = {
  "verortung": null,
  "abfragevariantenBaugenehmigungsverfahren": null,
  "abfragevariantenSachbearbeitungBaugenehmigungsverfahren": null,
} satisfies BaugenehmigungsverfahrenStartBearbeitungDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BaugenehmigungsverfahrenStartBearbeitungDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


