
# BearbeitendePersonDto


## Properties

Name | Type
------------ | -------------
`name` | string
`email` | string
`organisationseinheit` | string

## Example

```typescript
import type { BearbeitendePersonDto } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "email": null,
  "organisationseinheit": null,
} satisfies BearbeitendePersonDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BearbeitendePersonDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


