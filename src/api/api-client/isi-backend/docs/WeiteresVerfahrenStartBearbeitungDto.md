
# WeiteresVerfahrenStartBearbeitungDto


## Properties

Name | Type
------------ | -------------
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`abfragevariantenWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenSachbearbeitungStartBearbeitungDto&gt;](AbfragevarianteWeiteresVerfahrenSachbearbeitungStartBearbeitungDto.md)
`abfragevariantenSachbearbeitungWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenStartBearbeitungDto&gt;](AbfragevarianteWeiteresVerfahrenStartBearbeitungDto.md)

## Example

```typescript
import type { WeiteresVerfahrenStartBearbeitungDto } from ''

// TODO: Update the object below with actual values
const example = {
  "verortung": null,
  "abfragevariantenWeiteresVerfahren": null,
  "abfragevariantenSachbearbeitungWeiteresVerfahren": null,
} satisfies WeiteresVerfahrenStartBearbeitungDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WeiteresVerfahrenStartBearbeitungDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


