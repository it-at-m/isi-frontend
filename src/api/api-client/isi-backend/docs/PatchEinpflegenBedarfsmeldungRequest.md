
# PatchEinpflegenBedarfsmeldungRequest


## Properties

Name | Type
------------ | -------------
`version` | number
`artAbfrage` | string
`abfragevariantenBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto&gt;](AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto.md)
`abfragevariantenSachbearbeitungBaugenehmigungsverfahren` | [Array&lt;AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto&gt;](AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto.md)
`abfragevariantenBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto&gt;](AbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto.md)
`abfragevariantenSachbearbeitungBauleitplanverfahren` | [Array&lt;AbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto&gt;](AbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto.md)
`abfragevariantenWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto&gt;](AbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto.md)
`abfragevariantenSachbearbeitungWeiteresVerfahren` | [Array&lt;AbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto&gt;](AbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto.md)

## Example

```typescript
import type { PatchEinpflegenBedarfsmeldungRequest } from ''

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
} satisfies PatchEinpflegenBedarfsmeldungRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchEinpflegenBedarfsmeldungRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


