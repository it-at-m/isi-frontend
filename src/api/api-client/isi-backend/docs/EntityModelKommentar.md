
# EntityModelKommentar


## Properties

Name | Type
------------ | -------------
`version` | number
`createdDateTime` | Date
`lastModifiedDateTime` | Date
`datum` | string
`text` | string
`links` | [{ [key: string]: Link; }](Link.md)

## Example

```typescript
import type { EntityModelKommentar } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "createdDateTime": null,
  "lastModifiedDateTime": null,
  "datum": null,
  "text": null,
  "links": null,
} satisfies EntityModelKommentar

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityModelKommentar
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


