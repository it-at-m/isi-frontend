
# MittelschulsprengelDto


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
`ycoordinate` | number
`xcoordinate` | number

## Example

```typescript
import type { MittelschulsprengelDto } from ''

// TODO: Update the object below with actual values
const example = {
  "objectId": null,
  "ebene": null,
  "flaecheQm": null,
  "schulnummer": null,
  "verbundnummer": null,
  "verbundname": null,
  "ebeneBedeutung": null,
  "ycoordinate": null,
  "xcoordinate": null,
} satisfies MittelschulsprengelDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MittelschulsprengelDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


