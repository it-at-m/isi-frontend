
# SearchResultsDto


## Properties

Name | Type
------------ | -------------
`searchResults` | [Array&lt;SearchResultsDtoSearchResultsInner&gt;](SearchResultsDtoSearchResultsInner.md)
`numberOfPages` | number
`page` | number

## Example

```typescript
import type { SearchResultsDto } from ''

// TODO: Update the object below with actual values
const example = {
  "searchResults": null,
  "numberOfPages": null,
  "page": null,
} satisfies SearchResultsDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResultsDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


