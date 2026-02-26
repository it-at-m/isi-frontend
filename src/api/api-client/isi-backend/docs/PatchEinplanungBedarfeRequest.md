
# PatchEinplanungBedarfeRequest


## Properties

Name | Type
------------ | -------------
`version` | number
`artAbfrage` | string
`abfragevariantenBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto&gt;](AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto.md)
`abfragevariantenSachbearbeitungBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto&gt;](AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto.md)
`abfragevariantenBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto&gt;](AbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto.md)
`abfragevariantenSachbearbeitungBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto&gt;](AbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto.md)
`abfragevariantenWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto&gt;](AbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto.md)
`abfragevariantenSachbearbeitungWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto&gt;](AbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto.md)

## Example

```typescript
import type { PatchEinplanungBedarfeRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "artAbfrage": null,
  "abfragevariantenBaugenehmigungsverfahren": null,
  "abfragevariantenSachbearbeitungBaugenehmigungsverfahren": null,
  "abfragevariantenBauleitplanverfahren": null,
  "abfragevariantenSachbearbeitungBauleitplanverfahren": null,
  "abfragevariantenWeiteresVerfahren": null,
  "abfragevariantenSachbearbeitungWeiteresVerfahren": null,
} satisfies PatchEinplanungBedarfeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchEinplanungBedarfeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


