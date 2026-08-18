
# ViertelDto


## Properties

Name | Type
------------ | -------------
`objectId` | number
`viertelNummer` | string
`flaecheQm` | number
`xcoordinate` | number
`ycoordinate` | number

## Example

```typescript
import type { ViertelDto } from ''

// TODO: Update the object below with actual values
const example = {
  "objectId": null,
  "viertelNummer": null,
  "flaecheQm": null,
  "xcoordinate": null,
  "ycoordinate": null,
} satisfies ViertelDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ViertelDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


