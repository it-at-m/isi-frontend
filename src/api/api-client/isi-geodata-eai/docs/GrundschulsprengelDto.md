
# GrundschulsprengelDto


## Properties

Name | Type
------------ | -------------
`objectId` | number
`ebene` | number
`flaecheQm` | number
`schulnummer` | number
`verbundnummer` | string
`verbundname` | string
`ebeneBedeutung` | string
`xcoordinate` | number
`ycoordinate` | number

## Example

```typescript
import type { GrundschulsprengelDto } from ''

// TODO: Update the object below with actual values
const example = {
  "objectId": null,
  "ebene": null,
  "flaecheQm": null,
  "schulnummer": null,
  "verbundnummer": null,
  "verbundname": null,
  "ebeneBedeutung": null,
  "xcoordinate": null,
  "ycoordinate": null,
} satisfies GrundschulsprengelDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GrundschulsprengelDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


