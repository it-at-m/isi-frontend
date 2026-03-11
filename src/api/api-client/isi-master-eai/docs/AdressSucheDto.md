
# AdressSucheDto

Kriterien für die Adress-Suche

## Properties

Name | Type
------------ | -------------
`query` | string
`page` | number
`pagesize` | number

## Example

```typescript
import type { AdressSucheDto } from ''

// TODO: Update the object below with actual values
const example = {
  "query": null,
  "page": null,
  "pagesize": null,
} satisfies AdressSucheDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdressSucheDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


