
# StartseitenEinstellungDto


## Properties

Name | Type
------------ | -------------
`schnellfilter` | [SchnellfilterVorgaenge](SchnellfilterVorgaenge.md)
`sortBy` | string
`sortOrder` | string

## Example

```typescript
import type { StartseitenEinstellungDto } from ''

// TODO: Update the object below with actual values
const example = {
  "schnellfilter": null,
  "sortBy": null,
  "sortOrder": null,
} satisfies StartseitenEinstellungDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StartseitenEinstellungDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


