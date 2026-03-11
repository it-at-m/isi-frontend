
# DokumenteDto


## Properties

Name | Type
------------ | -------------
`dokumente` | [Array&lt;DokumentDto&gt;](DokumentDto.md)
`pageNumber` | number
`pageSize` | number
`totalElements` | number
`totalPages` | number
`last` | boolean

## Example

```typescript
import type { DokumenteDto } from ''

// TODO: Update the object below with actual values
const example = {
  "dokumente": null,
  "pageNumber": null,
  "pageSize": null,
  "totalElements": null,
  "totalPages": null,
  "last": null,
} satisfies DokumenteDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DokumenteDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


