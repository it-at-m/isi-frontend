
# StadtbezirkDto


## Properties

Name | Type
------------ | -------------
`objectId` | number
`stadtbezirkNummer` | string
`name` | string
`flaecheQm` | number
`ycoordinate` | number
`xcoordinate` | number

## Example

```typescript
import type { StadtbezirkDto } from ''

// TODO: Update the object below with actual values
const example = {
  "objectId": null,
  "stadtbezirkNummer": null,
  "name": null,
  "flaecheQm": null,
  "ycoordinate": null,
  "xcoordinate": null,
} satisfies StadtbezirkDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StadtbezirkDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


