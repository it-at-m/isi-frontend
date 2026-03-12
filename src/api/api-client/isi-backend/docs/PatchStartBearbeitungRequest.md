
# PatchStartBearbeitungRequest


## Properties

Name | Type
------------ | -------------
`version` | number
`artAbfrage` | string
`bauvorhaben` | string
`linkEakte` | string
`verortung` | [VerortungMultiPolygonDto](VerortungMultiPolygonDto.md)
`abfragevariantenBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungStartBearbeitungDto&gt;](AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungStartBearbeitungDto.md)
`abfragevariantenSachbearbeitungBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto&gt;](AbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto.md)
`abfragevariantenBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenSachbearbeitungStartBearbeitungDto&gt;](AbfragevarianteBauleitplanverfahrenSachbearbeitungStartBearbeitungDto.md)
`abfragevariantenSachbearbeitungBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenStartBearbeitungDto&gt;](AbfragevarianteBauleitplanverfahrenStartBearbeitungDto.md)
`abfragevariantenWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenSachbearbeitungStartBearbeitungDto&gt;](AbfragevarianteWeiteresVerfahrenSachbearbeitungStartBearbeitungDto.md)
`abfragevariantenSachbearbeitungWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenStartBearbeitungDto&gt;](AbfragevarianteWeiteresVerfahrenStartBearbeitungDto.md)

## Example

```typescript
import type { PatchStartBearbeitungRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "artAbfrage": null,
  "bauvorhaben": null,
  "linkEakte": null,
  "verortung": null,
  "abfragevariantenBaugenehmigungsverfahren": null,
  "abfragevariantenSachbearbeitungBaugenehmigungsverfahren": null,
  "abfragevariantenBauleitplanverfahren": null,
  "abfragevariantenSachbearbeitungBauleitplanverfahren": null,
  "abfragevariantenWeiteresVerfahren": null,
  "abfragevariantenSachbearbeitungWeiteresVerfahren": null,
} satisfies PatchStartBearbeitungRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchStartBearbeitungRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


